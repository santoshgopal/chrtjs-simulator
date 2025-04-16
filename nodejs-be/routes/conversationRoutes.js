// server/routes/conversationRoutes.js
const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

// Start conversation endpoint
router.post('/start-conversation', conversationController.startConversation);

// Create/add message to conversation endpoint
router.post('/conversations/:conversationId/messages', conversationController.createMessage);

module.exports = router;
