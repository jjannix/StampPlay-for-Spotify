// import necessary modules
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

// export the function for external use
module.exports = async function getAlbumURI(songURI) {
  try {
    // define API request options
    const options = {
      method: 'GET',
      url: `https://api.spotify.com/v1/tracks/${songURI}`,
      headers: {
        Authorization: 'Bearer BQC0WxgpVp73nXegFFHrYiqTaHr-bM8Zri-NFfr2y0MUpoNc5ygLVbSC7QF7Ur-MQROR70kvzWNZAtTVd0wWzTM7Pwq0EtTmuzRk-fP6p_HsJPOt4DvneUokFxS1ceKLpNghkbHfgvmmcLUdbXipoJ7tojuxDu6yMS4x7UhkEdh5zy2o6TVKbOj1ZYiawj80YouRdUb2zcCTp3KMZvuu' // Replace with your actual access token
      }
    };

    // make the API request
    const response = await axios(options);

    // Extract album URI
    const albumUri = extractAlbumURI(response.data.album.external_urls.spotify);
    const trackNumber = response.data.track_number - 1;
    console.log(trackNumber)
    return { albumUri, trackNumber };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// function to extract album URI from playlist link
function extractAlbumURI(playlistLink) {
  const regex = /album\/([^/?]+)/;
  const match = regex.exec(playlistLink);
  return match ? match[1] : null;
}
