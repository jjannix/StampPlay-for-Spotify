# StampPlay for Spotify

StampPlay is a Node.js tool designed to enhance your Spotify listening experience by allowing you to play a specific part of a song. This tool utilizes the Spotify API to control playback, offering flexibility in choosing where to start and stop playing a song.

## Features

- **Precise Playback:** StampPlay allows you to define the exact starting point (`startInMs`) and duration (`stopAfter`) for playing a song.

- **Easy Setup:** Simply configure your Spotify credentials and song details in the environment variables using the provided `.env` file.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/jjannix/StampPlay-for-Spotify.git
   cd StampPlay-for-Spotify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
    - Create a `.env` file in the project root.
    - Add the following variables with your Spotify credentials:

      ```env
      SONG_LINK=spotify_link_of_the_song
      TOKEN=your_spotify_token
      DEVICEID=your_spotify_device_id
      START_IN_MS=64000
      STOP_AFTER=10000
      ```
    - Adjust the values based on your preferences.

4. **Run the script**
      ```bash
      cd src
      node .\apiCall.js 
      ```
## Configuration

- TOKEN: Your Spotify access token.
- DEVICEID: The ID of your Spotify playback device.
- START_IN_MS: The starting point of the song in milliseconds
- STOP_AFTER: The duration for which the song should play in milliseconds.
- SONGURI: The Spotify URI of the desired song.

## Contributing

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests to help improve StampPlay.