import React, { Component } from 'react'
import { Container } from "react-bootstrap";


export default class About extends Component {
	render() {
		return (
			<Container className="d-flex flex-column py-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}>
				This is some text.
			</Container>
		)
	}
}
