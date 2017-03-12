import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import api from './routes';
import config from '../../config';

import morgan from 'morgan';

const app = express();
const port = 8080;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.set('jwt-secret', config.secret);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('Connected to mongodb server');
});
mongoose.connect(config.mongodbUri);

app.use('/', express.static(path.join(__dirname, '../../public')));

app.use('/api', api);

app.listen(port, () => {
    console.log('API Server is running on port ', port);
});
