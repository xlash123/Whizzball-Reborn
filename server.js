import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import apiRouter from './api/routes/api';

mongoose.connect('mongodb://localhost/whizzball', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log('Connected to MongoDB');
}).catch(err => console.error('error connecting to MongoDB:', err));

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.use('/', express.static('src'));

app.listen(port, () => console.log(`Server started on port ${port}`));