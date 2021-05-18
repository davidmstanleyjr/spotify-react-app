require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const lyricsFinder = require('lyrics-finder');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/refresh', (req, res) => {
	const refreshToken = req.body.refreshToken;
	const spotifyApi = new SpotifyWebApi({
		// redirectUri  : 'process.env.PORT || 5000',
		redirectUri  : 'https://davids-spotify-app.herokuapp.com/',
		// redirectUri  : 'http://localhost:5000',
		clientId     : '49cb9bffd6fd4bb9b6df96a0858a23fa',
		clientSecret : '1dfcf0a1642b4a1eae578cf378c872ea',
		refreshToken
	});
	spotifyApi
		.refreshAccessToken()
		.then((data) => {
			res.json({
				accessToken : data.body.accessToken,
				expiresIn   : data.body.expiresIn
			});
		})
		.catch(() => {
			res.sendStatus(400);
		});
});

app.post('/login', function(req, res) {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		// redirectUri  : 'process.env.PORT || 5000',
		// redirectUri  : 'http://localhost:5000',
		redirectUri  : 'https://davids-spotify-app.herokuapp.com/',
		clientId     : '49cb9bffd6fd4bb9b6df96a0858a23fa',
		clientSecret : '1dfcf0a1642b4a1eae578cf378c872ea'
	});

	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			res.json({
				accessToken  : data.body.access_token,
				refreshToken : data.body.refresh_token,
				expiresIn    : data.body.expires_in
			});
		})
		.catch((err) => {
			res.sendStatus(400);
		});
});

app.get('/lyrics', async (req, res) => {
	const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || 'No Lyrics Found';
	res.json({ lyrics });
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// app.listen(3001);
app.listen(PORT, console.log(`Server is starting at ${PORT}`));
