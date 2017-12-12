const path = require('path');
const express = require('express');
const router = express.Router();

module.exports = () => {
    router.use((req, res, next) => {
        if (!req.user) {
            res.status(401).json({success: 'failed'});
        } else {
            next();
        }
    });

    router.get('/create/:game', (req, res) => {
        if(req.params.game === 'slapjack') {
            res.sendFile(__dirname + '/public/slapjack.html');
        }
    });

    return router;
};
