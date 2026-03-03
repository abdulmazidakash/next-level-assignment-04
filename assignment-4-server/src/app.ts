import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import { notFound } from './middlewares/notFound';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parsers
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from FoodHub World!');
});

// not found route
app.use(notFound);

export default app;
