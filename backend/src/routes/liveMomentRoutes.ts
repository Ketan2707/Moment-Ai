import { Router, Request, Response } from 'express';
import { db } from '../state/db';
import { v4 as uuidv4 } from 'uuid';
import { LiveMoment } from '@moment/types';

export const liveMomentRoutes = Router();

liveMomentRoutes.get('/', (_req: Request, res: Response) => {
  res.json({ liveMoments: db.liveMoments });
});

liveMomentRoutes.post('/', (req: Request, res: Response) => {
  const { title, category, approximateZone, targetCount } = req.body;
  const newMoment: LiveMoment = {
    id: uuidv4(),
    creatorId: db.currentUser.id,
    creatorName: db.currentUser.name,
    creatorAvatar: db.currentUser.avatar,
    title: title || 'Quick hangout',
    category: category || 'Social',
    approximateZone: approximateZone || 'Photography Zone',
    targetCount: Number(targetCount) || 3,
    currentCount: 1,
    expiresInMinutes: 30,
    participants: [db.currentUser.name],
  };

  db.liveMoments.unshift(newMoment);
  res.json({ success: true, liveMoment: newMoment });
});

liveMomentRoutes.post('/:id/join', (req: Request, res: Response) => {
  const moment = db.liveMoments.find((m) => m.id === req.params.id);
  if (!moment) {
    return res.status(404).json({ error: 'Live moment not found' });
  }

  if (!moment.participants.includes(db.currentUser.name)) {
    moment.participants.push(db.currentUser.name);
    moment.currentCount = moment.participants.length;
  }

  res.json({ success: true, liveMoment: moment });
});
