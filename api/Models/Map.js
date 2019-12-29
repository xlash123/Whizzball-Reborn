import mongoose from 'mongoose';

const mapSchema = new mongoose.Schema({
	mapdata: String,
	difficulty: Number,
	description: String,
	title: String,
	author: String,
	date: Date,
	popularity: {
		votes: Number,
		rating: Number,
	},
	puzzleId: Number,
}, { collection: 'Maps' });

export default mongoose.model('Map', mapSchema);
