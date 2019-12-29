import express from 'express';
import param from 'jquery-param';
import User from '../Models/User';

const authenticateRouter = express.Router();

const storeUser = (user, ip) => {
	userMap.set(user.toLowerCase(), ip);
}

const getUserIp = user => userMap.get(user.toLowerCase());

authenticateRouter.post('/', (req, res) => {
	const { name } = req.body;
	const ip = req.ip;

	User.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i')} }, (err, user) => {
		if (err) res.status(500).send(err);
		else if (user) {
			res.send(param({ isValid: user.ip === ip }));
		} else {
			const newUser = new User({ name, ip, score: 0 });
			newUser.save().then(() => {
				res.send(param({ isValid: true }));
			}).catch(er => res.status(500).send(er));
		}
	});
});

export default authenticateRouter;
