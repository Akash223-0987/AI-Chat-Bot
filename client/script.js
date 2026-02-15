// Backend API endpoint
const API_URL = '/api/chat';

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
    clearChat.addEventListener('click', () => {
        chatMessages.innerHTML = '';
        // Re-add welcome card
        chatMessages.innerHTML = `
            <div class="welcome-card" id="welcomeCard">
                <div class="welcome-emoji">✨</div>
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

    // --- Add Message ---
    // --- Clean Text Content ---
    function cleanText(text) {
        // Remove markdown symbols visually
        let clean = text.replace(/[*#_`~]/g, '');
        
        // Remove bullet points at start of lines
        clean = clean.replace(/^\s*[-•]\s*/gm, '');
        
        // Normalize whitespace (no triple newlines)
        clean = clean.replace(/\n{3,}/g, '\n\n');
        
        return clean.trim();
    }

    // --- Add Message ---
    function addMessage(text, isUser) {
        const message = document.createElement('div');
        message.className = `message ${isUser ? "user-message" : ""}`;
        
        // Clean text for display
        const displayText = cleanText(text);

        message.innerHTML = `
            <div class="avatar ${isUser ? "user-avatar" : ""}">${isUser ? "Me" : "K"}</div>
            <div class="message-content">${escapeHtml(displayText)}</div>
        `;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // --- Typing Indicator ---
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message';
        indicator.innerHTML = `
            <div class="avatar">AI</div>
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
            <div class="avatar">AI</div>
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
