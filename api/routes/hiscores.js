import express from 'express';

const hiscoresRouter = express.Router();

hiscoresRouter.all('/', (req, res) => {
	console.log('/hiscores');
	console.log(req.body);
	console.log(req.query);
	res.send();
});

export default hiscoresRouter;
