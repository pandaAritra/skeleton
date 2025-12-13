// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages-container');

    // Load messages from localStorage
    loadMessages();

    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const messageText = messageInput.value.trim();
        if (messageText) {
            addMessage(messageText);
            messageInput.value = '';
        }
    });

    function addMessage(text) {
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.innerHTML = `
            <div class="message-text">${text}</div>
            <div class="reply-section">
                <textarea placeholder="Reply to this message..." rows="3"></textarea>
                <button class="btn reply-btn">Reply</button>
            </div>
        `;
        messagesContainer.appendChild(messageCard);

        // Save to localStorage
        saveMessages();
    }

    function saveMessages() {
        const messages = [];
        document.querySelectorAll('.message-card .message-text').forEach(card => {
            messages.push(card.textContent);
        });
        localStorage.setItem('portfolioMessages', JSON.stringify(messages));
    }

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
        messages.forEach(message => addMessage(message));
    }

    // Handle reply buttons (optional: could send replies or just log)
    messagesContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            const replyTextarea = e.target.previousElementSibling;
            const replyText = replyTextarea.value.trim();
            if (replyText) {
                alert('Reply sent: ' + replyText); // Placeholder action
                replyTextarea.value = '';
            }
        }
    });
});
