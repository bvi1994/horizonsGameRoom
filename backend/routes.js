const express = require('express');
const router = express.Router();
const { User } = require('../sequelize/models');
const bcrypt = require('bcrypt');
let hashedPassword;

module.exports = (passport) => {
    router.post('/register', (req, res) => {
        User.findAll({where: {username: req.body.username}})
        .then(users => {
            if(req.body.password === req.body.repeatPassword && !users[0]) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    hashedPassword = hash;
                    User.create({
                        username: req.body.username,
                        password: hashedPassword
                    })
                      .then(() => {
                          res.json({success: true});
                      });
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

    router.use((req, res, next) => {
        if (!req.user) {
            res.status(401).json({success: 'failed'});
        } else {
            next();
        }
    });

    router.get('/logout', (req, res) => {
        req.logout();
        res.status(200).json({success: true});
    });

  // SAMPLE ROUTE
    router.use('/', (req, res) => {
        res.json({ success: true });
    });


    return router;
};
