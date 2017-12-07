const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
const BASE_URL = 'http://8096a45d.ngrok.io';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
//
// var models = require('./sequelize/models');
//
// models.sequelize.sync({ force: true })
//   .then(function() {
//       console.log('Successfully updated database tables!');
//       process.exit(0);
//   })
//   .catch(function(error) {
//       console.log('Error updating database tables', error);
//       process.exit(1);
//   });
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GitHubStrategy = require('passport-github').Strategy;
const bcrypt = require('bcrypt');
const { User, GitHubUser } = require('./sequelize/models');
const PORT = process.env.PORT || 3000;
const api = require('./backend/routes');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

app.use(session({
    secret: process.env.SECRET,
}));


passport.serializeUser((user, done) => {
    done(null, user[0].dataValues.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializeUser id", id);
    GitHubUser.findOne({where: {id: id}})
    .then(user => {
      console.log("deserializeUser user", user);
      done(null, user.dataValues)})
    .catch((err) => {console.log("deserializeUser err", err);
        done(err);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({where: {username: username}})
      .then( user => {
          if(user) {
              bcrypt.compare(password, user.dataValues.password, (err, res) => {
                  if (res) {
                      return done(null, user.dataValues);
                  }
                  return done(null, false);
              });
          } else {
              return done(null, false);
          }
      })
      .catch((err) => {return done(err);});
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: BASE_URL + "/callback/github"
},
  (accessToken, refreshToken, profile, cb) => {
      console.log({profile});
      GitHubUser.findOrCreate({where: { username: profile.id }})
      .then((user) => {
          return cb(null, user);
      })
      .catch(e => {
          console.log(e);
          return cb(e);
      });
  }
));

app.use(passport.initialize());
app.use(passport.session());

app.use(api(passport));

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
