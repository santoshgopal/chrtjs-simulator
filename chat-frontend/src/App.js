import React, { useEffect, useMemo, useState } from 'react';
import ChartDisplay from './components/ChartDisplay';
import ChatInput from './components/ChatInput';
import MessageList from './components/MessageList';
import CONFIG from './config';

function App() {
  const [conversation, setConversation] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const chatMessageWrapperRef = React.useRef(null);


  const scrollHeight = () => {
    if (chatMessageWrapperRef.current) {
      chatMessageWrapperRef.current.scrollTop = chatMessageWrapperRef.current.scrollHeight + 300;
    }
  };

  useEffect(() => {
    scrollHeight();
  }, [loading]);

  const sendMessage = async (messageText) => {
    const userMessage = { type: 'user', text: messageText };
    setConversation((prev) => [...prev, userMessage]);
    setLoading(true);
    scrollHeight();

    try {
      let response, data;
      if (!conversationId) {
        response = await fetch(`${CONFIG.BACKEND_BASE_URL}/api/start-conversation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userMessage: messageText })
        });
        data = await response.json();
        setConversationId(data.conversationId);
      } else {
        response = await fetch(`${CONFIG.BACKEND_BASE_URL}/api/conversations/${conversationId}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userMessage: messageText })
        });
        data = await response.json();
      }


      const aiMessage = {
        type: 'ai',
        text: data.aiResponse || data.aiText,
        dataFrame: data.dataFrame,
        chartConfig: data.chartConfig
      };

      setConversation((prev) => [...prev, aiMessage]);
      setTimeout(() => {
        scrollHeight();
      }, 500);
    } catch (error) {
      console.error(error);
      const errorMessage = { type: 'ai', text: 'Error: Unable to get a response.' };
      setConversation((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        const chatMessageListContainer = document.querySelector('.chat-input-container input');
        if (chatMessageListContainer) {
          chatMessageListContainer?.focus?.();
        }
      }, 500);
    }
  };

  const latestAiResponse = useMemo(() => {
    return conversation.filter(msg => msg.type === 'ai').slice(-1)[0];
  }, [conversation]);

  return (
    <div className="w-full p-4 flex justify-center items-center flex-col">

      <div className="rounded-lg p-4 mb-4 flex flex-col bg-white border border-gray-300 shadow-lg" style={{ width: 900 }}>
        <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-red-700 to-blue-700 bg-clip-text text-transparent">Chat Conversation</h2>
        <div className="p-4 bg-white h-96 overflow-y-auto mb-4 chat-message-list-container" ref={chatMessageWrapperRef}>
          <MessageList conversation={conversation} />
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <div className="bg-gradient-to-r from-red-700 to-blue-700 bg-clip-text text-transparent animate-pulse">Loading...</div>
              <div className="flex space-x-2">
                <div className="w-2.5 h-2.5 bg-gray-600 rounded-full animate-ping"></div>
                <div className="w-2.5 h-2.5 bg-gray-600 rounded-full animate-ping delay-200"></div>
                <div className="w-2.5 h-2.5 bg-gray-600 rounded-full animate-ping delay-400"></div>
              </div>
            </div>
          )}
        </div>
        <ChatInput onSend={sendMessage} loading={loading} />
      </div>

      <div className="p-4 mb-4 flex flex-row w-full gap-2">

        {latestAiResponse && latestAiResponse.chartConfig && (
          <div className="mt-8 shadow-2xl rounded-lg p-4 bg-white border border-gray-300 flex-1">
            <h3 className="text-xl font-semibold mb-2">Chart</h3>
            <p className="mb-4 bg-gradient-to-r from-red-800 to-blue-700 bg-clip-text text-transparent">The AI has provided a chart based on your query.</p>
            <ChartDisplay chartConfig={latestAiResponse.chartConfig} />
          </div>
        )}

        {latestAiResponse && latestAiResponse.dataFrame && (
          <div className="mt-8 shadow-2xl rounded-lg p-4 bg-white border border-gray-300 flex-1">
            <h3 className="text-xl font-semibold mb-2">Data Frame</h3>
            <p className="mb-4 bg-gradient-to-r from-red-800 to-blue-700 bg-clip-text text-transparent">The AI has provided a data frame based on your query.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {latestAiResponse.dataFrame.columns.map((col) => (
                      <th key={col} className="border border-gray-300 px-4 py-2">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {latestAiResponse.dataFrame.data.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-300 px-4 py-2 text-center">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
