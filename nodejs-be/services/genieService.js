const { v4: uuidv4 } = require('uuid');

exports.startConversation = (userMessage) => {
    const conversationId = uuidv4();
    // Simulated first AI response.
    const aiText = `AI Response to the initial message: "${userMessage}"`;
    return {
        conversationId,
        aiText,
        dataFrame: { columns: ['id', 'value'], data: [[1, Math.random()], [2, Math.random()]] }
    };
};

exports.createMessage = (conversationId, userMessage) => {
    // Create a new simulated response for the conversation.
    const aiText = `Simulated AI response for: "${userMessage}" in conversation ${conversationId}`;
    return {
        aiText,
        dataFrame: {
            columns: ['timestamp', 'metric'],
            data: [
                [new Date().toISOString(), Math.floor(Math.random() * 100)],
                [new Date().toISOString(), Math.floor(Math.random() * 100)]
            ]
        }
    };
};
