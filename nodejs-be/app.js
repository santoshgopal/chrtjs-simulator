// server/app.js
const express = require('express');
const cors = require('cors');
const conversationRoutes = require('./routes/conversationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON body (built-in in Express)
app.use(express.json());

// Use conversation routes
app.use('/api', conversationRoutes);

// Global error handling middleware (minimal)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
