// Imports express into your package 
const express = require('express'),
    morgan = require('morgan');

const app = express()

const bodyParser = require('body-parser'),
    methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());


app.use(express.static('public'));
// Morgan middleware will log all request
app.use(morgan('common'));

let users = [
    {
        id: 1,
        Username: "Hannah Keating",
        Password: "1234",
        Email: "h.monet1104@gmail.com",
        Birthday: "11/04/1990",
        FavoritesMovies: [],
    },
    {
        id: 2,
        Username: "Natasha Keating",
        Password: "5678",
        Email: "h.monet1104@yahoo.com",
        Birthday: "11/04/1990",
        FavoriteMovies: [],
    },
    {
        id: 3,
        Username: "Sean Keating",
        Password: "5555",
        Email: "seank@gmail.com",
        Birthday: "11/04/1990",
        FavoriteMovies: [],
    },
];

let movies = [
    {
        id: 1,
        Title: "Silence of the Lambs",
        Description:
            "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
        Genre: {
            Name: "Thriller",
            Description:
                "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
        },
        Director: {
            Name: "Jonathan Demme",
            Bio:
                "Robert Jonathan Demme was an American director, producer, and screenwriter.",
            Birth: "1944",
            Death: "2017",
        },

        ImagePath:
            "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,677,1000_AL_.jpg",
        Featured: true,
    },
    {
        id: 2,
        Title: "Joker",
        Description:
            "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
        Genre: {
            Name: "Drama",
            Description:
                "In film and television, drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. ... These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.",
        },
        Director: {
            Name: "Todd Phillips",
            Bio:
                "Todd Phillips was born on December 20, 1970 in Brooklyn, New York City, New York, USA as Todd Bunzl. He is a producer and director, known for Joker (2019), Old School (2003) and Due Date (2010).",
            Birth: "1970",
            Death: "",
        },

        ImagePath:
            "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        Featured: true,
    },
    {
        id: 3,
        Title: "The Notebook",
        Description:
            "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
        Genre: {
            Name: "Romance",
            Description:
                "Romance films or romance movies are romantic love stories recorded in visual media for broadcast in theaters and on TV that focus on passion, emotion, and the affectionate romantic involvement of the main characters and the journey that their love takes them through dating, courtship or marriage.",
        },
        Director: {
            Name: "Nick Cassavetes",
            Bio:
                "Nick Cassavetes was born in New York City, the son of actress Gena Rowlands and Greek-American actor and film director John Cassavetes. As a child, he appeared in two of his father's films: Husbands (1970) and A Woman Under the Influence (1974). After spending so much of his youth surrounded by the film industry, Cassavetes initially decided he did not want to go into the field. He instead attended Syracuse University on a basketball scholarship. His athletic career was effectively ended by an injury, and he decided to rethink his aspirations, ultimately deciding to attend his parents' alma mater, the American Academy of Dramatic Arts in New York. He has appeared in the films, Face/Off (1997), The Wraith (1986), Life (1999), Class of 1999 II: The Substitute (1994), Backstreet Dreams (1990) and The Astronaut's Wife (1999), among others. He has directed several films, including John Q (2002), Alpha Dog (2006), She's So Lovely (1997), Unhook the Stars (1996), The Notebook (2004), and My Sister's Keeper (2009). He also adapted the screenplay for Blow (2001) and wrote the dialogue for the Justin Timberlake music video, \"What Goes Around... Comes Around\". In 1985, Cassavetes married Isabelle Rafalovich. They had two daughters together, Virginia Cassavetes (Virginia Sara Cassavetes) (born in 1986) and Sasha Cassavetes (born in 1988), before divorcing. He then married Heather Wahlquist (Heather \"Queenie\" Wahlquist), who has appeared in several of his films, including a small role in The Notebook (2004) as Sara, a secondary character and best friend to the female lead Allie Hamilton, portrayed by Rachel McAdams. The movie is effectively a family project, as Cassavetes's own mother, Gena Rowlands, appears as the older, married Allie Calhoun.",
            Birth: "1959",
            Death: "",
        },

        ImagePath:
            "https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_.jpg",
        Featured: true,
    },
    {
        id: 4,
        Title: "Harry Potter and the Deathly Hallows: Part 2",
        Description:
            "Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.",
        Genre: {
            Name: "Adventure",
            Description:
                "Adventure. Adventure film is a genre that revolves around the conquests and explorations of a protagonist. The purpose of the conquest can be to retrieve a person or treasure, but often the main focus is simply the pursuit of the unknown. These films generally take place in exotic locations and play on historical myths.",
        },
        Director: {
            Name: "David Yates",
            Bio:
                "David Yates was born on October 8, 1963 in St. Helens, Merseyside, England. He is a director and producer, known for Harry Potter and the Deathly Hallows: Part 2 (2011), Harry Potter and the Order of the Phoenix (2007) and The Legend of Tarzan (2016).",
            Birth: "1963",
            Death: "",
        },

        ImagePath:
            "https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX667_CR0,0,667,999_AL_.jpg",
        Featured: true,
    },
    {
        id: 5,
        Title: "Do the Right Thing",
        Description:
            "On the hottest day of the year on a street in the Bedford-Stuyvesant section of Brooklyn, everyone's hate and bigotry smolders and builds until it explodes into violence.",
        Genre: {
            Name: "Comedy Drama",
            Description:
                "An all-encompassing genre hybrid that merges dramatic film with comic elements or a strong comic lead, in situations that do not necessarily end happily. Instead of presenting the world as neat and clean and full of only laughs and resolution, these films often add dramatic touches like tragedy, melodrama and melancholy while maintaining a light tone.",
        },
        Director: {
            Name: "Spike Lee",
            Bio:
                "Spike Lee was born Shelton Jackson Lee on March 20, 1957, in Atlanta, Georgia. At a very young age, he moved from pre-civil rights Georgia, to Brooklyn, New York.",
            Birth: "1957",
            Death: "",
        },

        ImagePath:
            "https://m.media-amazon.com/images/M/MV5BODA2MjU1NTI1MV5BMl5BanBnXkFtZTgwOTU4ODIwMjE@._V1_UX182_CR0,0,182,268_AL_.jpg",
        Featured: true,
    },
    {
        id: 6,
        Title: "The Color Purple",
        Description:
            "A black Southern woman struggles to find her identity after suffering abuse from her father and others over four decades.",
        Genre: {
            Name: "Drama",
            Description:
                "In film and television, drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. ... These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.",
        },
        Director: {
            Name: "Steven Spielberg",
            Bio:
                "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world.",
            Birth: "1946",
            Death: "",
        },

        ImagePath:
            "https://m.media-amazon.com/images/M/MV5BZDRkOWQ5NGUtYTVmOS00ZjNhLWEwODgtOGI2MmUxNTBkMjU0XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_UX182_CR0,0,182,268_AL_.jpg",
        Featured: true,
    },
    {
        id: 7,
        Title: "Ready Player One",
        Description:
            "When the creator of a virtual reality called the OASIS dies, he makes a posthumous challenge to all OASIS users to find his Easter Egg, which will give the finder his fortune and control of his world.",
        Genre: {
            Name: "Adventure",
            Description:
                "Adventure. Adventure film is a genre that revolves around the conquests and explorations of a protagonist. The purpose of the conquest can be to retrieve a person or treasure, but often the main focus is simply the pursuit of the unknown. These films generally take place in exotic locations and play on historical myths.",
        },
        Director: {
            Name: "Steven Spielberg",
            Bio:
                "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world.",
            Birth: "1946",
            Death: "",
        },

        ImagePath:
            "https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_UX182_CR0,0,182,268_AL_.jpg",
        Featured: true,
    },
    {
        id: 8,
        Title: "Black Panther",
        Description:
            "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
        Genre: {
            Name: "Action",
            Description:
                "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases. Common action scenes in films are generally, but not limited to, explosions, car chases, fistfights and shootouts.",
        },
        Director: {
            Name: "Ryan Coogler",
            Bio:
                "Ryan Coogler was born on May 23, 1986 in Oakland, California, USA as Ryan Kyle Coogler. He is a director and writer, known for Black Panther (2018), Creed (2015) and Fruitvale Station (2013)",
            Birth: "1986",
            Death: "",
        },

        ImagePath:
            "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        Featured: true,
    },
    {
        id: 9,
        Title: "Inception",
        Description:
            "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        Genre: {
            Name: "Action",
            Description:
                "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases. Common action scenes in films are generally, but not limited to, explosions, car chases, fistfights and shootouts.",
        },
        Director: {
            Name: "Christopher Nolan",
            Bio:
                "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England.",
            Birth: "1970",
            Death: "",
        },

        ImagePath:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        Featured: true,
    },
    {
        id: 10,
        Title: "Harlem Nights",
        Description:
            "During the 1930s, a New York City illegal gambling house owner and his associates must deal with strong competition, gangsters, and corrupt cops in order to stay in business.",
        Genre: {
            Name: "Comedy Drama",
            Description:
                "An all-encompassing genre hybrid that merges dramatic film with comic elements or a strong comic lead, in situations that do not necessarily end happily. Instead of presenting the world as neat and clean and full of only laughs and resolution, these films often add dramatic touches like tragedy, melodrama and melancholy while maintaining a light tone.",
        },
        Director: {
            Name: "Eddie Murphy",
            Bio:
                "Edward Regan Murphy was born April 3, 1961 in Brooklyn, New York, to Lillian Lynch (born: Lillian Laney), a telephone operator, and Charles Edward Murphy, a transit police officer who was also an amateur comedian and actor.",
            Birth: "1961",
            Death: "",
        },

        ImagePath:
            "https://m.media-amazon.com/images/M/MV5BODlmNjc1MjYtMjBhOC00ZGFjLTkwMWUtYWNhMDAyYmJlNWEwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        Featured: true,
    },
];

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});
app.get('/movies', (req, res) => {
    res.json(movies);
});
app.get('/movies/:Title', (req, res) => {
    res.json(
        movies.find((movie) => {
            return movie.Title === req.params.Title;
        })
    );
});
app.get('/movies/genres/:Name', (req, res) => {
    res.json(
        movies.find((movie) => {
            return movie.Genre.Name === req.params.Name;
        })
    );
});
app.get('/movies/director/:Name', (req, res) => {
    res.json(
        movies.find((movie) => {
            return movie.Director.Name === req.params.Name;
        })
    );
});

// Adding Users
app.post('/users', (req, res) => {
    res.status(201).send('User is now add!');
});
//Upadating User information
app.put('/users/:Username', (req, res) => {
    res.json(
        users.find((user) => {
            return user.Username === req.params.Username;
        })
    );
});
//Allowing users to add movie to favorites
app.post('users/:Username/favorites', (req, res) => {
    res.status(201).send('Successfully add movie to favorites!');
});
//Deleting a movie from favorites
app.delete('/users/:Username/favorites', (req, res) => {
    res.status(201).send('Successfully removed movie from favorites');
});
app.delete('/users/:Email', (req, res) => {
    res.status(201).send('User is now Deleted!')
})

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