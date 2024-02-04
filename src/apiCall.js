const fs = require('fs').promises;
const readline = require('readline');
const path = require('path');
const axios = require('axios')
const dotenv = require('dotenv');
const getAlbumURI = require('./getAlbumURI');
const stopPlayback = require('./stopPlayback');

const colorReset = '\x1b[0m';
const colorCyan = '\x1b[36m';

dotenv.config();



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let playlist;

async function readPlaylist() {
  try {
    const content = await fs.readFile('playlist.json', 'utf-8');
    playlist = JSON.parse(content);
  } catch (error) {
    console.error('Error reading playlist:', error.message);
    process.exit(1);
  }
}

async function updatePlaylist() {
  try {
    const playlistPath = path.join(__dirname, 'playlist.json');
    const fileExists = await fs.access(playlistPath).then(() => true).catch(() => false);

    if (fileExists && playlist.length > 0) {
      // Remove the first item from the playlist
      playlist.shift();
      // Write the updated playlist back to the file
      await fs.writeFile(playlistPath, JSON.stringify(playlist, null, 2), 'utf-8');
      console.log('Playlist updated successfully.');
    } else {
      if (!fileExists) {
        console.error('Error: playlist.json does not exist.');
      } else {
        console.log('Playlist is empty.');
      }
    }
  } catch (error) {
    console.error('Error updating playlist:', error.message);
    process.exit(1);
  }
}



function askUserConfirmation() {
  return new Promise((resolve) => {
    rl.question('Do you want to continue? (y/n): ', (answer) => {
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

async function playAndStop(songLink, startInMs, stopAfter) {
  try {
    const { albumUri, trackNumber } = await getAlbumURI(songLink);

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
    console.log(`Playback stopped successfully after ${colorCyan}${stopAfter}${colorReset} seconds.`);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function main() {
  await readPlaylist();

  while (playlist.length > 0) {
    const currentEntry = playlist[0];

    console.log(`Next item: ${currentEntry.link} (Value1: ${currentEntry.start}, Value2: ${currentEntry.end})`);


    const shouldContinue = await askUserConfirmation();

    if (shouldContinue) {
      console.log('Continuing...');
      await updatePlaylist();
      await playAndStop(currentEntry.link, currentEntry.start, currentEntry.end);
    } else {
      console.log('Script aborted by user.');
      break;
    }
  }


  rl.close();
}

main();
