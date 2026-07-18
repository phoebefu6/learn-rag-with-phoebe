/* rag-corpora.js - the three running-project corpora the course indexes + queries.
   Each item: { id, text, meta }. meta is free-form; the playground shows source + date/category.
   Corpus A escalates -> B -> C in retrieval difficulty (semantic -> temporal/metadata -> grounded QA).
   Shipped as plain data so rag-live.js can index + query it fully offline. */
window.RAG_CORPORA = {

  /* ---- Corpus A - Personal: chief-of-staff notes for a managing director (MD) ---- */
  A: [
    { id: "A1", text: "In the Q2 board call the MD committed to cutting cloud spend by 15 percent before the September review and to hiring two senior data engineers.",
      meta: { source: "board-notes", date: "2026-04-11" } },
    { id: "A2", text: "The MD prefers aisle seats, flies out Tuesday morning and never books red-eye flights. Always add lounge access and a vegetarian meal.",
      meta: { source: "travel-prefs", date: "2026-01-20" } },
    { id: "A3", text: "Expenses over 500 dollars need a receipt photo and a one-line business reason. Client dinners are pre-approved up to 200 dollars per head.",
      meta: { source: "expense-policy", date: "2026-02-03" } },
    { id: "A4", text: "Weekly one-to-ones are Thursday 4pm. Protect the Friday no-meeting block for deep work; decline anything that lands there unless it is the board.",
      meta: { source: "calendar-rules", date: "2026-03-01" } },
    { id: "A5", text: "The MD is allergic to shellfish and takes a blood-pressure tablet each morning; keep this off any shared document and out of restaurant bookings.",
      meta: { source: "personal-health", date: "2026-01-05" } },
    { id: "A6", text: "Preferred hotel chain is Hyatt for points; if unavailable pick a quiet property near the venue, king bed, late checkout, gym on site.",
      meta: { source: "travel-prefs", date: "2026-01-20" } },
    { id: "A7", text: "Follow up with the CFO about the September cost review deck and confirm the two engineering offers are signed before quarter end.",
      meta: { source: "action-items", date: "2026-05-02" } },
    { id: "A8", text: "The MD's daughter graduates on 2026-06-20; block the whole day and do not schedule travel the evening before.",
      meta: { source: "personal-cal", date: "2026-02-15" } }
  ],

  /* ---- Corpus B - Product / Ops: Jira incident tickets, each dated with a severity ---- */
  B: [
    { id: "INC-401", text: "Payment API returned 503 errors for 42 minutes; checkout failed for roughly 8 percent of orders. Root cause was an expired TLS certificate on the gateway.",
      meta: { source: "jira", ticket: "INC-401", date: "2026-03-14", severity: "SEV1" } },
    { id: "INC-402", text: "Search results were stale for two hours after the nightly reindex job silently failed. No customer-facing errors but relevance dropped.",
      meta: { source: "jira", ticket: "INC-402", date: "2026-03-14", severity: "SEV3" } },
    { id: "INC-410", text: "Login page latency spiked to 6 seconds during the morning peak; traced to a missing database index on the sessions table.",
      meta: { source: "jira", ticket: "INC-410", date: "2026-03-22", severity: "SEV2" } },
    { id: "INC-415", text: "Email notifications stopped sending for four hours after the SMTP provider rotated credentials without notice. Password-reset emails were the main impact.",
      meta: { source: "jira", ticket: "INC-415", date: "2026-04-02", severity: "SEV2" } },
    { id: "INC-421", text: "Mobile app crashed on launch for Android 14 users after a bad release; rolled back within 30 minutes. Crash-free rate fell to 71 percent.",
      meta: { source: "jira", ticket: "INC-421", date: "2026-04-18", severity: "SEV1" } },
    { id: "INC-430", text: "Reporting dashboard showed duplicated revenue numbers because a streaming job replayed events after a broker restart.",
      meta: { source: "jira", ticket: "INC-430", date: "2026-05-06", severity: "SEV3" } },
    { id: "INC-433", text: "Checkout coupon codes were rejected for EU customers due to a currency-rounding bug introduced in the pricing service.",
      meta: { source: "jira", ticket: "INC-433", date: "2026-05-19", severity: "SEV2" } },
    { id: "INC-440", text: "Full payment outage for 12 minutes when the primary database failed over; the gateway did not retry the standby cleanly.",
      meta: { source: "jira", ticket: "INC-440", date: "2026-06-01", severity: "SEV1" } }
  ],

  /* ---- Corpus C - Company knowledge base / help-center (support-bot grounding) ---- */
  C: [
    { id: "C-refund", text: "Refunds are issued to the original payment method within 5 to 7 business days. Items must be returned within 30 days of delivery and unused.",
      meta: { source: "kb", category: "returns" } },
    { id: "C-reset", text: "To reset your password, click Forgot password on the sign-in screen and follow the emailed link. The link expires after 60 minutes.",
      meta: { source: "kb", category: "account" } },
    { id: "C-ship", text: "Standard shipping takes 3 to 5 business days. Express is next business day if ordered before 2pm. We ship to the US, Canada and the EU.",
      meta: { source: "kb", category: "shipping" } },
    { id: "C-warranty", text: "Hardware carries a 12-month limited warranty covering manufacturing defects. Accidental damage is not covered unless you bought the care plan.",
      meta: { source: "kb", category: "warranty" } },
    { id: "C-delete", text: "You can delete your account under Settings, Privacy, Delete account. Deletion is permanent after a 14-day grace period and erases your order history.",
      meta: { source: "kb", category: "account" } },
    { id: "C-hours", text: "Support is available Monday to Friday, 9am to 6pm Eastern. Live chat is fastest; email replies arrive within one business day.",
      meta: { source: "kb", category: "contact" } },
    { id: "C-privacy", text: "We never sell personal data. You may request an export or deletion of your data at any time and we respond within 30 days as required by law.",
      meta: { source: "kb", category: "privacy" } },
    { id: "C-subscription", text: "Subscriptions renew automatically each month. Cancel any time from the billing page; you keep access until the end of the paid period.",
      meta: { source: "kb", category: "billing" } }
  ]
};
