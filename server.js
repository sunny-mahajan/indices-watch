const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");
const {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} = require("firebase/auth");
const { auth } = require("./firebaseConfig");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
	const server = express();
	const apiBaseUrl = process.env.API_BASE_URL;
	const apiKey = process.env.API_KEY;

	server.use(bodyParser.json());

	// Registration route
	server.post("/api/register", async (req, res) => {
		const { email, password } = req.body;

		console.log(email);
		console.log(password);

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			res.status(200).json({
				message: "User registered successfully",
				user,
			});
		} catch (error) {
			res.status(400).json({
				message: "Error registering user",
				error: error.message,
			});
		}
	});

	// Login route
	server.post("/api/login", async (req, res) => {
		const { email, password } = req.body;
		console.log(email, password);
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			res.status(200).json({
				message: "User logged in successfully",
				user,
			});
		} catch (error) {
			res.status(400).json({
				message: "Error logging in",
				error: error.message,
			});
		}
	});

	// API route to get all indices
	server.get("/api/indices", async (req, res) => {
		try {
			const response = await fetch(
				`${apiBaseUrl}/v3/reference/tickers?market=indices&active=true&limit=5&sort=market&apiKey=${apiKey}`
			);
			const data = await response.json();

			res.json(data);
		} catch (error) {
			res.status(500).json({
				message: "Error fetching indices",
				error: error.message,
			});
		}
	});

	// API route to get detail
	server.get("/api/index/:ticker", async (req, res) => {
		try {
			const { ticker } = req.params;

			const response = await fetch(
				`${apiBaseUrl}/v2/aggs/ticker/${ticker}/range/1/hour/2024-07-10/2024-07-10?sort=asc&apiKey=${apiKey}`
			);

			const data = await response.json();

			res.json(data);
		} catch (error) {
			res.status(500).json({
				message: "Error fetching index details",
				error: error.message,
			});
		}
	});

	// Default handler for all other routes
	server.all("*", (req, res) => {
		return handle(req, res);
	});

	const port = process.env.PORT || 3000;

	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
