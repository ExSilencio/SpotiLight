import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import spotifyLogo from "../images/Spotify_Icon_RGB_White.png"

export default function Login() {
	const [show, setShow] = useState(true);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>	
			<Modal
				size="lg"
				show={show}
				onEnter={handleShow}
				onHide={handleClose}
				onExit={() => {
					window.history.pushState({}, null, "/")
				}}
				centered
			>
				<Modal.Header>
					<Modal.Title><span className="text-light">Authorisation required</span></Modal.Title>
				</Modal.Header>
				<Modal.Body centered>
					<div className="text-light text-center p-5 fs-3">
						<p>In order to use the app, you will have to sign in with your <strong>Spotify</strong> account.</p>
						Click the link below to be taken to Spotify's Authentication screen.
					</div>
				</Modal.Body>
				<Modal.Footer>
						<Button variant="secondary" size="lg" onClick={handleClose}>
							<span style={{fontWeight: 600}}>Cancel</span>
						</Button>
						<Button variant="success" size="lg" id="btn-login" href="/app">
							<img 
								className="logo"
								src={spotifyLogo}
								alt="Spotify Logo"
							/>
							Login With Spotify
						</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}


// Old method
// </div><Button variant="success" size="lg" id="btn-login" href={AUTH_URL} >
