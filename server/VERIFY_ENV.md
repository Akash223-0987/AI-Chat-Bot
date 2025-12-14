# ✅ .env File Verification & Fix Guide

## Current Status Check

Run this command to check your .env file:
```bash
cd server
node fix-env.js
```

## Correct .env File Format

Your `server/.env` file should contain **EXACTLY** this (replace with your actual API key):

```
GEMINI_API_KEY=AIzaSyDKDoP_-V_vBdNpqh3t8aXTdy7lLIodEgI
PORT=3000
```

## Common Issues & Fixes

### ❌ Issue 1: Leading Spaces
**Wrong:**
```
     GEMINI_API_KEY=your_key
```

**Correct:**
```
GEMINI_API_KEY=your_key
```

### ❌ Issue 2: Spaces Around Equals
**Wrong:**
```
GEMINI_API_KEY = your_key
```

**Correct:**
```
GEMINI_API_KEY=your_key
```

### ❌ Issue 3: Quotes
**Wrong:**
```
GEMINI_API_KEY="your_key"
```

**Correct:**
```
GEMINI_API_KEY=your_key
```

### ❌ Issue 4: Empty File
If the file is empty, add:
```
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

## Quick Fix Steps

1. **Open:** `E:\ai chat app\server\.env`

2. **Make sure it has:**
   ```
   GEMINI_API_KEY=your_actual_api_key
   PORT=3000
   ```

3. **Save the file**

4. **Verify:**
   ```bash
   cd server
   node check-env.js
   ```

5. **Start server:**
   ```bash
   npm start
   ```

## Get API Key

If you need a new API key:
- Visit: https://makersuite.google.com/app/apikey
- Sign in and create a new API key
- Copy and paste it in your .env file

