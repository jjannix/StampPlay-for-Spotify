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
        Authorization: 'Bearer BQC0WxgpVp73nXegFFHrYiqTaHr-bM8Zri-NFfr2y0MUpoNc5ygLVbSC7QF7Ur-MQROR70kvzWNZAtTVd0wWzTM7Pwq0EtTmuzRk-fP6p_HsJPOt4DvneUokFxS1ceKLpNghkbHfgvmmcLUdbXipoJ7tojuxDu6yMS4x7UhkEdh5zy2o6TVKbOj1ZYiawj80YouRdUb2zcCTp3KMZvuu',
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