import express from 'express';
import param from 'jquery-param';
import User from '../Models/User';

const playersRouter = express.Router();

playersRouter.all('/', (req, res) => {
	console.log('/players');
	const { name, score } = req.body;

	User.findOne({ name }, (err, user) => {
		if (err) res.status(500).send(err);
		else if (user) {
			user.score = score;
			user.save().then(() => {
				res.send('done');
			}).catch(er => res.status(500).send(er));
		} else res.status(404).send('no user found');
	});
});

export default playersRouter;
