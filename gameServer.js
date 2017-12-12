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
    router.get('/loggedIn', (req, res) => {
        if(!req.user) {
            res.status(402).json({success: false});
        } else {
            res.status(200).json({success: true});
        }
    });

    router.get('/profile', (req, res) => {
        res.json(req.user);
    });

    router.get('/create/:game', (req, res) => {
        if(req.params.game === 'slapjack') {
            res.sendFile(__dirname + '/public/slapjack.html');
        }
    });

    return router;
};
