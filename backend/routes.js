const path = require('path');
const express = require('express');
const { User, Message } = require('../sequelize/models');
const router = express.Router();

module.exports = (passport) => {
    router.get('/auth/github', passport.authenticate('github'));

    router.get('/callback/github', passport.authenticate('github', {
        failureRedirect: '/' }), (req, res) => {
            res.redirect('/');
        });

    // router.use((req, res, next) => {
    //     if (!req.user) {
    //         res.status(401).json({success: 'failed'});
    //     } else {
    //         next();
    //     }
    // });

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

    router.get('/messages', (req, res) => {
        Message.findAll({
            attributes: { exclude: ['updatedAt', 'id'] }
        })
        .then(messages => {
            res.json(messages);
        }).catch(e => {
            console.log(e);
        });
    });

    router.post('/messages', (req, res) => {
        Message.create({
            username: req.body.username,
            photo: req.body.photo,
            content: req.body.content
        })
        .then(() => res.send({success: true}))
        .catch(e => res.json(e));
    });

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return router;
};
