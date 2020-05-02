import express, { Application } from 'express';
process.env['NODE_CONFIG_DIR'] = __dirname + '/config';
import config from 'config';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import mongodb from 'mongodb';

const logger = require('./middlewares/logger');
const debug = require('debug')('app:startup');
const courses = require('./routes/courses');
const home = require('./routes/home');
import { router as userRoutes } from './routes/users';
import { router as authRoutes } from './routes/auth';
// const users = require('./routes/users');

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(helmet());
app.use('/', home);
app.use('/api/courses', courses);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use(logger);

// Configuration
// console.log('App name: ' + config.get('name'));
// console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

process.env['jwtPrivateKey'] = 'asd';
// if (!config.get('jwtPrivateKey')) {
//   // set app_jwtPrivateKey=asdads
//   // console.error('FATAL ERROR: jwtPrivateKey is not defined');
//   // process.exit(1);
// }

mongoose
  .connect('mongodb://localhost/courses', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Connected to MongoDB...');
  })
  .catch((err: mongodb.MongoError) => console.error('Count not connect to MongoDB..', err));

app.listen(port, () => console.log(`Listening on port ${port}...`));
