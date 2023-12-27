const axios = require("axios").default;
const getAlbumURI = require('./getAlbumURI');
const dotenv = require('dotenv');

dotenv.config();


var startInMs = 75000;
var songURI = process.env.SONGURI;
var albumURI;
var trackNumber

console.log('SONGURI:', songURI);
console.log('TOKEN:', process.env.TOKEN);

// Call the exported function to get the album URI
getAlbumURI(songURI)
  .then((result) => {
    albumURI = result.albumUri;
    trackNumber = result.trackNumber;


    const options = {
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/play',
      params: {
        device_id: process.env.DEVICEID
      },
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      data: `{
        "context_uri": "spotify:album:${albumURI}",
        "offset": {
            "position":${trackNumber}
        },
        "position_ms":${startInMs}
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