import { Router, Request, Response } from 'express';
import { db } from '../state/db';

export const radarRoutes = Router();

radarRoutes.get('/', (req: Request, res: Response) => {
  const filter = (req.query.filter as string) || 'People';
  const people = db.getRadarUsers(filter);
  res.json({
    users: people,
    activeZone: db.simulatedZones[db.currentUser.id] || 'Photography Zone',
    ghostMode: db.currentUser.ghostMode || false,
    currentUser: db.currentUser,
  });
});

radarRoutes.post('/ghost-mode', (req: Request, res: Response) => {
  const { enabled } = req.body;
  db.currentUser.ghostMode = Boolean(enabled);
  res.json({
    success: true,
    ghostMode: db.currentUser.ghostMode,
  });
});
