# How to Fix "API key not configured" Error

## Problem
The server can't find your API key in the .env file.

## Solution

1. **Open the `.env` file** in the `server` folder
2. **Make sure it has this exact format** (no spaces, no quotes):

```
GEMINI_API_KEY=AIzaSyDKDoP_-V_vBdNpqh3t8aXTdy7lLIodEgI
PORT=3000
```

3. **Important:**
   - NO leading spaces before `GEMINI_API_KEY`
   - NO spaces around the `=` sign
   - NO quotes around the API key value
   - Make sure there's a newline after PORT=3000

4. **Save the file**

5. **Restart the server:**
   ```bash
   # Stop the server (Ctrl+C)
   # Then start again:
   npm start
   ```

## Example of CORRECT .env file:
```
GEMINI_API_KEY=AIzaSyDKDoP_-V_vBdNpqh3t8aXTdy7lLIodEgI
PORT=3000
```

## Example of WRONG .env file:
```
     GEMINI_API_KEY=AIzaSyDKDoP_-V_vBdNpqh3t8aXTdy7lLIodEgI  ← Has leading spaces
GEMINI_API_KEY = AIzaSyDKDoP_-V_vBdNpqh3t8aXTdy7lLIodEgI    ← Has spaces around =
GEMINI_API_KEY="AIzaSyDKDoP_-V_vBdNpqh3t8aXTdy7lLIodEgI"    ← Has quotes
```

## Get Your API Key
If you don't have an API key, get one from:
https://makersuite.google.com/app/apikey

