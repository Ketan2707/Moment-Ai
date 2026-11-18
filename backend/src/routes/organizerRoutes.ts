import { Router, Request, Response } from 'express';
import { db } from '../state/db';

export const organizerRoutes = Router();

organizerRoutes.get('/:eventId/analytics', (_req: Request, res: Response) => {
  const analytics = db.getOrganizerAnalytics();
  res.json({ analytics });
});

organizerRoutes.post('/:eventId/activity', (req: Request, res: Response) => {
  const { title, zoneId, timeSlot, capacity, isSponsored, sponsorName, sponsorReward } = req.body;
  const newActivity = {
    id: `act-${Date.now()}`,
    eventId: db.event.id,
    zoneId: zoneId || 'z-photo',
    title: title || 'New Interactive Zone Session',
    description: 'Organizer flash activity',
    timeSlot: timeSlot || 'Live Now',
    icon: 'Sparkles',
    capacity: Number(capacity) || 50,
    currentCount: 1,
    isSponsored: Boolean(isSponsored),
    sponsorName,
    sponsorReward,
  };

  db.event.activities.push(newActivity);
  res.json({ success: true, activity: newActivity });
});
