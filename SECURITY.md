# Security Policy

## Supported Versions
- main branch

## Reporting a Vulnerability
- Create a private security advisory or email the maintainer
- Do not disclose publicly until a fix is available

## Model
- Token‑based authentication for API endpoints
- Encrypted IoT channel (TLS via mqtts:// broker)
- Role‑based Agent Access (RBAC) at the application layer
- Optional zero‑trust network layer for perimeter reduction

## Guidelines
- Never commit tokens or secrets
- Rotate credentials regularly
- Prefer bearer tokens for API clients
- Use TLS for MQTT/WebSocket when available
