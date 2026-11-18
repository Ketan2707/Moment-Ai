import { Router, Request, Response } from 'express';
import { db } from '../state/db';

export const memoryRoutes = Router();

memoryRoutes.get('/', (_req: Request, res: Response) => {
  res.json({ memories: db.memories });
});

memoryRoutes.post('/:id/squad', (req: Request, res: Response) => {
  const memory = db.memories.find((m) => m.id === req.params.id);
  if (!memory) {
    return res.status(404).json({ error: 'Memory not found' });
  }
  memory.squadCreated = true;
  res.json({
    success: true,
    message: 'Squad saved! Group chat & shared moments enabled.',
    memory,
  });
});
