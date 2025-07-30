import React, { useState, useEffect, useRef } from 'react';
import './AIChat.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  context?: string;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, context = 'general' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      setMessages([{
        id: '1',
        text: `Hello! I'm your AI learning assistant. I'm here to help you with DevOps concepts, troubleshoot issues, and guide your learning journey. How can I assist you today?`,
        sender: 'ai',
        timestamp: new Date(),
        context
      }]);
    }
  }, [isOpen, context]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      context
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          context: context
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'ai',
          timestamp: new Date(),
          context
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Failed to get AI response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'ai',
        timestamp: new Date(),
        context
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="ai-chat-overlay">
          <div className="ai-chat-container">
            <div className="ai-chat-header">
              <div className="ai-chat-title">
                <div className="ai-status-indicator"></div>
                <h3>AI Learning Assistant</h3>
              </div>
              <button onClick={onClose} className="ai-chat-close">
                <span>&times;</span>
              </button>
            </div>

            <div className="ai-chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`ai-message ${message.sender}`}
                >
                  <div className="ai-message-content">
                    {message.sender === 'ai' ? (
                      <div dangerouslySetInnerHTML={{ 
                        __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                             .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                             .replace(/\n/g, '<br/>')
                      }} />
                    ) : (
                      <p>{message.text}</p>
                    )}
                  </div>
                  <div className="ai-message-timestamp">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="ai-message ai typing-indicator">
                  <div className="ai-message-content">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="ai-chat-input">
              <div className="ai-input-container">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about DevOps..."
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="ai-send-button"
                >
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
