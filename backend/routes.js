const path = require('path');
const express = require('express');
const router = express.Router();

module.exports = (passport) => {

    router.get('/auth/github', passport.authenticate('github'));

    router.get('/callback/github', passport.authenticate('github', {
        failureRedirect: '/' }), (req, res) => {
            res.redirect('/');
    });

    router.use((req, res, next) => {
        console.log(req.user);
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

    router.get('/logout', (req, res) => {
        console.log(req.user);
        req.logout();
        res.redirect('/');
    });

    return router;
};
