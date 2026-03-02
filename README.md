# COGNODE Interaction Demo

Interactive Web demo showing how users can engage with built‑in utilities: messaging, quick actions, voice, gestures, and recruit modal — styled as a CMD‑like terminal for a lightweight experience.

![CI](https://github.com/cognodeofficial/interaction-demo/actions/workflows/ci.yml/badge.svg)
![Pages](https://github.com/cognodeofficial/interaction-demo/actions/workflows/deploy.yml/badge.svg)
![Medium](https://img.shields.io/badge/Medium-@cognodeofficial-000?logo=medium)
![Telegram](https://img.shields.io/badge/Telegram-@cognode-26A5E4?logo=telegram)

## Features
- CMD‑style chat UI, monospaced green on black
- Quick actions: Recruit Agent, Connect IoT, Emotion, AR Mode
- Voice/gesture triggers exposed via app utilities
- Lightweight mode to reduce animations on low‑memory devices

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
- Demo: examples/interaction-demo.html
- Guide: examples/interaction-guide.html
- Embed: examples/embed-widget.html

## Built‑in Utilities
- sendMessageProxy() — send a message from input
- quickReplyProxy(text) — trigger predefined actions
- app.toggleVoiceInput() — toggle voice input
- app.showGesturePad() — open gesture pad
- app.openRecruitModal() — open recruit modal

## CI & Deploy
- CI verifies structure on pushes/PRs: .github/workflows/ci.yml
- Lint/typecheck via Super‑Linter: .github/workflows/lint.yml
- GitHub Pages deploy on main pushes: .github/workflows/deploy.yml  
  Result URL: https://cognodeofficial.github.io/interaction-demo/

## Publish Script
Automate init/commit/remote/push:
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\publish.ps1 `
  -RepoUrl "https://github.com/cognodeofficial/interaction-demo" `
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
