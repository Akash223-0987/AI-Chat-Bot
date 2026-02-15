# Deployment Guide: Render & Vercel

This guide explains how to deploy your **AI Chat App** using **Render** for the backend (API) and **Vercel** for the frontend (UI).

---

## 🚀 Prerequisites

1.  **Push your code to GitHub**:
    -   Create a new repository on GitHub.
    -   Push all your code (including `client` and `server` folders) to this repository.
    *(Make sure `.env` is NOT pushed - it should be in `.gitignore`)*

---

## 1️⃣ Deploy Backend to Render

Render will host your Node.js server that handles the AI API requests.

1.  Go to [dashboard.render.com](https://dashboard.render.com/) and log in.
2.  Click **"New +"** and select **"Web Service"**.
3.  Connect your GitHub repository.
4.  Configure the service:
    -   **Name**: `ai-chat-backend` (or similar)
    -   **Region**: Choose the one closest to you.
    -   **Branch**: `main` (or `master`)
    -   **Root Directory**: `server`  **(Important!)**
    -   **Runtime**: `Node`
    -   **Build Command**: `npm install`
    -   **Start Command**: `node server.js`
5.  Scroll down to **Environment Variables**:
    -   Key: `OPENROUTER_API_KEY`
    -   Value: `your_actual_api_key_here`
    -   *(You can copy this from your local `.env` file)*
6.  Click **"Create Web Service"**.
7.  Wait for the deployment to finish. You will see a URL like `https://ai-chat-backend-xyz.onrender.com`.
    -   **Copy this URL**. You will need it in the next step.

---

## 2️⃣ Connect Frontend to Backend

Now we need to tell your frontend where to send the chat messages.

1.  Open `client/script.js` in your code editor.
2.  Find line 4:
    ```javascript
    : 'https://YOUR-RENDER-APP-NAME.onrender.com/api/chat';
    ```
3.  Replace `https://YOUR-RENDER-APP-NAME.onrender.com` with the **Render URL** you copied in the previous step.
    -   *Example*: `https://ai-chat-backend-xyz.onrender.com/api/chat`
4.  **Save** the file.
5.  **Commit and Push** this change to GitHub.

---

## 3️⃣ Deploy Frontend to Vercel

Vercel will host your static HTML/CSS/JS files for fast loading.

1.  Go to [vercel.com](https://vercel.com/) and log in.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  Configure the project:
    -   **Project Name**: `ai-chat-frontend` (or similar)
    -   **Framework Preset**: `Other` (since it's plain HTML/JS)
    -   **Root Directory**: Click "Edit" and select the `client` folder. **(Important!)**
5.  Click **"Deploy"**.

---

## 🎉 Done!

-   Visit your **Vercel URL** (e.g., `https://ai-chat-frontend.vercel.app`).
-   Your chat app should now work!
-   *Note: Since the backend is on Render's free tier, it might take 50+ seconds to wake up for the first request. The frontend on Vercel will load instantly.*
