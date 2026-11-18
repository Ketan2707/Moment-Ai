import { Router, Request, Response } from 'express';
import { db } from '../state/db';
import { v4 as uuidv4 } from 'uuid';
import { Wave } from '@moment/types';

export const waveRoutes = Router();

waveRoutes.get('/', (_req: Request, res: Response) => {
  res.json({ waves: db.waves });
});

waveRoutes.post('/', (req: Request, res: Response) => {
  const { receiverId } = req.body;
  if (!receiverId) {
    return res.status(400).json({ error: 'receiverId is required' });
  }

  // Create outgoing wave
  const newWave: Wave = {
    id: uuidv4(),
    senderId: db.currentUser.id,
    receiverId,
    eventId: db.event.id,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  db.waves.push(newWave);

  // In demo mode, Rahul (or other simulated user) waves back automatically!
  setTimeout(() => {
    newWave.status = 'accepted';
    db.mutualConnectionCreated = true;
  }, 1200);

  res.json({
    success: true,
    message: 'Wave sent 👋',
    wave: newWave,
  });
});

waveRoutes.post('/:id/respond', (req: Request, res: Response) => {
  const { action } = req.body; // 'accept' or 'decline'
  const wave = db.waves.find((w) => w.id === req.params.id);

  if (!wave) {
    return res.status(404).json({ error: 'Wave not found' });
  }

  wave.status = action === 'accept' ? 'accepted' : 'declined';
  if (wave.status === 'accepted') {
    db.mutualConnectionCreated = true;
  }

  res.json({
    success: true,
    wave,
  });
});
