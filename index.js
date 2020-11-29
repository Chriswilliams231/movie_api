// Imports express into your package 
const express = require('express'),
    morgan = require('morgan');

const app = express()

const bodyParser = require('body-parser'),
    methodOverride = require('method-override');

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

app.use(express.static('public'));
// Morgan middleware will log all request
app.use(morgan('common'));

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const cors = require('cors');
//Grants specified domain access to your app
let allowedOrigins = ['http://localhost:8080'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
            let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

const { check, validationResult } = require('express-validator');

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});
//return JSON object when at /movies
app.get(
    "/movies", passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Movies.find()
            .then((movies) => {
                res.status(201).json(movies);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    }
);
//GET JSON movie info when looking for specific title
app.get("/movies/:Title", passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

//get data about genre by name
app.get("/movies/genre/:Name", passport.authenticate('jwt', { session: false }), function (req, res) {
    Movies.findOne({ "Genre.Name": req.params.Name })
        .then(function (movies) {
            res.json(movies.Genre);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

//get data about director
app.get("/movies/director/:Name", passport.authenticate('jwt', { session: false }), function (req, res) {
    Movies.findOne({ "Director.Name": req.params.Name })
        .then(function (movies) {
            res.json(movies.Director);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

//get list of users
app.get("/users", passport.authenticate('jwt', { session: false }), function (
    req,
    res
) {
    Users.find()
        .then(function (users) {
            res.status(201).json(users);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});
//get a user by username
app.get(
    "/users/:Username", passport.authenticate('jwt', { session: false }),
    function (req, res) {
        Users.findOne({ Username: req.params.Username })
            .then(function (user) {
                res.json(user);
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    }
);
//Add user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post(
    "/users", [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {

    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
        .then((user) => {
            if (user) {
                //If the user is found, send a response that it already exists
                return res.status(400).send(req.body.Username + ' already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//Upadating User information by Username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put(
    "/users/:Username", [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {

    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);

    Users.findOneAndUpdate({ Username: req.params.Username },
        {
            $set: {
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
        },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.status(201).json(updatedUser);
            }
        });
});

//Allowing users to add movie to favorites
app.post(
    "/users/:Username/movies/:MovieID", passport.authenticate('jwt', { session: false }),
    function (req, res) {
        Users.findOneAndUpdate(
            { Username: req.params.Username },
            {
                $push: { FavoriteMovies: req.params.MovieID },
            },
            { new: true }, // This line makes sure that the updated document is returned
            function (err, updatedUser) {
                if (err) {
                    console.error(err);
                    res.status(500).send("Error: " + err);
                } else {
                    res.json(updatedUser);
                }
            }
        );
    }
);

// delete movie from favorite list for user
app.delete(
    "/users/:Username/movies/:MovieID", passport.authenticate('jwt', { session: false }),
    function (req, res) {
        Users.findOneAndUpdate(
            { Username: req.params.Username },
            { $pull: { FavoriteMovies: req.params.MovieID } },
            { new: true },
            function (err, updatedUser) {
                if (err) {
                    console.error(err);
                    res.status(500).send("Error: " + err);
                } else {
                    res.json(updatedUser);
                }
            }
        );
    }
);
// Delete by Username
app.delete(
    "/users/:Username", passport.authenticate('jwt', { session: false }),
    function (req, res) {
        Users.findOneAndRemove({ Username: req.params.Username })
            .then(function (user) {
                if (!user) {
                    res.status(400).send(req.params.Username + " was not found");
                } else {
                    res.status(200).send(req.params.Username + " was deleted.");
                }
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    }
);

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});
// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});