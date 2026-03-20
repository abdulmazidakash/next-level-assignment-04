import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import { notFound } from './middlewares/notFound';
import cookieParser from 'cookie-parser';

const app: Application = express();

// 🔥 IMPORTANT for Vercel
app.set("trust proxy", 1);

// parsers
app.use(cookieParser());
app.use(express.json());

// ✅ FIXED CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://assignment-4-server-pi.vercel.app"
  ],
  credentials: true
}));

// routes
app.use('/api', router);

// root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from FoodHub World! 🚀');
});

// not found
app.use(notFound);

export default app;