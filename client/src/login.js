import React from 'react';

import { Container } from 'react-bootstrap';

const AUTH_URL =
	'https://accounts.spotify.com/authorize?client_id=49cb9bffd6fd4bb9b6df96a0858a23fa&response_type=code&redirect_uri=https://davids-spotify-app.herokuapp.com/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

export default function login() {
	return (
		<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
			<a className="btn btn-success btn-lg" href={AUTH_URL}>
				Login With Spotify
			</a>
		</Container>
	);
}
