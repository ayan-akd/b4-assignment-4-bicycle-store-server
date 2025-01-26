/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/modules/bicycle/bicycle.route';
import { OrderRoutes } from './app/modules/orders/order.route';
import config from './app/config';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import { AuthRoutes } from './app/modules/auth/auth.route';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [config.local_client as string, config.client as string],
    credentials: true,
  }),
);

app.use('/api', BicycleRoutes);
app.use('/api', OrderRoutes);
app.use('/api/', AuthRoutes);
app.use('/api/', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server Is Running');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
