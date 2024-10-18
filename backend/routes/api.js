const express = require('express');
const router = express.Router();
const axios = require('axios'); // مكتبة لإجراء الطلبات HTTP

// نقطة نهاية API
router.get('/data', async (req, res) => {
    try {
        const response = await axios.get('https://external-api-url.com/endpoint'); // استبدل بعنوان API الخارجي
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
