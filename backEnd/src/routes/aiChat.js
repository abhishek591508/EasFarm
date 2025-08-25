const express = require('express');
const router = express.Router();
const aiAgent = require('../controllers/AiAgent');

router.post('/chat',aiAgent);


module.exports = router;