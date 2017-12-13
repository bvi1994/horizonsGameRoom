const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
    if (!req.user) {
        res.status(401).json({success: 'failed'});
    } else {
        next();
    }
});

router.get('/game/:game', (req, res) => {
    if(req.params.game === 'slapjack') {
        res.sendFile(__dirname + '/public/slapjack.html');
    }
});

module.exports = router;
