const path = require('path');
const express = require('express');
const router = express.Router();
const { User } = require('../sequelize/models');
const bcrypt = require('bcrypt');

const passport = require('passport');

let hashedPassword;

module.exports = (passport) => {
    router.post('/register', (req, res) => {
        User.findAll({where: {username: req.body.username}})
        .then(users => {
            if(req.body.password && !users[0]) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    hashedPassword = hash;
                    User.create({
                        username: req.body.username,
                        password: hashedPassword
                    })
                      .then(() => {
                          res.json({success: true});
                      })
                      .catch(e => res.json({error: e}));
                });
            } else {
                res.json({success: false});
            }
        })
      .catch((err)=>console.log(err));
    });

    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user) => {
            user ? req.login(user, error => {
                if(err) {return next(error);}
                return res.json({success: true, user: req.user});
            }) : res.json({success: false});
        })(req, res, next);
    });

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
