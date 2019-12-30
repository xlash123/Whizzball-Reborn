import express from 'express';
import builder from 'xmlbuilder';
import User from '../Models/User';

const hiscoresRouter = express.Router();

hiscoresRouter.all('/', (req, res) => {
	const { page } = req.body;

	User.find({}).sort({ score: 'desc' }).limit(100).exec((err, users) => {
		if (err) res.status(500).send(err);
		else {
			const usersXml = builder.create('root')
				.ele('users');
			users.forEach((user) => {
				const userXml = usersXml.ele('user');
				userXml.ele('name', {}, user.name);
				userXml.ele('score', {}, user.score);
			});
			res.send(usersXml.end({ pretty: true }));
		}
	});
});

export default hiscoresRouter;
