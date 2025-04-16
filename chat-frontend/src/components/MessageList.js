// src/components/MessageList.js
import React from 'react';

const MessageList = ({ conversation }) => {

    const [CONV, setConv] = React.useState(conversation);

    React.useEffect(() => {
        setConv(conversation);
    }, [conversation]);


    return (
        <div>
            {CONV.map((msg, index) => (
                <div
                    key={index}
                    className={`mb-4 p-3 rounded-lg max-w-[70%] ${msg.type === 'user'
                        ? 'bg-green-100 ml-auto text-right'
                        : 'bg-gray-100 mr-auto text-left'
                        }`}
                >
                    <span>{msg.text}</span>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
