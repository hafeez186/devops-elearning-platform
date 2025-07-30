import React, { useState } from 'react';
import AIChat from './AIChat';
import './AIAssistant.css';

const AIAssistant: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button
        className="ai-assistant-button"
        onClick={() => setIsChatOpen(true)}
        title="Open AI Assistant"
      >
        <div className="ai-icon">🤖</div>
        <div className="ai-pulse"></div>
      </button>

      <AIChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        context="general"
      />
    </>
  );
};

export default AIAssistant;
