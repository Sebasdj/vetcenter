import express from 'express';
import cors from 'cors';
import petRoutes from './routes/pet.routes';
import userRoutes from './routes/user.routes';

import cookieParser from 'cookie-parser';

import './connection_status'

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/api', petRoutes);
app.use('/api', userRoutes);



app.listen(3000, () => {
  console.log('Backend on http://localhost:3000');
});

app.get('/', (req, res) => res.status(204).end());