const IS_LOCALHOST = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const LOCAL_PORT = 3001; // Must match PORT in server/.env
const API_URL = IS_LOCALHOST
    ? `http://localhost:${LOCAL_PORT}/api/chat`
    : 'https://kairos-mn58.onrender.com/api/chat';

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const sendButton = document.getElementById('sendButton');
    const themeToggle = document.getElementById('themeToggle');
    const clearChat = document.getElementById('clearChat');
    const welcomeCard = document.getElementById('welcomeCard');
    const suggestions = document.getElementById('suggestions');

    // --- Theme Toggle ---
    const savedTheme = localStorage.getItem('ai-chat-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('ai-chat-theme', next);
    });

    // --- Clear Chat ---
    function clearChatHandler() {
        chatMessages.innerHTML = `
            <div class="welcome-card" id="welcomeCard">
                <img src="./favicon.svg" alt="Kairos Logo" class="welcome-logo" />
                <h2 class="welcome-title">Hello, I'm Kairos.</h2>
                <p class="welcome-text">A modern AI assistant. Ask me anything.</p>
                <div class="suggestions" id="suggestions">
                    <button class="suggestion-chip" data-prompt="Explain quantum computing in simple terms">🔬 Quantum Computing</button>
                    <button class="suggestion-chip" data-prompt="Write a short poem about the ocean">🌊 Write a Poem</button>
                    <button class="suggestion-chip" data-prompt="What are the best tips for learning to code?">💻 Coding Tips</button>
                </div>
            </div>
        `;
        bindSuggestionChips();
        // Close mobile menu if open
        document.getElementById('mobileMenuDropdown').classList.remove('show');
    }

    clearChat.addEventListener('click', clearChatHandler);

    // --- Mobile Menu Logic ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuDropdown = document.getElementById('mobileMenuDropdown');
    const mobileClearChat = document.getElementById('mobileClearChat');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');

    // Toggle Menu
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuDropdown.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenuDropdown.contains(e.target)) {
            mobileMenuDropdown.classList.remove('show');
        }
    });

    // Mobile Clear Chat
    mobileClearChat.addEventListener('click', clearChatHandler);

    // Mobile Theme Toggle
    mobileThemeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('ai-chat-theme', next);
        mobileMenuDropdown.classList.remove('show');
    });

    // --- Suggestion Chips ---
    function bindSuggestionChips() {
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const prompt = chip.getAttribute('data-prompt');
                userInput.value = prompt;
                sendButton.disabled = false;
                userInput.focus();
                chatForm.requestSubmit();
            });
        });
    }
    bindSuggestionChips();

    // --- Auto-resize Textarea ---
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
        sendButton.disabled = !userInput.value.trim();
    });

    // --- Submit Handler ---
    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;

        // Hide welcome card on first message
        const welcome = document.getElementById('welcomeCard');
        if (welcome) welcome.remove();

        // Add user message to chat
        addMessage(message, true);

        userInput.value = "";
        userInput.style.height = "auto";
        sendButton.disabled = true;

        // Show typing indicator
        const typingIndicator = showTypingIndicator();
        try {
            // Generate response from backend
            const response = await generateResponse(message);
            typingIndicator.remove();
            // Add AI response
            addMessage(response, false);

        } catch (error) {
            typingIndicator.remove();
            addErrorMessage(error.message);
        } finally {
            sendButton.disabled = false;
            userInput.focus();
        }
    });

    // --- Generate Response (Backend API Call) ---
    async function generateResponse(prompt) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: prompt
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Network response was not ok');
        }

        const data = await response.json();
        return data.response;
    }

    // --- Escape HTML (XSS Prevention) ---
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // --- Apply Inline Markdown (bold, italic, code, strikethrough) ---
    function applyInline(text) {
        // Bold + Italic: ***text***
        text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
        // Bold: **text** or __text__
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
        // Italic: *text* or _text_
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
        text = text.replace(/_([^_]+?)_/g, '<em>$1</em>');
        // Inline code: `code`
        text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
        // Strikethrough: ~~text~~
        text = text.replace(/~~(.+?)~~/g, '<del>$1</del>');
        return text;
    }

    // --- Markdown to HTML Parser ---
    function parseMarkdown(rawText) {
        // Step 1: Escape HTML in the full text first
        let escaped = escapeHtml(rawText);

        // Step 2: Extract and protect fenced code blocks before line processing
        const codeBlocks = [];
        escaped = escaped.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
            const langLabel = lang ? `<span class="code-lang">${lang}</span>` : '';
            const placeholder = `\x00CODEBLOCK${codeBlocks.length}\x00`;
            codeBlocks.push(`<div class="code-block">${langLabel}<pre><code>${code.trimEnd()}</code></pre></div>`);
            return placeholder;
        });

        // Step 3: Process line-by-line
        const lines = escaped.split('\n');
        const output = [];
        let inList = false;
        let listType = null;

        const flushList = () => {
            if (inList) {
                output.push(listType === 'ol' ? '</ol>' : '</ul>');
                inList = false;
                listType = null;
            }
        };

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Code block placeholder
            if (line.includes('\x00CODEBLOCK')) {
                flushList();
                output.push(line); // will be restored below
                continue;
            }

            // Headings (h1–h3)
            if (/^### (.+)/.test(line)) {
                flushList();
                output.push(`<h3>${applyInline(line.replace(/^### /, ''))}</h3>`);
                continue;
            }
            if (/^## (.+)/.test(line)) {
                flushList();
                output.push(`<h2>${applyInline(line.replace(/^## /, ''))}</h2>`);
                continue;
            }
            if (/^# (.+)/.test(line)) {
                flushList();
                output.push(`<h1>${applyInline(line.replace(/^# /, ''))}</h1>`);
                continue;
            }

            // Horizontal rule
            if (/^(---|===|\*\*\*)$/.test(line.trim())) {
                flushList();
                output.push('<hr>');
                continue;
            }

            // Ordered list item: "1. text"
            const olMatch = line.match(/^(\d+)\. (.+)/);
            if (olMatch) {
                if (!inList || listType !== 'ol') {
                    flushList();
                    output.push('<ol>');
                    inList = true;
                    listType = 'ol';
                }
                output.push(`<li>${applyInline(olMatch[2])}</li>`);
                continue;
            }

            // Unordered list item: "- text" or "* text" or "+ text"
            const ulMatch = line.match(/^[-*+] (.+)/);
            if (ulMatch) {
                if (!inList || listType !== 'ul') {
                    flushList();
                    output.push('<ul>');
                    inList = true;
                    listType = 'ul';
                }
                output.push(`<li>${applyInline(ulMatch[1])}</li>`);
                continue;
            }

            // Blank line
            if (line.trim() === '') {
                flushList();
                output.push('<div class="md-spacer"></div>');
                continue;
            }

            // Normal paragraph
            flushList();
            output.push(`<p>${applyInline(line)}</p>`);
        }

        flushList();

        // Step 4: Restore code blocks
        let result = output.join('');
        codeBlocks.forEach((block, idx) => {
            result = result.replace(`\x00CODEBLOCK${idx}\x00`, block);
        });

        return result;
    }

    // --- Add Message ---
    function addMessage(text, isUser) {
        const message = document.createElement('div');
        message.className = `message ${isUser ? 'user-message' : ''}`;

        const contentHtml = isUser
            ? escapeHtml(text)         // User messages: safe plain text
            : parseMarkdown(text);     // AI messages: full markdown rendering

        const avatarEl = document.createElement('div');
        avatarEl.className = `avatar ${isUser ? 'user-avatar' : ''}`;
        avatarEl.textContent = isUser ? 'Me' : 'K';

        const contentEl = document.createElement('div');
        contentEl.className = isUser ? 'message-content' : 'message-content markdown-body';

        if (isUser) {
            contentEl.textContent = text;
        } else {
            contentEl.innerHTML = contentHtml;
        }

        message.appendChild(avatarEl);
        message.appendChild(contentEl);
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // --- Typing Indicator ---
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message';
        indicator.innerHTML = `
            <div class="avatar">K</div>
            <div class="typing-indicator">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        `;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    // --- Error Message ---
    function addErrorMessage(text) {
        const message = document.createElement('div');
        message.className = "message";
        message.innerHTML = `
            <div class="avatar">K</div>
            <div class="message-content error-bubble">⚠️ ${escapeHtml(text)}</div>
        `;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // --- Enter to Send ---
    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (userInput.value.trim()) {
                chatForm.requestSubmit();
            }
        }
    });

});
