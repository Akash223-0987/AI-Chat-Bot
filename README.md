# ✨ Kairos

A modern, minimalist AI chat interface powered by **StepFun's Step-3.5 Flash** model via OpenRouter. This application provides a sleek, responsive chat experience with support for code snippets, markdown formatting, and theme switching.

![Kairos Interface](https://via.placeholder.com/800x450?text=Kairos+Interface)

## ✨ Features

- **Advanced AI Model**: Powered by `stepfun/step-3.5-flash:free`, capable of coherent conversation, coding assistance, and creative writing.
- **Modern UI/UX**: Clean, distraction-free interface with glassmorphism effects and smooth animations.
- **Markdown Support**: Renders bold text, lists, and code blocks beautifully.
- **Theme System**: Toggle between Light and Dark modes with automatic preference detection.
- **Suggestion Chips**: Quick-start conversation prompts for instant engagement.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Robust Error Handling**: Graceful handling of network issues and API timeouts.

## 🛠️ Tech Stack

- **Frontend**: 
  - HTML5, CSS3 (Vanilla), JavaScript (ES6+)
  - No heavy frameworks, just pure performance.
- **Backend**: 
  - Node.js & Express
  - RESTful API architecture
- **AI Integration**: 
  - [OpenRouter API](https://openrouter.ai/)
  - Model: **StepFun Step-3.5 Flash**

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)
- An API Key from [OpenRouter](https://openrouter.ai/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/ai-chat-app.git
    cd ai-chat-app
    ```

2.  **Install dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Configure Environment Variables:**
    - Create a `.env` file in the `server` directory.
    - Add your OpenRouter API key:
      ```env
      PORT=3000
      OPENROUTER_API_KEY=your_actual_api_key_here
      ```

4.  **Run the Application:**
    - Start the server:
      ```bash
      # In the server directory
      npm run dev
      ```
    - The server will start at `http://localhost:3000`.
    - Open your browser and navigate to `http://localhost:3000`.

## 📦 Deployment

This project is optimized for deployment on **Render** (Backend) and **Vercel** (Frontend).

See [DEPLOYMENT.md](./DEPLOYMENT.md) for a complete step-by-step guide.

## 📂 Project Structure

```bash
ai-chat-app/
├── client/              # Frontend files
│   ├── index.html       # Main HTML structure
│   ├── style.css        # Styles and themes
│   └── script.js        # UI logic and API calls
├── server/              # Backend files
│   ├── server.js        # Express server & API proxy
│   ├── package.json     # Backend dependencies
│   └── .env             # Environment variables (not committed)
└── README.md            # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
