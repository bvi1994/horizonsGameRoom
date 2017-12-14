const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
    if (!req.user) {
        res.status(401).json({success: 'failed'});
    } else {
        next();
    }
});
router.get('/ready/', (req, res) => {
    res.sendFile(__dirname + '/public/ready.html');
});
router.get('/game/:game', (req, res) => {
    switch(req.params.game) {
        case 'slapjack':
            res.sendFile(__dirname + '/public/slapjack.html');
        case 'plusMinus':
            res.sendFile(__dirname + '/public/plusMinus.html');
        default:
            res.redirect('/ready/');
    }
});

module.exports = router;
