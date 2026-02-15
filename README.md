# 🤖 AI Chat Bot

A secure, full-stack AI chatbot application powered by Google's Gemini API with a Node.js backend for enhanced security and API key protection.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)

## ✨ Features

- 🔒 **Secure API Management** - API keys safely stored server-side
- 💬 **Real-time Chat** - Instant responses with streaming support
- 🎨 **Modern UI** - Clean, responsive design that works on all devices
- ⚡ **High Performance** - Fast and efficient communication
- 🛡️ **CORS Protected** - Secure cross-origin requests
- 🔄 **Auto-reload** - Development mode with hot reloading

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [Google AI Studio](https://makersuite.google.com/app/apikey) API key

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd ai-chat-app
```

### 2. Install Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` folder:

```bash
cp .env.example .env
```

Edit the `.env` file and add your credentials:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

> 💡 **Tip:** Get your free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### 4. Start the Server

**Production mode:**
```bash
npm start
```

**Development mode (with auto-reload):**
```bash
npm run dev
```

The server will start on `http://localhost:3001`

### 5. Open the Application

Navigate to `http://localhost:3001` in your web browser and start chatting!

## 📁 Project Structure

```
ai-chat-app/
├── server/
│   ├── server.js          # Express backend server
│   ├── package.json       # Server dependencies
│   ├── .env               # Environment variables (create this)
│   └── .env.example       # Example environment template
├── client/
│   ├── index.html         # Main HTML file
│   ├── script.js          # Frontend logic
│   └── style.css          # Styling
├── .gitignore             # Git ignore rules
└── README.md              # Documentation
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes | - |
| `PORT` | Server port number | No | 3001 |

### Customization

- **Port Configuration:** Change the `PORT` value in `.env`
- **Frontend Styles:** Modify `client/style.css`
- **Chat Logic:** Update `client/script.js`

## 🛡️ Security Best Practices

- ✅ API keys are stored server-side only
- ✅ `.env` file is excluded from version control
- ✅ CORS middleware properly configured
- ✅ Environment variables validated on startup
- ⚠️ **Never** commit your `.env` file to Git
- ⚠️ Keep your API key confidential

## 🐛 Troubleshooting

### Common Issues

**Problem: Chat not responding**
- ✓ Verify the backend server is running on the correct port
- ✓ Check browser console for error messages
- ✓ Ensure no firewall is blocking port 3001

**Problem: API errors**
- ✓ Confirm your Gemini API key is valid and active
- ✓ Check the `.env` file format (no quotes around values)
- ✓ Verify you haven't exceeded your API quota

**Problem: CORS errors**
- ✓ Make sure you're accessing via `http://localhost:3001`, not by opening the HTML file directly
- ✓ Check that the backend server is running

**Problem: Server won't start**
- ✓ Ensure port 3001 is not already in use
- ✓ Run `npm install` again to verify all dependencies are installed
- ✓ Check Node.js version is 14.0.0 or higher

### Getting Help

If you encounter issues:
1. Check the [Issues](../../issues) page
2. Review server logs in the terminal
3. Verify all setup steps were completed

## 🚀 Deployment

### Deploy to Production

1. Set environment variables on your hosting platform
2. Update CORS settings in `server.js` if needed
3. Use `npm start` for production
4. Consider using a process manager like [PM2](https://pm2.keymetrics.io/)

### Recommended Platforms

- [Heroku](https://www.heroku.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [DigitalOcean](https://www.digitalocean.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Google Gemini API](https://ai.google.dev/)
- Powered by [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ by [Your Name]
