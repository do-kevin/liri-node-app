require(`dotenv`).config();

// const fs = require(`fs`);
const Spotify = require(`node-spotify-api`);
const keys = require(`./keys.js`);
var command = process.argv[2];
var searchTerm = process.argv.slice(3).join("+");

console.log(command);
console.log(searchTerm);

// Grabs ID & secret
const spotify = new Spotify(keys.spotify);

switch (command) {
  case `spotify-this-song`:
    spotify
      .search({
        type: `track`,
        query: searchTerm,
        limit: `5`
      })
      .then(function(data) {
        data.tracks.items.forEach(function(i) {
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
      .catch(function(err) {
        console.log(`Error: ${err}`);
        console.log(`===================================================`);
        console.log(`\nSong: "The Sign"`);
        console.log(`\nAlbum: The Sign (US Album) [Remastered]`);
        console.log(`\nArtist: Ace of Base`);
        console.log(`\nPreview: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=6179a4f992444a50a4812ff7f6ce00da (Ctr/Cmd + click)\n`);
        console.log(`===================================================`);
      });
}
