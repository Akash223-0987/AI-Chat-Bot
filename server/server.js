require("dotenv").config();

const express = require('express');
const cors = require('cors');
const path = require('path');


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

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY not found in .env file");
    }

    const MAX_RETRIES = 3;
    let lastError = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        if (attempt > 1) {
          console.log(`Retrying request (attempt ${attempt}/${MAX_RETRIES})...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

        const response = await fetch(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
              'HTTP-Referer': 'http://localhost:3000',
              'X-Title': 'AI Chat App',
            },
            body: JSON.stringify({
              model: 'stepfun/step-3.5-flash:free',
              messages: [
                {
                  role: 'system',
                  content: `You are Kairios, a modern, minimalist AI assistant.

Respond in a clean, natural conversational tone.

Do not use markdown formatting.
Do not use asterisks (*), bullet points, section dividers, or decorative symbols.
Do not create headings unless explicitly asked.

Keep responses concise and direct.
Use short paragraphs only.

Avoid over-explaining.
Expand only if the user asks for a deep explanation.

Sound intelligent, calm, and modern — like a polished AI product.

Avoid academic essay style.
Avoid dramatic formatting.

Focus on clarity and readability.`
                },
                {
                  role: 'user',
                  content: message,
                }
              ],
            }),
            signal: controller.signal
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error(`OpenRouter API Error (Attempt ${attempt}):`, errorData);
          
          // If it's a 5xx error, throw to retry
          if (response.status >= 500) {
              throw new Error(`Server returned ${response.status}: ${JSON.stringify(errorData)}`);
          }
          
          // For client errors (4xx), return immediately
          return res.status(response.status).json({ 
            error: errorData.error?.message || 'Failed to get response from AI' 
          });
        }

        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          console.error('Invalid API response structure:', JSON.stringify(data, null, 2));
          return res.status(500).json({ error: 'Invalid response from AI' });
        }

        const aiResponse = data.choices[0].message.content;
        if (!aiResponse) {
          console.error('No text in AI response:', JSON.stringify(data, null, 2));
          return res.status(500).json({ error: 'AI response is empty' });
        }

        return res.json({ response: aiResponse });

      } catch (error) {
        lastError = error;
        // Don't retry if it's an abort error (user cancelled) or specific client errors
        if (error.name === 'AbortError') {
             console.error('Request timed out');
        } else {
             console.error(`Request failed (Attempt ${attempt}):`, error.message);
        }
        
        // If it's the last attempt, fall through to error handler
        if (attempt === MAX_RETRIES) break;
      }
    }

    // If we get here, all retries failed
    console.error('All retries failed. Last error:', lastError);
    
    let userMessage = 'Internal server error';
    if (lastError.code === 'ENOTFOUND' || lastError.code === 'EAI_AGAIN') {
      userMessage = 'Could not connect to AI service. Please check your internet connection.';
    } else if (lastError.code === 'ETIMEDOUT' || lastError.code === 'ESOCKETTIMEDOUT' || lastError.code === 'UND_ERR_CONNECT_TIMEOUT' || lastError.name === 'AbortError') {
      userMessage = 'Request timed out after multiple attempts. Please try again later.';
    } else if (lastError.code === 'ECONNRESET') {
      userMessage = 'Connection was reset. Please try again.';
    } else if (lastError.message?.includes('API_KEY')) {
      userMessage = lastError.message;
    }
    
    res.status(500).json({ error: userMessage });
  } catch (error) {
    // Catch-all for any other sync errors
    console.error('Unexpected Server Error:', error);
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
