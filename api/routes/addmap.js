import express from 'express';
import param from 'jquery-param';
import MapModel from '../Models/Map';

const addmapRouter = express.Router();

const generateNewId = () => {
	return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

addmapRouter.all('/', (req, res) => {
	console.log('/addmap');
	const {
		mapdata,
		difficulty,
		description,
		title,
		author,
	} = req.body;

	// Store and send back a puzzleId (int)
	// There's a special error code puzzleId=-2, but I don't know what for
	const map = new MapModel({
		mapdata,
		difficulty,
		description,
		title,
		author,
		date: Date.now(),
		popularity: {
			votes: 0,
			rating: 0,
		},
		puzzleId: generateNewId(),
	});
	map.save().then((m) => {
		res.send(param({ puzzleId: m.puzzleId }));
	}).catch((err) => {
		console.error('Error saving:', err);
		res.send(param({ puzzleId: -2 }));
	});
});

export default addmapRouter;
