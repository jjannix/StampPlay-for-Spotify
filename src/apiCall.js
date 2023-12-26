const axios = require("axios").default;
const getAlbumURI = require('./getAlbumURI');
const dotenv = require('dotenv');

dotenv.config();


var startInMs = 75000;
var songURI = process.env.SONGURI;
var albumURI;
var trackNumber

// Call the exported function to get the album URI
getAlbumURI(songURI)
  .then((result) => {
    albumURI = result.albumUri;
    trackNumber = result.trackNumber;

    const options = {
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/play',
      params: {
        device_id: '121fedfe8a93567b75e15f5b0b761043658251be'
      },
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'text/plain;charset=UTF-8',
      },
      data: `{
        "context_uri": "spotify:album:${albumURI}",
        "offset": {
            "position": ${trackNumber}
        },
        "position_ms": ${startInMs}
      }`
    };

    axios.request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error('Error:', error);
  });