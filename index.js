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
    "/users",
    (req, res) => {
        Users.findOne({ Username: req.body.Username })
            .then(function (user) {
                if (user) {
                    return res.status(400).send(req.body.Username + " already exists");
                } else {
                    Users.create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday,
                    })
                        .then(function (user) {
                            res.status(201).json(user);
                        })
                        .catch(function (error) {
                            console.error(error);
                            res.status(500).send("Error: " + error);
                        });
                }
            })
            .catch(function (error) {
                console.error(error);
                res.status(500).send("Error: " + error);
            });
    }
);
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
    "/users/:Username", passport.authenticate('jwt', { session: false }),
    function (req, res) {
        Users.findOneAndUpdate(
            { Username: req.params.Username },
            {
                $set: {
                    Username: req.body.Username,
                    Password: req.body.Password,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday,
                },
            },
            { new: true }, //this line makes sure that the updated document is returned
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
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});