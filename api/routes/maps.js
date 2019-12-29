import express from 'express';
import param from 'jquery-param';
import builder from 'xmlbuilder';
import MapModel from '../Models/Map';

const mapsRouter = express.Router();

mapsRouter.all('/', (req, res) => {
	console.log('/maps');
	const { page, sort, letter, id } = req.body;

	if (id !== undefined) {
		MapModel.findOne({ puzzleId: id }, (err, map) => {
			if (err) res.status(500).send(err);
			else if (map) {
				const mapXml = builder.create('root')
					.ele('map', {
						id: map.puzzleId,
						d: map.date,
						dr: map.difficulty,
						pr: map.popularity.rating,
					});
				mapXml.ele('author', {}, map.author);
				mapXml.ele('title', {}, map.title);
				mapXml.ele('de', {}, map.description);
				mapXml.ele('mapdata', {}, map.mapdata);

				res.send(mapXml.end({ pretty: true }));
			} else {
				res.status(404).send('map not found');
			}
		});
	} else {
		const sendMaps = (err, maps) => {
			if (err) res.status(500).send(err);
			else {
				const mapsXml = builder.create('root')
					.ele('maps', { total: maps.length, page: 0 });
				for (let i=page * 10; i<(page + 1)*10; i++) {
					const m = maps[i];
					if (m !== undefined) {
						const mapXml = mapsXml.ele(`map${i}`, {
							id: m.puzzleId,
							d: m.date,
							dr: m.difficulty,
							pr: m.popularity.rating,
						});
						mapXml.ele('author', {}, m.author);
						mapXml.ele('title', {}, m.title);
					}
				}
				res.send(mapsXml.end({ pretty: true }));
			}
		}
		// Only author and title user letter
		switch (sort) {
			case 'date':
				MapModel.find({}).sort({ date: 'desc' }).exec(sendMaps);
				break;
			case 'author':
				MapModel.find({ author: { $regex: new RegExp(`^${letter}`, 'i') } }).sort({ author: 'asc' }).exec(sendMaps);
				break;
			case 'title':
				MapModel.find({ title: { $regex: new RegExp(`^${letter}`, 'i') } }).sort({ title: 'asc' }).exec(sendMaps);
				break;
			case 'difficulty':
				MapModel.find({}).sort({ difficulty: 'desc' }).exec(sendMaps);
				break;
			case 'popularity':
				MapModel.find({}).sort({ 'popularity.rating	': 'desc' }).exec(sendMaps);
				break;
			case 'random':
				function shuffle(array) {
				  var currentIndex = array.length, temporaryValue, randomIndex;

				  // While there remain elements to shuffle...
				  while (0 !== currentIndex) {

				    // Pick a remaining element...
				    randomIndex = Math.floor(Math.random() * currentIndex);
				    currentIndex -= 1;

				    // And swap it with the current element.
				    temporaryValue = array[currentIndex];
				    array[currentIndex] = array[randomIndex];
				    array[randomIndex] = temporaryValue;
				  }

				  return array;
				}
				MapModel.find({}).limit(10).exec((err, maps) => {
					shuffle(maps);
					sendMaps(err, maps);
				})
				break;
		}
	}

});

export default mapsRouter;
