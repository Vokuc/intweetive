import express, { json } from "express";
import path from "path";
import { Server } from "socket.io";
import cors from "cors";
import util from "util";
import request from "request";
import http from "http";

const app = express();
const port = 5000;

const post = util.promisify(request.post);
const get = util.promisify(request.get);

const server = http.createServer(app);
const io = new Server(server);

app.use(json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// Establishes socket connection.
io.on("connection", (socket) => {
	stream();
	socket.on("connection", () => console.log("Client connected"));
	socket.on("disconnect", () => console.log("Client disconnected"));
});

// Emits data with socket.io as twitter stream flows in
const stream = () => {
	twitter.stream(
		"statuses/filter",
		{
			track: app.locals.searchTerm,
		},
		(stream) => {
			stream.on("data", (tweet) => {
				sendMessage(tweet);
			});
			stream.on("error", (error) => {
				console.log(error);
			});
		}
	);
};

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
