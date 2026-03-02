# Interaction Process (API‑first)

Use terminal/API commands to interact with the agent and connected systems. No UI wiring required.

## Emotion Analysis
```bash
curl -X POST http://localhost:3000/api/emotion/analyze \
  -H "Authorization: Bearer $AGENT_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input":"Hello, I feel overwhelmed","mode":"text"}'
```

## IoT Device Control
```bash
curl -X POST http://localhost:3000/api/iot/device \
  -H "Authorization: Bearer $AGENT_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"device_id":"lamp-01","action":"turn_on"}'
```

## XR Mode
```bash
# Bash
XR_MODE=true npm run xr

# Windows PowerShell
$env:XR_MODE="true"; npm run xr
```

## Security Notes
- Use bearer tokens (AGENT_API_TOKEN) for API access
- Prefer TLS (mqtts://) for IoT channels
