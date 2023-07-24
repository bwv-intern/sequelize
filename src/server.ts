import express, {Application, Request, Response} from 'express';
import sequelize from './core/connection';
import dotenv from 'dotenv';
import expressEjsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import errorHandler from './core/middlewares/errorHandler.middleware';
import router from './routers/index';
import * as moment from 'moment-timezone';
import favicon from 'serve-favicon';

moment.tz.setDefault('Asia/Tokyo');

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.set('views', `${__dirname}/../views`);
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('layout extractScripts', true);
app.set('layout', 'layout/defaultLayout');
app.use(favicon(`${__dirname}/../public/favicon.ico`));
app.use(bodyParser.json({limit: '50mb'}));
app.use(
  bodyParser.urlencoded({extended: true, limit: '50mb', parameterLimit: 10000}),
);

app.use(
  session({
    secret: <string>process.env.SESSION_SECRET || 'session_secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
  }),
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${port}/`,
  });
});

app.use(cookieParser());

app.use(express.static(`${__dirname}/../public`));
app.use(router);
app.use(errorHandler);
app.set('trust proxy', true);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
