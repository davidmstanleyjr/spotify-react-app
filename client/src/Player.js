import { useState, useEffect } from "react"
//the playback of the music is not possible without this npm package.
import SpotifyPlayer from "react-spotify-web-playback"

//this file has all the code for making the player work.
export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  //plays songs automatically once a new song is selected.
  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      token={accessToken}
      //allows the user to save songs to their spotify library.
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  )
}