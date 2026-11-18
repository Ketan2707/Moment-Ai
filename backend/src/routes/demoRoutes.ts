import { Router, Request, Response } from 'express';
import { db } from '../state/db';

export const demoRoutes = Router();

demoRoutes.post('/reset', (_req: Request, res: Response) => {
  db.resetToDemo();
  res.json({
    success: true,
    message: 'Demo state reset to initial TechFest 2026 conditions.',
    event: db.event,
    currentUser: db.currentUser,
  });
});

demoRoutes.get('/state', (_req: Request, res: Response) => {
  res.json({
    currentUser: db.currentUser,
    intent: db.currentUserIntent,
    activeMoment: db.activeMoment,
    memories: db.memories,
    waves: db.waves,
  });
});
