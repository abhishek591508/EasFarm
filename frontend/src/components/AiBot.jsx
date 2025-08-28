import React, { useState } from 'react';
import './AiBot.css';

export default function AiBot({ apiEndpoint }) {
  const [open, setOpen] = useState(false); // toggle chat window
  const [messages, setMessages] = useState([]); // chat history
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Send request to AI API
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });
      const data = await res.json();

      // Add AI response
      const botMsg = { sender: 'bot', text: data.answer || 'No response' };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error: ' + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`ai-bot ${open ? 'ai-bot--open' : ''}`}>
      {/* Chat Toggle Button */}
      {!open && <button className="ai-toggle-btn" onClick={toggleChat}>💬 AI Help</button>}

      {/* Chat Window */}
      {open && (
        <div className="ai-chat-window">
          <div className="ai-header">
            <span>AI Help Bot</span>
            <button onClick={toggleChat}>✖</button>
          </div>

          <div className="ai-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-message ${m.sender}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="ai-message bot">Typing...</div>}
          </div>

          <div className="ai-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
