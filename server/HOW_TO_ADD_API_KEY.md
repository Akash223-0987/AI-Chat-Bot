# How to Add/Change Your API Key

## 📍 Where to Change It

**ONLY ONE PLACE:** The `.env` file in the `server` folder

```
E:\ai chat app\server\.env
```

## ✅ Steps to Add/Change API Key

1. **Open the file:**
   - Navigate to: `E:\ai chat app\server\.env`
   - Open it in any text editor (Notepad, VS Code, etc.)

2. **Add or update the API key:**
   ```
   GEMINI_API_KEY=your_new_api_key_here
   PORT=3000
   ```

3. **Important Formatting:**
   - ✅ NO spaces before `GEMINI_API_KEY`
   - ✅ NO spaces around the `=` sign
   - ✅ NO quotes around the API key
   - ✅ Each line on its own line

4. **Save the file**

5. **Restart the server:**
   ```bash
   # Stop the server (Ctrl+C if running)
   # Then start again:
   cd server
   npm start
   ```

## 📝 Example

**Correct format:**
```
GEMINI_API_KEY=AIzaSyDKDoP_-V_vBdNpqh3t8aXTdy7lLIodEgI
PORT=3000
```

**Wrong formats (DON'T DO THIS):**
```
     GEMINI_API_KEY=key    ← Has leading spaces
GEMINI_API_KEY = key       ← Has spaces around =
GEMINI_API_KEY="key"       ← Has quotes
```

## 🔑 Get Your API Key

If you need a new API key:
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key
5. Paste it in your `.env` file

## ✅ Verify It Works

After saving, test with:
```bash
cd server
node check-env.js
```

This will tell you if the API key is detected correctly.

