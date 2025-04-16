// src/components/ChatInput.js
import React, { useState } from 'react';

const ChatInput = ({ onSend, loading }) => {
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(loading);

    React.useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        onSend(inputValue);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center chat-input-container">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors"
                autoComplete="off"
                autoFocus
                disabled={isLoading}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white rounded-r-lg px-6 py-2 hover:bg-blue-600 transition-colors"
            >
                Send
            </button>
        </form>
    );
};

export default ChatInput;
