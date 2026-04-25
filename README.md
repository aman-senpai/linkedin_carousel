# 🚀 LinkedIn Carousel Studio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Pro-blue?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff69b4?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

**LinkedIn Carousel Studio** is a high-performance, AI-driven web application designed to help creators, marketers, and developers build stunning, viral LinkedIn carousels and infographics in seconds. Leveraging Google's Gemini Pro, it transforms simple topics or YouTube videos into ready-to-post visual content.

---

## ✨ Key Features

### 🤖 AI-Powered Content Generation
- **Topic-to-Carousel**: Simply enter a topic, and Gemini generates a structured 10-slide carousel with hooks, body content, and CTAs.
- **YouTube Integration**: Import transcripts from YouTube videos to summarize complex video content into digestible slides.
- **Smart Infographics**: Generate vertical infographics for a different style of storytelling.

### 🎨 Premium Design System
- **125+ Premium Visual Templates**: A massive library of distinct styles ranging from Corporate and Tech to Comics (Marvel/DC) and Cyberpunk.
- **Dynamic Slide Types**: Diverse layouts including Cover, Quote, List, Comparison, Stats Grid, and more.
- **Framer Motion Animations**: Silky smooth transitions and micro-interactions for a premium feel.
- **Glassmorphism & Modern UI**: A sleek, dark-mode-first editor interface.

### 🛠️ Interactive Editor
- **Real-time Preview**: See changes instantly as you edit text, images, or themes.
- **Drag-and-Drop Images**: Upload your own brand assets or profile pictures.
- **Auto-Distribution**: Automatically distribute uploaded images across your slides.
- **Layout Cycling**: Cycle through multiple design variants for each slide type.

### 📥 Production-Ready Export
- **PDF Export**: Generate high-quality PDFs optimized for LinkedIn's carousel format.
- **Image Bundles**: Export slides as a ZIP of high-resolution JPEGs for Instagram.
- **Responsive Layouts**: Slides are rendered at a native 1200x1500 resolution (4:5 aspect ratio) for maximum engagement.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Runtime**: [Bun](https://bun.sh/) / Node.js
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **AI Engine**: [Google Gemini Pro API](https://ai.google.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Vis**: [Recharts](https://recharts.org/)
- **Exporting**: `jspdf`, `html-to-image`, `pdf-lib`, `jszip`

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/linkedin-carousel.git
cd linkedin-carousel
```

### 2. Install Dependencies
We recommend using **Bun** for the fastest experience, but NPM/Yarn work too.
```bash
bun install
# or
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your Google Gemini API Key:
```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

### 4. Run Development Server
```bash
bun dev
# or
npm run dev
```
Open [http://localhost:3032](http://localhost:3032) in your browser.

---

## 📸 Screenshots

| Carousel Editor | Infographic Mode |
| :---: | :---: |
| ![Carousel Editor](public/screenshot-editor.png) | ![Infographic](public/screenshot-infographic.png) |

*(Note: Replace with actual screenshots of your application)*

---

## 🏗️ Architecture

- `/app`: Next.js app router and API routes.
- `/components`: Modular React components for slides, editor, and UI elements.
- `/lib`: Utility functions, constants, AI prompts, and template configurations.
- `/public`: Static assets and fonts.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/aman-senpai">aman-senpai</a>
</p>
