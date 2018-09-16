require(`dotenv`).config();
const request = require(`request`);
const moment = require(`moment`);
const Spotify = require(`node-spotify-api`);
const fs = require(`fs`);
const keys = require(`./keys.js`);
var command = process.argv[2];
var searchTerm = process.argv.slice(3).join("+");

console.log(command);
console.log(searchTerm);

// Grabs ID & secret
const spotify = new Spotify(keys.spotify);

function spotifyThis() {
  spotify
    .search({
      type: `track`,
      query: searchTerm,
      limit: `1`
    })
    .then(data => {
      data.tracks.items.forEach(i => {
        console.log(`===================================================`);
        console.log(`\nSong: "${i.name}"`);
        console.log(`\nAlbum: ${i.album.name}`);
        i.artists.forEach(function(j) {
          console.log(`\nArtist: ${j.name}`);
        });
        console.log(`\nPreview: ${i.preview_url} (Ctr/Cmd + click)\n`);
        console.log(`===================================================`);
      });
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      console.log(`===================================================`);
      console.log(`\nSong: "The Sign"`);
      console.log(`\nAlbum: The Sign (US Album) [Remastered]`);
      console.log(`\nArtist: Ace of Base`);
      console.log(
        `\nPreview: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=6179a4f992444a50a4812ff7f6ce00da (Ctr/Cmd + click)\n`
      );
      console.log(`===================================================`);
    });
}

switch (command) {
  case `spotify-this-song`:
    spotifyThis(searchTerm);
    break;
  case `concert-this`:
    var queryUrl = `https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=codingbootcamp`;
    request(queryUrl, (error, response, body) => {
      const parsedBody = JSON.parse(body);
      console.log(`\nError: ${error}`);
      console.log(`Status Code: ${response.statusCode}\n`);
      parsedBody.forEach(k => {
        console.log(`===================================================`);
        console.log(`"${k.venue.name}"`);
        console.log(`${k.venue.city}, ${k.venue.region}, ${k.venue.country}`);
        console.log(`Event Date: ${moment(k.datetime).format("MM/DD/YYYY")}`);
        console.log(`===================================================\n`);
      });
    });
    break;
  case `movie-this`:
    var queryUrl = `http://www.omdbapi.com/?t=${searchTerm}&y=&plot=short&apikey=trilogy`;

    if (searchTerm === "") {
      queryUrl = `http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy`;

      request(queryUrl, (error, response, body) => {
        const parsedBody = JSON.parse(body);
        if (error !== null && response.statusCode !== 200) {
          console.log(`\nError: ${error}`);
          console.log(`Status Code: ${response.statusCode}\n`);
        }
        console.log(`===================================================\n`);
        console.log(`Title: ${parsedBody.Title}`);
        console.log(`Released: ${parsedBody.Released}`);
        console.log(`IMDB Rating: ${parsedBody.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${parsedBody.Ratings[1].Value}`);
        console.log(`Country Produced at: ${parsedBody.Country}`);
        console.log(`Language: ${parsedBody.Language}`);
        console.log(`Plot: ${parsedBody.Plot}`);
        console.log(`Actors: ${parsedBody.Actors}`);
        console.log(`\n===================================================`);
      });
    } else {
      request(queryUrl, (error, response, body) => {
        const parsedBody = JSON.parse(body);
        if (error !== null && response.statusCode !== 200) {
          console.log(`\nError: ${error}`);
          console.log(`Status Code: ${response.statusCode}\n`);
        }
        console.log(`===================================================\n`);
        console.log(`Title: ${parsedBody.Title}`);
        console.log(`Released: ${parsedBody.Released}`);
        console.log(`IMDB Rating: ${parsedBody.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${parsedBody.Ratings[1].Value}`);
        console.log(`Country Produced at: ${parsedBody.Country}`);
        console.log(`Language: ${parsedBody.Language}`);
        console.log(`Plot: ${parsedBody.Plot}`);
        console.log(`Actors: ${parsedBody.Actors}`);
        console.log(`\n===================================================`);
      });
    }
    break;
  case `do-what-it-says`:
    fs.readFile(`random.txt`, `utf8`, (err, data) => {
      if (err) {
        console.log(`Error: ${err}`);
      }

      var output = data.slice(18).replace(/["]+/g, "");

      searchTerm = output;
      spotifyThis(searchTerm);
    });
    break;
}
