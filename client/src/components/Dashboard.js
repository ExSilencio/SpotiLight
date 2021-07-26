import { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import TrackSearchResult from "./TrackSearchResult"
import useAuth from "../hooks/useAuth"
import Auth from "../pages/Auth"
import SpotifyWebApi from "spotify-web-api-node"
import Player from "./Player"
import FFT from './FFT'



const spotifyApi = new SpotifyWebApi()

export default function Dashboard({ auth }) {
	const accessToken = Auth(auth)
	const [search, setSearch] = useState("")
	const [searchResults, setSearchResults] = useState([])
	const [playingTrack, setPlayingTrack] = useState()

	function chooseTrack(track) {
			setPlayingTrack(track)
			setSearch("")
	}

	/*
	useEffect(() => {
		if (!playingTrack) return

		
		axios.get("http://localhost:3001/lyrics", {
			params: {
				track: playingTrack.title,
				artist: playingTrack.artist
			}
		}).then(res => {
			//setFft(res.data.fft)
		})
	}, [playingTrack])*/

	useEffect(() => {
		if (!accessToken) return
		spotifyApi.setAccessToken(accessToken)
	}, [accessToken])

	useEffect(() => {
		if (!search) return setSearchResults([])
		if (!accessToken) return

		let cancel = false

		spotifyApi.searchTracks(search).then(res => {
			if (cancel) return
			setSearchResults(
				res.body.tracks.items.map(track => {
					const smallestAlbumImage = track.album.images.reduce(
						(smallest, image) => {
							if (image.height < smallest.height) return image
							return smallest
						}, 
						track.album.images[0]
					)

					return {
						artist: track.artists[0].name,
						title: track.name,
						album: track.album.name,
						date: track.album.release_date,
						uri: track.uri,
						albumUrl: smallestAlbumImage.url
					}
				})
			)
		})
		return () => cancel = true
	}, [search, accessToken]
	)
	
	return (
		//console.log({auth})

	<Container className="d-flex flex-column py-2" style={{ height: "93vh", backgroundColor: "rgba(255, 255, 255, 0.25)" }}>
		<Form.Control 
			className="bg-dark text-light"
			type="search" 
			placeholder="Search Songs/Artists" 
			value={search} 
			onChange={e => setSearch(e.target.value)} 
		/>
		<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
			{searchResults.map(track => (
				<TrackSearchResult track={track} key={track.url} chooseTrack={chooseTrack} />
			))}
			{searchResults.length === 0 && (
				<div>
					<FFT />
				</div>
							
			)}
		</div>
		<div className="py-2"><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
	</Container>
	)
}
