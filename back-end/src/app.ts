import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import router from './routers';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandlerMiddleware);

export default app;
