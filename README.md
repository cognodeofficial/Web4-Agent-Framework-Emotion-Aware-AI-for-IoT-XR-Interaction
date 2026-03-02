# Web4 Agent Framework — Emotion‑Aware AI for IoT/XR

API‑first repository: focuses on terminal/API interactions and real‑world connections (IoT/XR), not website files.

![CI](https://github.com/cognodeofficial/Web4-Agent-Framework-Emotion-Aware-AI-for-IoT-XR-Interaction/actions/workflows/ci.yml/badge.svg)
![Pages](https://github.com/cognodeofficial/Web4-Agent-Framework-Emotion-Aware-AI-for-IoT-XR-Interaction/actions/workflows/deploy.yml/badge.svg)
![Medium](https://img.shields.io/badge/Medium-@cognodeofficial-000?logo=medium)
![Telegram](https://img.shields.io/badge/Telegram-@cognode-26A5E4?logo=telegram)
![GitHub](https://img.shields.io/badge/GitHub-@cognodeofficial-181717?logo=github)
![X](https://img.shields.io/badge/X-@cognodeofficial-000?logo=x)


## Architecture Overview
- User (Voice / Gesture / XR) → Multimodal Input Processor → Emotion Recognition Engine → Cognitive Decision Core (AI Agent) → IoT / XR / API Execution Layer

## Installation Guide
```bash
git clone https://github.com/cognodeofficial/Web4-Agent-Framework-Emotion-Aware-AI-for-IoT-XR-Interaction.git
cd Web4-Agent-Framework-Emotion-Aware-AI-for-IoT-XR-Interaction
npm install
cd ai-service
pip install -r requirements.txt
```

## Setup Environment
```bash
# .env
PORT=3000
AI_SERVICE_URL=http://localhost:8000
MQTT_BROKER=mqtt://localhost:1883
XR_MODE=false
EMOTION_MODEL=affective-v1
AGENT_API_TOKEN=change-me
```

## Run Development Mode
```bash
cd ai-service
python main.py
```

## Run Backend
```bash
npm run dev
```

## Run Production Mode
```bash
npm run build
npm start
```

## Emotion Engine API
```bash
curl -X POST http://localhost:3000/api/emotion/analyze \
  -H "Authorization: Bearer $AGENT_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input":"I feel overwhelmed but excited","mode":"text"}'
```

## IoT Control
```bash
curl -X POST http://localhost:3000/api/iot/device \
  -H "Authorization: Bearer $AGENT_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"device_id":"lamp-01","action":"turn_on"}'
```

## XR Interaction Mode
```bash
# Bash
XR_MODE=true npm run xr

# Windows PowerShell
$env:XR_MODE="true"; npm run xr
```

## Smart Agent Onboarding
```bash
# Start services
cd ai-service && python main.py &
cd .. && npm run dev

# Verify health
curl http://localhost:3000/health

# Recruit (simulated) and interact via API
curl -X POST http://localhost:3000/api/emotion/analyze \
  -H "Authorization: Bearer $AGENT_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input":"Recruit a productivity agent","mode":"text"}'
```

## Deployment Options (AI Service)
- Railway: simple container deploy for FastAPI service
- Fly.io: global edge placement for low‑latency inference
- VPS: full control on your own server
- Edge server: deploy near devices for minimal round‑trip

## Security Model
- Token‑based authentication (Authorization: Bearer <token>)
- Encrypted IoT channel (TLS mqtts://)
- Role‑based Agent Access (RBAC)
- Optional zero‑trust network layer

## Use Case Examples
- Smart City Control Agent
- Industrial IoT Supervisor
- Healthcare Emotional Companion
- Defense Simulation Interface
- Immersive Education AI Guide

## Roadmap
- Real‑time facial emotion detection
- Haptic feedback integration
- Distributed agent federation
- Edge AI optimization
- Quantum‑ready adaptive layer (Research)

## Organization
- COGNODE GitHub: https://github.com/cognodeofficial
- X: https://x.com/cognodeofficial
- Medium: https://medium.com/@cognodeofficial
- Telegram: https://t.me/cognode

## CI & Deploy
- CI verifies structure on pushes/PRs: .github/workflows/ci.yml
- Lint/typecheck via Super‑Linter: .github/workflows/lint.yml
- GitHub Pages deploy on main pushes: .github/workflows/deploy.yml  
  Result URL: https://cognodeofficial.github.io/Web4-Agent-Framework-Emotion-Aware-AI-for-IoT-XR-Interaction/

## Publish Script
Automate init/commit/remote/push:
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\publish.ps1 `
  -RepoUrl "https://github.com/cognodeofficial/Web4-Agent-Framework-Emotion-Aware-AI-for-IoT-XR-Interaction" `
  -Branch "main" `
  -CommitMessage "Initial publish"
```

## Branch Protection
- Enable in GitHub: Settings → Branches → Add rule for “main”
- Require pull request before merging
- Require status checks to pass (CI + lint + deploy preview)
- Disallow force pushes and deletions

## Contributing
1. Fork
2. Create a feature branch: git checkout -b feature/new-feature
3. Commit changes: git commit -m "Add new feature"
4. Push and open a Pull Request

## License
MIT License — see LICENSE
