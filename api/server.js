import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from 'config';
import path from 'path';
import apiRouter from './routes/api';

console.log('Connecting to', config.get('mongoUrl'));

mongoose.connect(config.get('mongoUrl'), { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log('Connected to MongoDB');
}).catch(err => console.error('error connecting to MongoDB:', err));

const app = express();
const port = config.get('port');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, 'src')));

app.listen(port, () => console.log(`Server started on port ${port}`));