# AI Chat Bot

A secure AI chatbot application using Google's Gemini API with a Node.js backend to protect your API key.

## Features

- 🔒 Secure API key handling 
- 💬 Real-time chat interface
- 🎨 Modern, responsive UI
- ⚡ Fast and efficient

## Setup Instructions

### 1. Install Dependencies

Navigate to the server folder and install dependencies:

```bash
cd server
npm install
```

### 2. Configure API Key

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the `server` folder:
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=3000
   ```

### 3. Start the Backend Server

From the `server` folder:

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3000` and automatically serve the client files.

### 4. Open the Application

Once the server is running, open your browser and go to:
```
http://localhost:3000
```

The server automatically serves the client files, so you don't need a separate frontend server!

## Project Structure

```
ai-chat-app/
├── server/
│   ├── server.js          # Backend Express server
│   ├── package.json       # Server dependencies
│   ├── .env               # Environment variables (create this)
│   └── .env.example       # Example environment file
├── client/
│   ├── index.html         # Frontend HTML
│   ├── script.js          # Frontend JavaScript
│   └── style.css          # Frontend styles
├── .gitignore             # Git ignore file
└── README.md              # This file
```

## Security Notes

- ⚠️ Never commit your `.env` file to version control
- ✅ The API key is stored securely on the backend
- ✅ Frontend only communicates with your backend server

## Troubleshooting

- **Chat not responding**: Make sure the backend server is running on port 3000
- **API errors**: Verify your API key is correct in the `server/.env` file
- **CORS errors**: The backend includes CORS middleware to allow frontend requests

