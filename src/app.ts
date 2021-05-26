import express from 'express';
import 'reflect-metadata';
import createConnection from './database';
import { router } from './routes';
import cors from 'cors';

createConnection();
const app = express();

const allowedOrigins = ['*'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());
app.use(router);

export { app };

