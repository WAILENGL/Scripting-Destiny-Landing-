/**
 * Cloudflare Worker: Tally → Brevo webhook handler
 *
 * Receives Tally form submissions and:
 *  1. Checks if the respondent opted in on Q10 (open to contact / launch notification)
 *  2. If yes, adds them to Brevo list 3 ("Survey Responders - Contact OK")
 *     with the OPEN_TO_CHAT=true and SURVEY_SOURCE="tally-life-clarity" attributes
 *
 * Deploy:
 *   wrangler deploy  (after setting BREVO_API_KEY as a Worker secret)
 *
 * Secrets to set via Wrangler:
 *   wrangler secret put BREVO_API_KEY
 */

const BREVO_LIST_ID = 3; // "Survey Responders - Contact OK"
const TALLY_FORM_ID = "Ge6Deo"; // Tally form ID from the embed URL

/**
 * Tally sends a JSON POST to this worker.
 * Field names come from the "Question Reference" column in Tally's settings.
 *
 * Expected fields (configure these in Tally's "Question Reference" column):
 *   - q10_email       : email field on Q10
 *   - q10_open_to_contact : "Yes" | "No" (radio/checkbox on Q10)
 *   - q10_notify_launch   : "Yes" | "No" (optional separate checkbox)
 */
export default {
  async fetch(request, env) {
    // Only allow POST
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // Optional: Verify Tally signing secret to authenticate the webhook
    // Tally sends X-Tally-Signature header — set TALLY_SIGNING_SECRET as a Worker secret
    // For now we skip verification but keep the hook in place
    // const signature = request.headers.get("X-Tally-Signature") ?? "";
    // if (!verifySignature(signature, rawBody, env.TALLY_SIGNING_SECRET)) {
    //   return new Response("Unauthorized", { status: 401 });
    // }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    // Guard: only handle our specific form
    if (payload.data?.formId !== TALLY_FORM_ID) {
      return new Response("Not our form", { status: 200 });
    }

    // Parse fields from Tally's flat fields array into a key→value map
    const fields = {};
    for (const field of payload.data?.fields ?? []) {
      const key = field.key || field.label;
      fields[key] = field.value;
    }

    // Determine opt-in: respondent chose to be contacted or notified
    const email = (fields["q10_email"] ?? "").trim().toLowerCase();
    const openToContact =
      fields["q10_open_to_contact"] === "Yes" ||
      fields["q10_notify_launch"] === "Yes";

    if (!email || !openToContact) {
      // No opt-in or no email — nothing to do
      return new Response(JSON.stringify({ ok: true, skipped: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Add / update contact in Brevo
    const brevoRes = await addOrUpdateBrevoContact(email, env.BREVO_API_KEY);

    return new Response(
      JSON.stringify({ ok: brevoRes.ok, status: brevoRes.status }),
      {
        status: brevoRes.ok ? 200 : 502,
        headers: { "Content-Type": "application/json" },
      }
    );
  },
};

/**
 * Upserts a contact into Brevo list 3 with OPEN_TO_CHAT=true.
 * Uses the /v3/contacts upsert endpoint (updateEnabled: true).
 */
async function addOrUpdateBrevoContact(email, apiKey) {
  const body = JSON.stringify({
    email,
    updateEnabled: true,
    listIds: [BREVO_LIST_ID],
    attributes: {
      OPEN_TO_CHAT: true,
      SURVEY_SOURCE: "tally-life-clarity",
    },
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
