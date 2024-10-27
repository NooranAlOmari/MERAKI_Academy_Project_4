/*************************/
const express = require('express');
const router = express.Router();
const axios = require('axios'); 


router.get('/data', async (req, res) => {
    try {
        const response = await axios.get('https://external-api-url.com/endpoint'); // 
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
