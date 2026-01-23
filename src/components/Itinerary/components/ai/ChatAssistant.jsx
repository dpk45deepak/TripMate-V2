// src/components/ai/ChatAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, X, Mic, Paperclip } from 'lucide-react';

const ChatAssistant = ({ onClose }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm your AI travel assistant. How can I help you plan your trip today?",
            sender: 'bot',
            timestamp: new Date(Date.now() - 300000)
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const quickQuestions = [
        "Suggest activities for my trip",
        "Help with itinerary planning",
        "Budget recommendations",
        "Weather information",
        "Local cuisine suggestions"
    ];

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages([...messages, userMessage]);
        setInput('');
        setLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "Based on your preferences, I'd recommend visiting the local markets and trying authentic street food.",
                "For itinerary planning, I suggest starting with major attractions in the morning and saving cultural activities for the afternoon.",
                "Based on your budget, you could save money by booking accommodations slightly outside the city center.",
                "The weather looks great for your trip! Pack light layers for the evenings.",
                "Don't miss the local specialty dishes - they're absolutely worth trying!"
            ];

            const botResponse = {
                id: Date.now() + 1,
                text: responses[Math.floor(Math.random() * responses.length)],
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
            setLoading(false);
        }, 1500);
    };

    const handleQuickQuestion = (question) => {
        setInput(question);
        setTimeout(() => sendMessage(), 100);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-96 h-150 flex flex-col border border-gray-200"
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-200 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Bot className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Travel Assistant</h3>
                                <p className="text-sm opacity-90">AI-powered trip planning</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] rounded-2xl p-3 ${message.sender === 'user'
                                        ? 'bg-linear-to-r from-blue-500 to-purple-500 text-white'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    <div className="flex items-start space-x-2">
                                        {message.sender === 'bot' && (
                                            <Bot className="h-5 w-5 mt-1 shrink-0" />
                                        )}
                                        <div>
                                            <p>{message.text}</p>
                                            <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                                }`}>
                                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                        {message.sender === 'user' && (
                                            <User className="h-5 w-5 mt-1 shrink-0" />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-2xl p-3">
                                <div className="flex items-center space-x-2">
                                    <Bot className="h-5 w-5" />
                                    <div className="flex space-x-1">
                                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                <div className="p-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                        {quickQuestions.map((question, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleQuickQuestion(question)}
                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Paperclip className="h-5 w-5 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Mic className="h-5 w-5 text-gray-500" />
                        </button>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            className="p-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:opacity-90 disabled:opacity-50"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-2 text-center">
                        <Sparkles className="h-3 w-3 inline mr-1" />
                        AI-powered responses
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default ChatAssistant;