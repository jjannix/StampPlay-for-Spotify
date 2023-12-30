const axios = require("axios").default;
const getAlbumURI = require('./getAlbumURI');
const stopPlayback = require('./stopPlayback');
const dotenv = require('dotenv');

dotenv.config();


const startInMs = process.env.START_IN_MS;
const stopAfter = process.env.STOP_AFTER; 
const songURI = process.env.SONGURI;

const colorReset = '\x1b[0m';
const colorCyan = '\x1b[36m';

console.log('TOKEN:', process.env.TOKEN);
console.log(`The player will stop after ${colorCyan}${stopAfter}${colorReset} millis.`)

async function playAndStop() {
  try {
    const { albumUri, trackNumber } = await getAlbumURI(songURI);

    const playOptions = {
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/play',
      params: {
        device_id: process.env.DEVICEID
      },
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      data: `{
        "context_uri": "spotify:album:${albumUri}",
        "offset": {
          "position": ${trackNumber}
        },
        "position_ms": ${startInMs}
      }`
    };

    const response = await axios.request(playOptions);
    console.log(response.data);

    await stopPlayback(stopAfter / 1000);
    console.log(`Playback stopped successfully after ${colorCyan}${stopAfter}${colorReset} millis.`);
  } catch (error) {
    console.error('Error:', error);
  }
}

playAndStop();
