// import necessary modules
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

// export the function for external use
module.exports = async function getAlbumURI(songURI) {
  const songID = extractSongURI(process.env.SONG_LINK);
  console.log('SONGURI:', songURI);
  try {
;

    // define API request options
    const options = {
      method: 'GET',
      url: `https://api.spotify.com/v1/tracks/${songID}`,
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


function extractAlbumURI(albumLink) {
  const regex = /album\/([^/?]+)/;
  const match = regex.exec(albumLink);
  return match ? match[1] : null;
}
function extractSongURI(songLink) {
  const regex = /track\/([^/?]+)/;
  const match = regex.exec(songLink);
  return match ? match[1] : null;
}
