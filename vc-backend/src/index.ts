import express from 'express';
import cors from 'cors';
import petRoutes from './routes/pet.routes';
import userRoutes from './routes/user.routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', petRoutes);
app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('Backend on http://localhost:3000');
});

app.get('/', (req, res) => res.status(204).end());