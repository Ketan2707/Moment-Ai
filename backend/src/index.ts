import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { eventRoutes } from './routes/eventRoutes';
import { radarRoutes } from './routes/radarRoutes';
import { waveRoutes } from './routes/waveRoutes';
import { momentRoutes } from './routes/momentRoutes';
import { memoryRoutes } from './routes/memoryRoutes';
import { liveMomentRoutes } from './routes/liveMomentRoutes';
import { organizerRoutes } from './routes/organizerRoutes';
import { demoRoutes } from './routes/demoRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/radar', radarRoutes);
app.use('/api/waves', waveRoutes);
app.use('/api/moments', momentRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/live-moments', liveMomentRoutes);
app.use('/api/organizer', organizerRoutes);
app.use('/api/demo', demoRoutes);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'MOMENT Platform Backend',
    version: '1.0.0',
    time: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`[MOMENT Backend] Server running on http://localhost:${port}`);
});
