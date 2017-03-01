import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import api from './routes';

import morgan from 'morgan';

const app = express();
const port = 8080;

app.use(morgan('dev'));
app.use(bodyParser.json());

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('Connected to mongodb server');
});
mongoose.connect('mongodb://jhson:wjdgh0754522@ds143449.mlab.com:43449/board');

app.use('/', express.static(path.join(__dirname, '../../public')));

app.use('/api', api);

app.listen(port, () => {
    console.log('API Server is running on port ', port);
});
