// import necessary modules
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

// export the function for external use
module.exports = async function getAlbumURI(songURI) {
  console.log('SONGURI:', songURI);
  try {
;

    // define API request options
    const options = {
      method: 'GET',
      url: `https://api.spotify.com/v1/tracks/${songURI}`,
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`
      }
    };

    // make the API request
    const response = await axios(options);

    // Extract album URI
    const albumUri = extractAlbumURI(response.data.album.external_urls.spotify);
    const trackNumber = response.data.track_number - 1;
    console.log('Track Number:', trackNumber);
    return { albumUri, trackNumber };
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to get album URI');
  }
};

// function to extract album URI from playlist link
function extractAlbumURI(playlistLink) {
  const regex = /album\/([^/?]+)/;
  const match = regex.exec(playlistLink);
  return match ? match[1] : null;
}
