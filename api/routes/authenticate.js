import express from 'express';
import param from 'jquery-param';
import User from '../Models/User';

const authenticateRouter = express.Router();

authenticateRouter.post('/', (req, res) => {
	const { name } = req.body;

	User.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i')} }, (err, user) => {
		if (err) res.status(500).send(err);
		else if (user) {
			res.send(param({ isValid: false }));
		} else {
			const newUser = new User({ name, score: 0 });
			newUser.save().then(() => {
				res.send(param({ isValid: true }));
			}).catch(er => res.status(500).send(er));
		}
	});
});

export default authenticateRouter;
