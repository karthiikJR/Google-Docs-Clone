import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import DocumentModel from "./models/Document.js";

dotenv.config();

const PORT = process.env.PORT || 3001;
const CONNECTION = process.env.MONGOOSE_CONNECTION;
const DEFAULT_VALUE = "";

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("connected");

	socket.on("get-document", async (documentId) => {
		const document = await findOrCreateDocument(documentId);
		socket.join(documentId);
		socket.emit("load-document", document.data);

		socket.on("send-changes", (delta) => {
			socket.broadcast.to(documentId).emit("receive-changes", delta);
		});

		socket.on("save-document", async (data) => {
			await DocumentModel.findByIdAndUpdate(documentId, { data });
		});
	});
});

mongoose.connect(CONNECTION);

httpServer.listen(PORT, () => {
	console.log(`Socket.io server listening on port ${PORT}`);
});

async function findOrCreateDocument(id) {
	if (id == null) return;

	const document = await DocumentModel.findById(id);
	if (document) return document;
	return await DocumentModel.create({ _id: id, data: DEFAULT_VALUE });
}
