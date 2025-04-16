const genieService = require('../services/genieService');
const openaiService = require('../services/openaiService');
const conversationStore = require('../data/conversationStore');

exports.startConversation = (req, res) => {
    const { userMessage } = req.body;
    if (!userMessage) {
        return res.status(400).json({ error: 'User message is required' });
    }

    // Simulate starting a conversation with Databricks Genie.
    const conversationData = genieService.startConversation(userMessage);
    // Save conversation in memory.
    conversationStore.saveConversation(conversationData.conversationId, [conversationData]);

    setTimeout(() => {
        res.status(200).json(conversationData);
    }, 2000);
};

exports.createMessage = (req, res) => {
    const conversationId = req.params.conversationId;
    const { userMessage } = req.body;
    if (!userMessage) {
        return res.status(400).json({ error: 'User message is required' });
    }

    // Check for an existing conversation.
    const conversation = conversationStore.getConversation(conversationId);
    if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
    }

    // Simulate Databricks Genie response for the conversation.
    const genieResponse = genieService.createMessage(conversationId, userMessage);

    // Simulate calling the OpenAI model (or mock) to create a Chart.js config.
    const chartConfig = openaiService.generateChartConfig(genieResponse.dataFrame, userMessage);

    // Structure the response.
    const responseData = {
        conversationId,
        userMessage,
        aiResponse: genieResponse.aiText,
        dataFrame: genieResponse.dataFrame,       // This can be real or mock data.
        chartConfig                                // Chart.js configuration.
    };

    // Store the new message (for simplicity, just appending the response).
    conversationStore.appendMessage(conversationId, responseData);

    setTimeout(() => {
        res.status(200).json(responseData);
    }, 2000);
};
