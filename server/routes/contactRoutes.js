// routes/contactRoutes.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Contact Route Working');
});

module.exports = router;