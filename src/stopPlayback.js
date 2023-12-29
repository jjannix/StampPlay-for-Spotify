const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async function stopPlayback(songDuration) {
  try {
    const options = {
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/pause',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`
      }
    };


    const delayInMilliseconds = songDuration * 1000;
    await new Promise(resolve => setTimeout(resolve, delayInMilliseconds));

    const response = await axios(options);
    console.log('Player paused successfully');

  } catch (error) {
    console.error('Error pausing player:', error.response ? error.response.data : error.message);
    throw new Error('Failed to pause player');
  }
};
