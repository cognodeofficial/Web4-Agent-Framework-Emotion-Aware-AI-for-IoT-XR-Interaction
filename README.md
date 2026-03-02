# COGNODE - Web 4.0 AI Agent Recruitment Platform

![COGNODE Banner](https://img.shields.io/badge/COGNODE-Web%204.0-00f3ff?style=for-the-badge&logo=robot)

Platform Web 4.0 untuk merekrut agen AI cerdas dengan pemahaman emosi, IoT integration, dan interaksi natural melalui suara, gesture, dan AR/VR.

## 🚀 Fitur Utama

### 🤖 AI Agents Marketplace
- **Nova Assistant** - Agen produktivitas dengan pemahaman konteks mendalam
- **Aura Creative** - Partner kreatif dengan emotion-aware design
- **Sync IoT Master** - Kontroler IoT sentral dengan respons real-time
- **Empath Companion** - Agen dukungan emosional dengan deteksi sentimen
- **Code Weaver** - Developer AI untuk code yang human-centric
- **Guardian Security** - Sistem keamanan proaktif

### 🌐 Web 4.0 Capabilities
- ✅ **Pemahaman Konteks & Emosi** - Analisis emosi real-time
- ✅ **IoT Neural Network** - Terhubung dengan perangkat IoT
- ✅ **Real-time & Proaktif** - Prediksi behavioral dengan latensi <50ms
- ✅ **Interaksi Natural** - Voice-first interface & gesture recognition
- ✅ **AR/VR Integration** - WebXR support & spatial computing
- ✅ **Semantic Web** - RDF & OWL support dengan smart contracts

### 🎨 UI/UX Features
- Glassmorphism design dengan neon accents
- Animasi halus dan immersive
- Responsive untuk desktop & mobile
- Dark mode optimized
- Accessibility friendly

## 📁 Struktur Project

```
cognode-web4/
├── index.html          # Halaman utama
├── css/
│   └── styles.css      # Stylesheet utama
├── js/
│   └── main.js         # JavaScript module
├── assets/
│   ├── images/         # Folder untuk gambar
│   └── icons/          # Folder untuk ikon
└── README.md           # Dokumentasi
```

## 🚀 Cara Menggunakan

### 1. Buka Langsung di Browser
```bash
# Extract zip file, lalu buka index.html di browser
open index.html
```

### 2. Deploy ke Web Server
```bash
# Copy folder ke web server
scp -r cognode-web4/ user@server:/var/www/html/
```

### 3. Live Server (Development)
```bash
# Menggunakan VS Code Live Server
# Atau Python simple server
python -m http.server 8000
```

## 🎯 Interaksi

### Voice Mode
- Klik tombol mikrofon untuk memulai rekaman suara
- Simulasi voice recognition dengan respons otomatis

### Gesture Control
- Gerakkan mouse/kursor di area Gesture Control
- Deteksi gesture: Swipe, Circle, Pinch, Wave, Tap

### AR/VR Mode
- Klik "Masuk Mode AR" untuk simulasi WebXR
- VR overlay dengan instruksi headset

### Chat dengan AI
- Ketik pesan atau gunakan quick replies
- Respon kontekstual berdasarkan input

## 🛠️ Teknologi

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome** - Icon library
- **Google Fonts** - Orbitron & Inter fonts
- **Vanilla JavaScript** - ES6+ module pattern

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Neon Blue | `#00f3ff` | Primary accent |
| Neon Purple | `#bc13fe` | Secondary accent |
| Neon Green | `#0aff0a` | Success/IoT |
| Deep Space | `#050508` | Background |

## 🔧 Customization

### Menambah Agen Baru
Edit file `js/main.js` dan tambahkan ke array `AGENTS_DATA`:

```javascript
{
    id: 7,
    name: "Nama Agen",
    category: "productivity",
    avatar: "🎯",
    description: "Deskripsi agen...",
    skills: { skill1: 95, skill2: 90 },
    status: "online",
    emotion: "focused",
    price: "$29/mo",
    features: ["Feature 1", "Feature 2"]
}
```

### Mengubah Tema Warna
Edit CSS variables di `css/styles.css`:

```css
:root {
    --neon-blue: #00f3ff;
    --neon-purple: #bc13fe;
    --neon-green: #0aff0a;
}
```

## 📄 License

© 2026 COGNODE. Web 4.0 Intelligence Platform. All rights reserved.

## 🤝 Kontribusi

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/fitur-baru`)
3. Commit perubahan (`git commit -m 'Add fitur baru'`)
4. Push ke branch (`git push origin feature/fitur-baru`)
5. Buat Pull Request

---

**Dibuat dengan ❤️ untuk masa depan Web 4.0**