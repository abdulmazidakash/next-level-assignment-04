import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { AuthRoutes } from './modules/Auth/auth.route';
import { mealRoutes } from './modules/Meal/meal.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/v1', router);
app.use('/api/v1/auth', AuthRoutes);

app.use('/api/meals', mealRoutes)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello from FoodHub World!');
});

export default app;
