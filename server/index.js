const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

const envPath = path.resolve(__dirname, `.env.${process.env.NODE_ENV || 'development'}`);
dotenv.config({ path: envPath });

const app = express();
const port = 8080;

const cors = require('cors');

app.use(cors())

const STEAM_API_KEY = process.env.STEAM_KEY;
const STEAM_ID = process.env.STEAM_ID;
const LAST_FM_KEY = process.env.LAST_FM_API_KEY;

let LAST_GAME_DATA
let LAST_SONG_DATA

const UpdateData = async () => {
    try {
        const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json&include_appinfo=true`;
        const response = await axios.get(url);
        LAST_GAME_DATA = response.data;
    } catch (error) {
        LAST_GAME_DATA = { error: 'Error while retrieving data from Steam' };
    }

    try {
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=gabrielolvh&api_key=${LAST_FM_KEY}&format=json`;
        const response = await axios.get(url);
        LAST_SONG_DATA = response.data;
    } catch (error) {
        LAST_SONG_DATA = { error: 'Error while retrieving data from Last FM' };
    }

    console.log("Updated data!")
}
setInterval(UpdateData, 60 * 1000);

UpdateData();

app.get('/api/recentlyplayed', async (req, res) => {
    try {
        res.json(LAST_GAME_DATA)
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving data from Steam' });
    }
});

app.get("/api/recentsongs", async (req, res) => {

    try {
        res.json(LAST_SONG_DATA);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving data from Last FM' });
    }
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
