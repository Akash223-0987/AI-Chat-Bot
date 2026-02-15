# Folder Structure Guide

## 📁 CLIENT Folder
Put all frontend files here:

```
client/
├── index.html    # Main HTML file
├── script.js     # Frontend JavaScript (chat logic)
└── style.css     # CSS styles
```

## 📁 SERVER Folder
Put all backend files here:

```
server/
├── server.js     # Express server (handles API requests)
├── package.json  # Node.js dependencies
├── .env          # Your API key (create this file)
└── .env.example  # Example file showing what to put in .env
```

## 🚀 Quick Start

1. **Go to server folder:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file in server folder:**
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=3000
   ```

4. **Start server:**
   ```bash
   npm start
   ```

5. **Open browser:**
   Go to `http://localhost:3000`

That's it! The server will serve both the API and the frontend files.
