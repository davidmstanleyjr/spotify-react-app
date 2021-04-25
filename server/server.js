const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');



const app = express();

app.post('/login', function(req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
      redirectUri: 'http://localhost:3000',
      clientId: '49cb9bffd6fd4bb9b6df96a0858a23fa',
      clientSecret: '1dfcf0a1642b4a1eae578cf378c872ea'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})