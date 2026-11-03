/**
 * Cloudflare Worker: Tally → Brevo webhook & client proxy handler
 *
 * Rules:
 *  1. If they entered their email: add them to Brevo List 3 ("Survey Responders - Contact OK").
 *  2. Assign WANTS_TRIAL: true (email capture promises AI engine & report at launch).
 *  3. If they selected "Yes" to Question 7 (1-on-1 Consultation): assign OPEN_TO_CHAT: true, else false.
 */

const BREVO_LIST_ID = 3; // "Survey Responders - Contact OK"
const TALLY_FORM_ID = "Ge6Deo"; // Scripting Destiny Survey Form ID

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: CORS_HEADERS });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400, headers: CORS_HEADERS });
    }

    let email = "";
    let isYesToQ7 = false;
    let wantsTrial = true;

    // Mode 1: Called directly from client frontend (e.g. survey.tsx)
    if (payload.email) {
      email = String(payload.email).trim().toLowerCase();
      isYesToQ7 = Boolean(payload.openToChat);
      if (typeof payload.wantsTrial === "boolean") {
        wantsTrial = payload.wantsTrial;
      }
    } 
    // Mode 2: Called by Tally Webhook or raw Tally submission payload
    else {
      // Guard: only handle our specific form if formId is present
      const formId = payload.data?.formId || payload.formId;
      if (formId && formId !== TALLY_FORM_ID) {
        return new Response("Not our form", { status: 200, headers: CORS_HEADERS });
      }

      const fields = payload.data?.fields ?? payload.fields ?? [];

      for (const f of fields) {
        const type = (f.type ?? "").toUpperCase();
        const label = (f.label ?? "").toLowerCase();
        const val = f.value;

        // 1. Detect email
        if (type === "INPUT_EMAIL" || label.includes("email")) {
          if (typeof val === "string" && val.includes("@")) {
            email = val.trim().toLowerCase();
          }
        }

        // 2. Check Question 10 (1-on-1 consultation interest)
        if (label.includes("consultation") || label.includes("personal consultation") || label.includes("10.") || label.includes("9.") || label.includes("7.") || label.includes("chat")) {
          const answerText = typeof val === "string" ? val : (Array.isArray(val) ? val.join(", ") : "");
          if (answerText.toLowerCase().includes("yes") || answerText.toLowerCase().includes("love to be considered")) {
            isYesToQ7 = true;
          }
        }
      }
    }

    // If no valid email was entered, skip
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ ok: true, skipped: true, reason: "No email" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    }

    // Build attributes: OPEN_TO_CHAT and WANTS_TRIAL for Brevo segmentation
    const attributes = {
      SURVEY_SOURCE: "tally-life-clarity",
      WANTS_TRIAL: wantsTrial,
      OPEN_TO_CHAT: isYesToQ7,
    };

    // Upsert contact in Brevo list 3
    const brevoRes = await addOrUpdateBrevoContact(email, attributes, env.BREVO_API_KEY);

    return new Response(
      JSON.stringify({
        ok: brevoRes.ok,
        status: brevoRes.status,
        email,
        openToChat: isYesToQ7,
        wantsTrial,
      }),
      {
        status: brevoRes.ok ? 200 : 502,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      }
    );
  },
};

/**
 * Upserts a contact into Brevo List 3.
 */
async function addOrUpdateBrevoContact(email, attributes, apiKey) {
  const body = JSON.stringify({
    email,
    updateEnabled: true,
    listIds: [BREVO_LIST_ID],
    attributes,
  });

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body,
  });

  return { ok: res.ok, status: res.status };
}
