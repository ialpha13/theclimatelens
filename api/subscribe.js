const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const DATASET = process.env.VITE_SANITY_DATASET || "production";
const API_VERSION = process.env.VITE_SANITY_API_VERSION || "2025-06-01";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN;

function json(status, body) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    },
    body: JSON.stringify(body)
  };
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(200).setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!PROJECT_ID || !TOKEN) {
    return res.status(500).json({ error: "Newsletter capture is not configured yet." });
  }

  const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const email = normalizeEmail(payload.email);

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const documentId = `subscriber-${email.replace(/[^a-z0-9]+/g, "-")}`;
  const now = new Date().toISOString();
  const doc = {
    _id: documentId,
    _type: "subscriber",
    email,
    subscribedAt: now,
    source: payload.source || "website",
    page: payload.page || "",
    status: "active"
  };

  const mutateUrl = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;
  const response = await fetch(mutateUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`
    },
    body: JSON.stringify({
      mutations: [
        {
          createIfNotExists: doc
        }
      ]
    })
  });

  if (!response.ok) {
    const text = await response.text();
    return res.status(500).json({ error: "Unable to save subscription.", details: text });
  }

  return res.status(200).json({ ok: true });
};
