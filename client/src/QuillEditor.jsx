import { useEffect, useCallback, useState } from "react";
import { io } from "socket.io-client";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ font: [] }],
	[{ list: "ordered" }, { list: "bullet" }],
	["bold", "italic", "underline"],
	[{ color: [] }, { background: [] }],
	[{ script: "sub" }, { script: "super" }],
	[{ align: [] }],
	["image", "blockquote", "code-block"],
	["clean"],
];

function QuillEditor() {
	const { id: documentId } = useParams();
	const [socket, setSocket] = useState();
	const [quillInstance, setQuillInstance] = useState();

	useEffect(() => {
		if (socket == null || quillInstance == null) return;

		const interval = setInterval(() => {
			socket.emit("save-document", quillInstance.getContents());
		}, SAVE_INTERVAL_MS);

		return () => {
			clearInterval(interval);
		};
	}, [socket, quillInstance]);

	useEffect(() => {
		if (!socket || !quillInstance) return;
		socket.once("load-document", (document) => {
			quillInstance.setContents(document);
			quillInstance.enable();
		});

		socket.emit("get-document", documentId);
	}, [quillInstance, socket, documentId]);

	useEffect(() => {
		const s = io("http://localhost:3001");
		setSocket(s);

		return () => {
			s.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!socket || !quillInstance) return;
		const handler = (delta, oldDelta, source) => {
			if (source !== "user") return;
			socket.emit("send-changes", delta);
		};

		quillInstance.on("text-change", handler);

		return () => {
			quillInstance.off("text-change", handler);
		};
	}, [quillInstance, socket]);

	useEffect(() => {
		if (!socket || !quillInstance) return;
		const handler = (delta) => {
			quillInstance.updateContents(delta);
		};

		socket.on("receive-changes", handler);

		return () => {
			socket.off("receive-changes", handler);
		};
	}, [quillInstance, socket]);

	const quillRef = useCallback((wrapper) => {
		if (!wrapper) return;
		wrapper.innerHTML = "";
		const editor = document.createElement("div");
		wrapper.append(editor);
		const q = new Quill(editor, {
			theme: "snow",
			modules: {
				toolbar: TOOLBAR_OPTIONS,
			},
		});
		q.disable();
		q.setText("Loading...");
		setQuillInstance(q);
	}, []); // Empty dependency array to run this effect only once

	return <div ref={quillRef} className="quillContainer"></div>;
}

export default QuillEditor;
