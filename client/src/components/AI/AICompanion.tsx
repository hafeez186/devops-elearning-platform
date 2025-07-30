import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AICompanion.css';

interface CompanionMessage {
  id: string;
  text: string;
  sender: 'user' | 'companion';
  timestamp: Date;
  emotionalTone?: 'encouraging' | 'neutral' | 'motivational' | 'empathetic';
  personalizedElements?: {
    referencesToPastLearning: string[];
    connectionsToPreviousTopics: string[];
    personalizedMotivation: string;
  };
  proactiveHelp?: {
    suggestedBreak: boolean;
    alternativeExplanation: string;
    relatedTopics: string[];
  };
}

interface LearningProgress {
  totalLearningTime: number;
  currentStreak: number;
  longestStreak: number;
  completedTopics: number;
  totalTopics: number;
  strengths: string[];
  weakAreas: string[];
  nextRecommendations: string[];
  motivationalMessage: string;
}

interface AICompanionProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopic?: string;
  userId: string;
}

const AICompanion: React.FC<AICompanionProps> = ({ 
  isOpen, 
  onClose, 
  currentTopic = 'DevOps',
  userId 
}) => {
  const [messages, setMessages] = useState<CompanionMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [learningProgress, setLearningProgress] = useState<LearningProgress | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeCompanion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, messages.length]);

  const initializeCompanion = async () => {
    try {
      // Get learning progress
      const progressResponse = await fetch(`/api/ai/learning-progress/${userId}`);
      if (progressResponse.ok) {
        const progressData = await progressResponse.json();
        setLearningProgress(progressData.progress);
      }

      // Add personalized welcome message
      const welcomeMessage = await getCompanionResponse(
        "Hello! I'm ready to continue learning.",
        currentTopic
      );

      if (welcomeMessage) {
        setMessages([{
          id: '1',
          text: welcomeMessage.text,
          sender: 'companion',
          timestamp: new Date(),
          emotionalTone: welcomeMessage.emotionalTone,
          personalizedElements: welcomeMessage.personalizedElements,
          proactiveHelp: welcomeMessage.proactiveHelp
        }]);
      }
    } catch (error) {
      console.error('Failed to initialize companion:', error);
      // Fallback welcome message
      setMessages([{
        id: '1',
        text: `Hello! I'm your AI learning companion. I'm here to help you master ${currentTopic} and guide your learning journey. How can I assist you today?`,
        sender: 'companion',
        timestamp: new Date(),
        emotionalTone: 'encouraging'
      }]);
    }
  };

  const getCompanionResponse = async (message: string, topic: string) => {
    try {
      const response = await fetch('/api/ai/companion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          currentTopic: topic,
          userId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get companion response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error getting companion response:', error);
      return null;
    }
  };

  const updateLearningSession = async (sessionData: any) => {
    try {
      await fetch('/api/ai/learning-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          sessionData
        }),
      });
    } catch (error) {
      console.error('Failed to update learning session:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: CompanionMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const companionResponse = await getCompanionResponse(inputMessage, currentTopic);

      if (companionResponse) {
        const aiMessage: CompanionMessage = {
          id: (Date.now() + 1).toString(),
          text: companionResponse.message,
          sender: 'companion',
          timestamp: new Date(),
          emotionalTone: companionResponse.emotionalTone,
          personalizedElements: companionResponse.personalizedElements,
          proactiveHelp: companionResponse.proactiveHelp
        };

        setMessages(prev => [...prev, aiMessage]);

        // Update learning session
        await updateLearningSession({
          sessionId: Date.now().toString(),
          topic: currentTopic,
          duration: 5, // Approximate duration
          completed: false,
          questionsAsked: [inputMessage],
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: CompanionMessage = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I encountered an error. Please try again.',
        sender: 'companion',
        timestamp: new Date(),
        emotionalTone: 'empathetic'
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

  const getEmotionalToneClass = (tone?: string) => {
    switch (tone) {
      case 'encouraging': return 'tone-encouraging';
      case 'motivational': return 'tone-motivational';
      case 'empathetic': return 'tone-empathetic';
      default: return 'tone-neutral';
    }
  };

  const ProgressCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="progress-card"
    >
      <h4>Your Learning Journey</h4>
      {learningProgress && (
        <div className="progress-stats">
          <div className="stat-item">
            <span className="stat-label">Streak</span>
            <span className="stat-value">{learningProgress.currentStreak} days</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completed</span>
            <span className="stat-value">
              {learningProgress.completedTopics}/{learningProgress.totalTopics}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Learning Time</span>
            <span className="stat-value">{Math.floor(learningProgress.totalLearningTime / 60)}h</span>
          </div>
        </div>
      )}
    </motion.div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="ai-companion-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="ai-companion-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="companion-header">
            <div className="companion-title">
              <div className="companion-avatar">🤖</div>
              <div>
                <h3>AI Learning Companion</h3>
                <p>Your personal DevOps learning guide</p>
              </div>
            </div>
            <div className="companion-controls">
              <button
                className="progress-toggle"
                onClick={() => setShowProgress(!showProgress)}
                title="View Progress"
              >
                📊
              </button>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>
          </div>

          {showProgress && <ProgressCard />}

          <div className="companion-messages">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`message ${message.sender} ${getEmotionalToneClass(message.emotionalTone)}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  
                  {message.personalizedElements && (
                    <div className="personalized-elements">
                      {message.personalizedElements.referencesToPastLearning.length > 0 && (
                        <div className="past-learning">
                          <small>💡 {message.personalizedElements.referencesToPastLearning[0]}</small>
                        </div>
                      )}
                      {message.personalizedElements.personalizedMotivation && (
                        <div className="motivation">
                          <small>🌟 {message.personalizedElements.personalizedMotivation}</small>
                        </div>
                      )}
                    </div>
                  )}

                  {message.proactiveHelp && (
                    <div className="proactive-help">
                      {message.proactiveHelp.suggestedBreak && (
                        <div className="help-item break-suggestion">
                          <small>⏰ Consider taking a short break to let this sink in!</small>
                        </div>
                      )}
                      {message.proactiveHelp.alternativeExplanation && (
                        <div className="help-item alternative-explanation">
                          <small>🔄 {message.proactiveHelp.alternativeExplanation}</small>
                        </div>
                      )}
                      {message.proactiveHelp.relatedTopics.length > 0 && (
                        <div className="help-item related-topics">
                          <small>🔗 Related: {message.proactiveHelp.relatedTopics.join(', ')}</small>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="message companion"
              >
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="companion-input">
            <div className="input-container">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask me anything about ${currentTopic}...`}
                disabled={isLoading}
                rows={1}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="send-btn"
              >
                <span>→</span>
              </button>
            </div>
            <div className="input-help">
              <small>Press Enter to send • Shift+Enter for new line</small>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AICompanion;
