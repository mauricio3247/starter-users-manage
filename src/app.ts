import express from 'express';
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import errorHandler from '@core/error'
import bootRouter from './router'
const app = express();
app.use(helmet())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
bootRouter(app)
app.use(errorHandler.error404)
app.use(errorHandler.errorGeneral)

export default app;