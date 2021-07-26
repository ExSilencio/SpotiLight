import { useState, useEffect } from "react"
import axios from "axios"

export default function useAuth(code) {
	const [accessToken, setAccessToken] = useState()
	const [refreshToken, setRefreshToken] = useState()
	const [expiresIn, setExpiresIn] = useState()

	
	useEffect(() => {
		axios
			.get('http://localhost:3001/auth/login', {})
			.then(res => {
				setAccessToken(res.accessToken)
				setRefreshToken(res.refreshToken)
				setExpiresIn(res.expiresIn)
				//window.history.pushState({}, null, "/app")
			})
			.catch(() => {
				alert("An error occured.")
				window.location = "/"
			})
	}, [code])

	useEffect(() => {
		if (!refreshToken || !expiresIn) return
		const interval = setInterval(() => {
			axios
				.post('http://localhost:3001/refresh', {
					refreshToken,
				})
				.then(res => {
					setAccessToken(res.data.accessToken)
					setExpiresIn(res.data.expiresIn)
				})
				.catch(() => {
					window.location = "/"
				})
		}, (expiresIn - 60) * 1000)
		return () => clearInterval(interval)
	}, [refreshToken, expiresIn])

	return accessToken
}
