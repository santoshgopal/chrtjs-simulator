const conversations = {};

/**
 * Save a new conversation.
 */
exports.saveConversation = (conversationId, messages) => {
    conversations[conversationId] = messages;
};

/**
 * Append a message to an existing conversation.
 */
exports.appendMessage = (conversationId, message) => {
    if (!conversations[conversationId]) {
        conversations[conversationId] = [];
    }
    conversations[conversationId].push(message);
};

/**
 * Retrieve a conversation by ID.
 */
exports.getConversation = (conversationId) => {
    return conversations[conversationId];
};
