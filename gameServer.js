const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (!req.user) {
        res.status(401).json({success: 'failed'});
    } else {
        next();
    }
});
router.get('/ready/:retreat', (req, res) => {
    switch(req.params.retreat) {
        case 'plane':
            res.sendFile(__dirname + '/public/ready.html');
            break;
        case 'slowMo':
            res.sendFile(__dirname + '/public/slowMo.html');
            break;
        default:
            res.send({success: 'failure'});
            break;
    }
});

router.get('/game/:game/:username', (req, res) => {
    console.log(req.params);
    console.log(req.user);
    const { username } = req.user;
    switch(req.params.game) {
        case 'slapjack':
            // res.sendFile(__dirname + '/public/slapjack.html');
            res.render('slapjack', {
                gameId: req.params.username,
                user: req.user.username
            });
            break;
        case 'plusMinus':
            // res.sendFile(__dirname + '/public/plusMinus.html');
            res.render('plusMinus', {
                gameId: req.params.username,
                user: username
            });
            break;
        case 'triangle':
            res.render('triangle', {
                gameId: req.params.username,
                user: username
            });
            break;
        default:
            res.send({success: 'failure'});
            break;
    }
});

module.exports = router;
