const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from client folder
app.use(express.static(path.join(__dirname, '../client')));

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: message,
            }],
          }],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', errorData);
      return res.status(response.status).json({ 
        error: errorData.error?.message || 'Failed to get response from AI' 
      });
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Invalid API response structure:', JSON.stringify(data, null, 2));
      return res.status(500).json({ error: 'Invalid response from AI' });
    }

    const aiResponse = data.candidates[0].content.parts[0]?.text;
    if (!aiResponse) {
      console.error('No text in AI response:', JSON.stringify(data, null, 2));
      return res.status(500).json({ error: 'AI response is empty' });
    }

    res.json({ response: aiResponse });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${PORT} is already in use!`);
    console.error(`\nTo fix this, run one of these commands:`);
    console.error(`  Windows: netstat -ano | findstr :${PORT}`);
    console.error(`  Then kill the process: taskkill /PID <PID> /F`);
    console.error(`\nOr change the port in your .env file: PORT=3001`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});

