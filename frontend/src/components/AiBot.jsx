import React, { useState } from 'react';
import './AiBot.css';

export default function AiBot({ apiEndpoint }) {
  const [open, setOpen] = useState(false); // toggle chat window
  const [messages, setMessages] = useState([{ sender: 'bot', text:'Hello there! How can I help you?' }]); // chat history
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim()) return;

    //`${farmerId}`
    // Add user message
    const userMsg = { userName: 'userAbhishek', problem: input };
    const userMsg2 = {sender: "userAbhishek", text: input};
    setMessages([...messages, userMsg2]);
    setInput('');
    setLoading(true);

    try {
      // Send request to AI API
      const res = await fetch(`${import.meta.env.VITE_API_URL}/query/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMsg }),
      });
      const data = await res.json();
      console.log(data);
      
      // Add AI response
      const botMsg = { sender: 'bot', text: data.finalText || 'No response' };
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
            {loading && <div className="ai-message bot" style={{backgroundColor:"#01143a", color:"white"}}>Typing...</div>}
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
