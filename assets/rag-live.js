/* rag-live.js - the in-browser retrieval playground for learn-rag-with-phoebe.
 *
 * Honest by design: this uses a SIMPLIFIED lexical embedding (term frequency over a shared
 * vocabulary, with a small synonym map so related words land near each other), computed the
 * SAME way for documents and queries. Real RAG swaps in a neural embedding model - the math
 * that ranks results (cosine similarity over vectors) is exactly what you see here, running
 * with zero network calls. The playground teaches the mechanic, not a production embedder.
 *
 * Usage in a page:
 *   <div class="ragbox" data-corpus="A" data-k="3"
 *        data-caption="Type a question - watch chunks rank by cosine similarity"></div>
 *   data-corpus: A | B | C  (from rag-corpora.js)  |  data-k: default top-k
 *   data-meta="date,severity"  -> which meta fields to show as chips (optional)
 *   data-vector="1"            -> show the query's top vector dimensions (embeddings lesson)
 *   data-filter="severity=SEV1" -> preset a metadata filter (metadata lesson); learner can edit
 * Requires rag-corpora.js loaded first.
 */
(function () {
  "use strict";

  /* ---- synonym groups: members share a canonical token so related words match ---- */
  var SYN = [
    ["cost", "spend", "spending", "budget", "price", "cheaper", "expensive", "dollars"],
    ["cut", "reduce", "lower", "trim", "save", "saving"],
    ["hire", "hiring", "recruit", "headcount", "engineer", "engineers", "staff"],
    ["board", "quarterly", "quarter", "q2", "review"],
    ["flight", "flights", "fly", "flying", "seat", "aisle", "travel", "trip"],
    ["hotel", "stay", "room", "checkout", "lodging"],
    ["expense", "expenses", "receipt", "reimburse", "reimbursement", "claim"],
    ["meeting", "meetings", "calendar", "schedule", "one-to-one", "1:1"],
    ["allergy", "allergic", "shellfish", "health", "medical", "medication", "tablet"],
    ["graduate", "graduation", "daughter", "family"],
    ["payment", "pay", "checkout", "gateway", "billing", "transaction"],
    ["outage", "down", "downtime", "unavailable", "failed", "failure", "error", "errors", "503"],
    ["latency", "slow", "slowness", "spike", "spiked", "performance"],
    ["login", "signin", "sign-in", "session", "sessions", "authentication"],
    ["email", "emails", "notification", "notifications", "smtp"],
    ["crash", "crashed", "crash-free", "mobile", "android", "app"],
    ["reindex", "index", "search", "relevance", "stale"],
    ["refund", "refunds", "refunded", "return", "returns", "returned", "money", "money-back", "charged", "charge"],
    ["password", "reset", "forgot", "credentials"],
    ["shipping", "ship", "delivery", "deliver", "express"],
    ["warranty", "defect", "defects", "repair", "care"],
    ["delete", "deletion", "remove", "erase", "close"],
    ["hours", "open", "support", "contact", "chat"],
    ["privacy", "data", "personal", "export", "gdpr"],
    ["subscription", "renew", "renewal", "cancel", "billing"]
  ];
  var CANON = {};
  SYN.forEach(function (grp) { grp.forEach(function (w) { CANON[w] = grp[0]; }); });

  var STOP = { "the": 1, "a": 1, "an": 1, "of": 1, "to": 1, "and": 1, "or": 1, "in": 1,
    "on": 1, "for": 1, "is": 1, "are": 1, "was": 1, "were": 1, "be": 1, "with": 1, "by": 1,
    "at": 1, "it": 1, "as": 1, "that": 1, "this": 1, "i": 1, "we": 1, "you": 1, "my": 1,
    "our": 1, "do": 1, "did": 1, "does": 1, "what": 1, "when": 1, "how": 1, "who": 1,
    "which": 1, "where": 1, "why": 1, "can": 1, "will": 1, "not": 1, "no": 1, "from": 1 };

  function tokens(text) {
    return String(text).toLowerCase().match(/[a-z0-9][a-z0-9-]*/g) || [];
  }

  /* embed(text) -> { term: weight } sparse, L2-normalized. Synonyms fold to a canonical token. */
  function embed(text) {
    var tf = {}, toks = tokens(text), n = 0, i, t;
    for (i = 0; i < toks.length; i++) {
      t = toks[i];
      if (STOP[t]) continue;
      t = CANON[t] || t;
      tf[t] = (tf[t] || 0) + 1;
      n++;
    }
    var norm = 0;
    for (t in tf) norm += tf[t] * tf[t];
    norm = Math.sqrt(norm) || 1;
    for (t in tf) tf[t] = tf[t] / norm;
    return tf;
  }

  function cosine(a, b) {
    var s = 0, t;
    for (t in a) if (b[t]) s += a[t] * b[t];
    return s; /* both already L2-normalized -> dot product == cosine */
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* highlight query terms (and their synonyms) inside a chunk */
  function highlight(text, qVec) {
    return esc(text).replace(/[A-Za-z0-9][A-Za-z0-9-]*/g, function (w) {
      var c = CANON[w.toLowerCase()] || w.toLowerCase();
      return qVec[c] ? '<mark class="rl-hit">' + w + "</mark>" : w;
    });
  }

  /* parse "field=value" filter string -> predicate over meta */
  function makeFilter(str) {
    str = (str || "").trim();
    if (!str) return function () { return true; };
    var eq = str.split("=");
    if (eq.length !== 2) return function () { return true; };
    var key = eq[0].trim(), val = eq[1].trim().toLowerCase();
    return function (meta) {
      return meta && meta[key] != null && String(meta[key]).toLowerCase().indexOf(val) !== -1;
    };
  }

  function metaChips(meta, fields) {
    if (!meta || !fields.length) return "";
    return fields.map(function (f) {
      return meta[f] != null ? '<span class="rl-chip">' + esc(f) + ": " + esc(meta[f]) + "</span>" : "";
    }).join("");
  }

  function wire(box) {
    var corpusKey = box.getAttribute("data-corpus") || "A";
    var corpus = (window.RAG_CORPORA && window.RAG_CORPORA[corpusKey]) || [];
    var k = parseInt(box.getAttribute("data-k") || "3", 10);
    var metaFields = (box.getAttribute("data-meta") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    var showVector = box.getAttribute("data-vector") === "1";
    var presetFilter = box.getAttribute("data-filter") || "";
    var caption = box.getAttribute("data-caption") || "";

    /* precompute doc vectors once */
    var docs = corpus.map(function (d) { return { d: d, vec: embed(d.text) }; });

    box.innerHTML = "";
    var bar = document.createElement("div"); bar.className = "rl-bar";
    bar.innerHTML = '<span class="rl-dot"></span><span class="rl-title">retrieval playground</span>' +
      '<span class="rl-tag">corpus ' + esc(corpusKey) + " &middot; " + corpus.length + " chunks</span>";
    box.appendChild(bar);

    var controls = document.createElement("div"); controls.className = "rl-controls";
    var input = document.createElement("input");
    input.type = "text"; input.className = "rl-input"; input.placeholder = "Ask a question...";
    input.setAttribute("aria-label", "query");
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "rl-run"; btn.textContent = "Search";
    controls.appendChild(input); controls.appendChild(btn);
    box.appendChild(controls);

    var filterWrap = null, filterInput = null;
    if (metaFields.length) {
      filterWrap = document.createElement("div"); filterWrap.className = "rl-filter";
      filterWrap.innerHTML = '<span class="rl-flabel">metadata filter</span>';
      filterInput = document.createElement("input");
      filterInput.type = "text"; filterInput.className = "rl-finput";
      filterInput.placeholder = "e.g. " + (metaFields[0] || "field") + "=value  (blank = all)";
      filterInput.value = presetFilter;
      filterWrap.appendChild(filterInput);
      box.appendChild(filterWrap);
    }

    var out = document.createElement("div"); out.className = "rl-out";
    box.appendChild(out);

    if (caption) {
      var cap = document.createElement("div"); cap.className = "rl-cap"; cap.textContent = caption;
      box.appendChild(cap);
    }

    function run() {
      var q = input.value.trim();
      if (!q) { out.innerHTML = '<div class="rl-empty">Type a question, then Search.</div>'; return; }
      var qVec = embed(q);
      var filt = makeFilter(filterInput ? filterInput.value : "");
      var ranked = docs
        .filter(function (x) { return filt(x.d.meta); })
        .map(function (x) { return { d: x.d, score: cosine(qVec, x.vec) }; })
        .sort(function (a, b) { return b.score - a.score; });

      var top = ranked.slice(0, k);
      var html = "";

      if (showVector) {
        var dims = Object.keys(qVec).sort(function (a, b) { return qVec[b] - qVec[a]; }).slice(0, 6);
        html += '<div class="rl-vec"><span class="rl-veclabel">your query as a vector (top dimensions)</span>';
        html += dims.map(function (t) {
          return '<span class="rl-dim">' + esc(t) + " <b>" + qVec[t].toFixed(2) + "</b></span>";
        }).join("") + "</div>";
      }

      if (!top.length || top[0].score === 0) {
        html += '<div class="rl-none">No chunk scored above zero. In a real system this is where you would <b>refuse</b> ("I do not have that in my sources") rather than guess.</div>';
        out.innerHTML = html;
        return;
      }

      top.forEach(function (r, i) {
        var pct = Math.round(r.score * 100);
        html += '<div class="rl-hitrow' + (i === 0 ? " rl-best" : "") + (r.score === 0 ? " rl-zero" : "") + '">';
        html += '<div class="rl-rank">#' + (i + 1) + "</div>";
        html += '<div class="rl-body"><div class="rl-scorebar"><span style="width:' + pct + '%"></span>' +
          '<em>' + r.score.toFixed(3) + " cosine</em></div>";
        html += '<div class="rl-text">' + highlight(r.d.text, qVec) + "</div>";
        var chips = '<span class="rl-chip rl-id">' + esc(r.d.id) + "</span>" + metaChips(r.d.meta, metaFields);
        html += '<div class="rl-chips">' + chips + "</div></div></div>";
      });
      out.innerHTML = html;
    }

    btn.addEventListener("click", run);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") run(); });
    if (filterInput) filterInput.addEventListener("keydown", function (e) { if (e.key === "Enter") run(); });
    out.innerHTML = '<div class="rl-empty">Type a question, then Search.</div>';
  }

  function init() {
    var boxes = Array.prototype.slice.call(document.querySelectorAll(".ragbox"));
    boxes.forEach(wire);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
