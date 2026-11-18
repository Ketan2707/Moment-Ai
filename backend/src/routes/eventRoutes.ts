import { Router, Request, Response } from 'express';
import { db } from '../state/db';
import { analyzeUserIntent } from '../ai/intentService';

export const eventRoutes = Router();

eventRoutes.get('/', (_req: Request, res: Response) => {
  res.json({ events: [db.event] });
});

eventRoutes.get('/:id', (req: Request, res: Response) => {
  if (req.params.id === db.event.id) {
    res.json(db.event);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

eventRoutes.post('/:id/checkin', (req: Request, res: Response) => {
  const { qrCode, isDemo } = req.body;
  if (isDemo || qrCode === 'MOMENT_EVENT:techfest-2026' || qrCode === 'techfest-2026') {
    db.event.totalCheckedIn += 1;
    db.event.activeAttendees += 1;
    res.json({
      success: true,
      message: 'Checked into TechFest 2026!',
      event: db.event,
      user: db.currentUser,
    });
  } else {
    res.status(400).json({ error: 'Invalid QR code. Try Demo Check-in.' });
  }
});

eventRoutes.post('/intent', async (req: Request, res: Response) => {
  const { primaryIntent, timeAvailableMinutes, socialEnergy, interests } = req.body;

  db.currentUserIntent = {
    userId: db.currentUser.id,
    eventId: db.event.id,
    primaryIntent: primaryIntent || 'explore',
    timeAvailableMinutes: Number(timeAvailableMinutes) || 45,
    socialEnergy: socialEnergy || 'small_groups',
    interests: interests || ['Photography', 'Music', 'Coding'],
    timestamp: new Date().toISOString(),
  };

  const analysis = await analyzeUserIntent(db.currentUserIntent);

  res.json({
    success: true,
    intent: db.currentUserIntent,
    analysis,
  });
});
