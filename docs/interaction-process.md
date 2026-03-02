# Web Interaction Process

This repository focuses on how users interact with the web utilities, not on site content. Use these building blocks to wire interactions in any UI.

## Core Flow
- Input → sendMessageProxy() → app handles message
- Quick action → quickReplyProxy(text) → app triggers contextual behavior
- Keyboard Enter → dispatch sendMessageProxy()
- Optional: app.toggleVoiceInput(), app.showGesturePad(), app.openRecruitModal()

## Minimal Wiring
1) Include `js/main.js`
2) Bind Enter key and button to `sendMessageProxy()`
3) Bind quick buttons to `quickReplyProxy(text)`

## Event Patterns
- Keydown: Enter | keyCode 13 | which 13 → preventDefault → sendMessageProxy()
- Click: Button → sendMessageProxy() or quickReplyProxy(text)
- Lifecycle: window.load → add initial log message

## Recommended UX
- CMD‑style prompt: `COGNODE AI>` then user text
- Keep animations minimal (`perf-mode` class) for performance
- Provide 2–4 quick actions for common tasks

## Security
- Never log tokens/secrets
- Keep GH_TOKEN only for the session when publishing

## Troubleshooting
- If Enter key doesn’t fire, switch to `keydown` and check `key`, `keyCode`, `which`
- If inline handlers fail, expose global `window.app` and use proxy functions

## References
- Examples: `examples/interaction-guide.html`, `examples/embed-widget.html`, `examples/process-minimal.html`
