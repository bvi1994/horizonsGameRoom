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
router.get('/game/:game/:username', (req, res) => {
    console.log(req.params);
    switch(req.params.game) {
        case 'slapjack':
            // res.sendFile(__dirname + '/public/slapjack.html');
            res.render('slapjack', {
                gameId: req.params.username,
                user: req.user.username,
            });
            break;
        case 'plusMinus':
            // res.sendFile(__dirname + '/public/plusMinus.html');
            res.render('plusMinus');
            break;
        case 'triangle':
            // res.sendFile(__dirname + '/public/triangle.html');
            res.render('triangle');
            break;
        default:
            res.send({success: 'failure'});
            break;
    }
});

module.exports = router;
