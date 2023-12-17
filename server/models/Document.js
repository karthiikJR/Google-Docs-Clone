import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
	_id: String,
	data: Object,
});

const DocumentModel = mongoose.model("Document", DocumentSchema);

export default DocumentModel;
