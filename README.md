# COGNODE Interaction Demo

Process‑first repository: focuses on how users interact with the web utilities (inputs, events, quick actions, voice/gesture), not on site content.

![CI](https://github.com/cognodeofficial/interaction-demo-full/actions/workflows/ci.yml/badge.svg)
![Pages](https://github.com/cognodeofficial/interaction-demo-full/actions/workflows/deploy.yml/badge.svg)
![Medium](https://img.shields.io/badge/Medium-@cognodeofficial-000?logo=medium)
![Telegram](https://img.shields.io/badge/Telegram-@cognode-26A5E4?logo=telegram)
![GitHub](https://img.shields.io/badge/GitHub-@cognodeofficial-181717?logo=github)
![X](https://img.shields.io/badge/X-@agentNEXORA-000?logo=x)

## Features
- Interaction flow: input → send → handle → feedback
- Quick actions for contextual behavior
- Voice/gesture hooks via app utilities
- Lightweight mode to reduce animations

## Repository Structure
```
.
├── index.html
├── css/styles.css
├── js/main.js
├── examples/
│   ├── interaction-demo.html
│   ├── interaction-guide.html
│   └── embed-widget.html
└── .github/workflows/
    ├── ci.yml
    └── deploy.yml
```

## Getting Started
### Local Preview
```bash
python -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/
```

### Interaction Examples
- Minimal: examples/process-minimal.html
- Demo: examples/interaction-demo.html
- Guide: examples/interaction-guide.html
- Embed: examples/embed-widget.html

## Built‑in Utilities
- sendMessageProxy() — send a message from input
- quickReplyProxy(text) — trigger predefined actions
- app.toggleVoiceInput() — toggle voice input
- app.showGesturePad() — open gesture pad
- app.openRecruitModal() — open recruit modal

## Architecture Overview
- User (Voice / Gesture / XR) → Multimodal Input Processor → Emotion Recognition Engine → Cognitive Decision Core (AI Agent) → IoT / XR / API Execution Layer

## Installation Guide
- git clone https://github.com/cognodeofficial/Web4-Agent-Framework-Emotion-Aware-AI-for-IoT-XR-Interaction.git
- cd Web4-Agent-Framework-Emotion-Aware-AI-for-IoT-XR-Interaction
- npm install
- cd ai-service
- pip install -r requirements.txt

## Setup Environment
- PORT=3000
- AI_SERVICE_URL=http://localhost:8000
- MQTT_BROKER=mqtt://localhost:1883
- XR_MODE=true
- EMOTION_MODEL=affective-v1

## Run Development Mode
- cd ai-service
- python main.py

## Jalankan Backend
- npm run dev

## Run Production Mode
- npm run build
- npm start

## Emotion Engine API
- POST /api/emotion/analyze
- Body:
  - {"input":"I feel overwhelmed but excited","mode":"text"}
- Response:
  - {"emotion":"mixed","confidence":0.87,"state":"high_cognitive_load"}

## IoT Control
- POST /api/iot/device
- Body:
  - {"device_id":"lamp-01","action":"turn_on"}

## XR Interaction Mode
- XR_MODE=true
- npm run xr

## Smart Agent Onboarding
- Read: docs/smart-agent-onboarding.md
- Minimal example: examples/onboarding-minimal.html

## Organization
- COGNODE GitHub: https://github.com/cognodeofficial
- X: https://x.com/agentNEXORA
 - Medium: https://medium.com/@cognodeofficial
 - Telegram: https://t.me/cognode

## CI & Deploy
- CI verifies structure on pushes/PRs: .github/workflows/ci.yml
- Lint/typecheck via Super‑Linter: .github/workflows/lint.yml
- GitHub Pages deploy on main pushes: .github/workflows/deploy.yml  
  Result URL: https://cognodeofficial.github.io/interaction-demo-full/

## Publish Script
Automate init/commit/remote/push:
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\publish.ps1 `
  -RepoUrl "https://github.com/cognodeofficial/interaction-demo-full" `
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
