import express from 'express';
import 'reflect-metadata';
import createConnection from './database';
import { router } from './routes';
import cors from 'cors';

createConnection();
const app = express();

// const allowedOrigins = ['http://localhost:3000'];

// const options: cors.CorsOptions = {
//   origin: allowedOrigins
// };

app.use(cors());
app.use(express.json());
app.use(router);

export { app };

