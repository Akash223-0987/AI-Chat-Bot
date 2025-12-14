// Backend API endpoint
const API_URL = '/api/chat';

document.addEventListener('DOMContentLoaded', () => {

    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const sendButton = document.getElementById('sendButton');

    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = userInput.scrollHeight + 'px';
        sendButton.disabled = !userInput.value.trim();
    });

    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        addUserMessage(message, true);
        
        userInput.value = "";
        userInput.style.height = "auto";
        sendButton.disabled = true;
        
        // Show typing indicator
        const typingIndicator = showTypingIndicator();
        try {
            // Generate response from backend
            const response = await generateResponse(message);
            typingIndicator.remove();
            // Add AI response (not user message)
            addUserMessage(response, false);
            
        } catch (error) {
            typingIndicator.remove();
            addErrorMessage(error.message);
        } finally {
            sendButton.disabled = false;
        }
    });

    // Generate response function - calls backend API
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

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// add user message to chat
function addUserMessage(text, isUser) {
    const message = document.createElement('div');
    message.className = `message ${isUser ? "user-message" : ""}`;
    message.innerHTML = `
    <div class="avatar ${isUser ? "user-avatar" : ""}">
    ${isUser ? "U" : "AI"}
    </div>
    <div class="message-content">${escapeHtml(text)}</div>
    `;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

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

    // ERROR HANDLING FUNCTION
    function addErrorMessage(text) {
        const message = document.createElement('div');
        message.className = "message";
        message.innerHTML = `
        <div class="avatar">AI</div>
        <div class="message-content" style="color:red">
        Error: ${escapeHtml(text)}
        </div>
        `;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    const textarea = document.getElementById("userInput");
    const form = document.getElementById("chatForm");

    textarea.addEventListener("keydown", (e) => {
        // Enter without Shift → send message
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // stop new line
            form.requestSubmit(); // trigger form submit
        }
    });

});


