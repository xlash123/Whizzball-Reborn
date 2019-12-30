import express from 'express';
import MapModel from '../Models/Map';

const setmapRouter = express.Router();

setmapRouter.all('/', (req, res) => {
	const { vote, id } = req.body;

	MapModel.findOne({ puzzleId: id }, (err, map) => {
		if (err) res.status(500).send(err);
		else if (map){
			const realVote = Math.min(Math.max(1, vote), 5);
			map.popularity.votes++;
			const totalVotes = map.popularity.votes;
			// Compute continuous average
			map.popularity.rating = (map.popularity.rating * (totalVotes - 1) + realVote) / (totalVotes);
			map.save().then(() => {
				res.json('done');
			}).catch(er => res.status(500).send(er));
		} else res.status(404).send('map not found');
	});
});

export default setmapRouter;
