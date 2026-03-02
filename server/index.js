const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mqtt = require("./mqtt");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";
const API_TOKEN = process.env.AGENT_API_TOKEN || "";
function requireToken(req, res, next) {
  if (!API_TOKEN) return next();
  const h = req.headers["authorization"] || "";
  const v = h.startsWith("Bearer ") ? h.slice(7) : (h.startsWith("token ") ? h.slice(6) : "");
  if (v && v === API_TOKEN) return next();
  return res.status(401).json({ error: "unauthorized" });
}
app.post("/api/emotion/analyze", requireToken, async (req, res) => {
  try {
    const r = await fetch(AI_SERVICE_URL + "/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(200).json({ emotion: "mixed", confidence: 0.5, state: "unknown" });
  }
});
app.post("/api/iot/device", requireToken, async (req, res) => {
  const b = req.body || {};
  if (!b.device_id || !b.action) return res.status(400).json({ error: "invalid" });
  const ok = await mqtt.publishDevice(b.device_id, b.action);
  if (!ok) return res.status(501).json({ error: "mqtt_unavailable" });
  res.json({ status: "ok" });
});
app.get("/health", (req, res) => res.json({ ok: true }));
const XR_MODE = process.env.XR_MODE === "true";
if (XR_MODE) {
  app.get("/api/xr/status", (req, res) => res.json({ xr: true }));
}
app.listen(PORT, () => {});
