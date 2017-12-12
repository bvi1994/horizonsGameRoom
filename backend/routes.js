const path = require('path');
const express = require('express');
const { User } = require('../sequelize/models');
const router = express.Router();

module.exports = (passport) => {
    router.get('/auth/github', passport.authenticate('github'));

    router.get('/callback/github', passport.authenticate('github', {
        failureRedirect: '/' }), (req, res) => {
            res.redirect('/');
        });

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
            console.log(__dirname);
            
            res.sendFile(__dirname + '../public/slapjack.html');
        }
    });

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return router;
};
