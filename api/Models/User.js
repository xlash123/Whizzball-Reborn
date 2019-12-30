import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: String,
	score: Number,
}, { collection: 'Users' });

export default mongoose.model('User', userSchema);
