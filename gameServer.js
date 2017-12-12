const path = require('path');
const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
    if (!req.user) {
        res.status(401).json({success: 'failed'});
    } else {
        next();
    }
});

router.get('/create/:game', (req, res) => {
    console.log("create game route reached");
    if(req.params.game === 'slapjack') {
        res.sendFile(__dirname + '/public/slapjack.html');
    }
});

module.exports = router;
