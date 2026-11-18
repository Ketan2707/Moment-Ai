import { Router, Request, Response } from 'express';
import { db } from '../state/db';
import { formGroupChemistry } from '../ai/groupService';
import { generateMomentPlan, replanActiveMoment } from '../ai/momentPlanner';
import { getRandomConversationRescue } from '../ai/conversationService';
import { generateMomentMemory } from '../ai/memoryService';

export const momentRoutes = Router();

momentRoutes.get('/active', (_req: Request, res: Response) => {
  res.json({ activeMoment: db.activeMoment });
});

momentRoutes.post('/build', async (req: Request, res: Response) => {
  // Group: Ketan + Rahul + Priya + Ananya
  const members = [
    db.currentUser,
    ...db.radarPeople.filter((p) => ['u-rahul', 'u-priya', 'u-ananya'].includes(p.id)),
  ];

  const groupChemistry = await formGroupChemistry(
    members,
    Object.values(db.simulatedIntents)
  );

  const plan = await generateMomentPlan({
    members,
    sharedInterests: groupChemistry.sharedInterests,
    totalTimeMinutes: 43,
  });

  db.activeMoment = plan;

  res.json({
    success: true,
    groupChemistry,
    moment: plan,
  });
});

momentRoutes.post('/:id/replan', async (req: Request, res: Response) => {
  if (!db.activeMoment) {
    return res.status(404).json({ error: 'No active moment found' });
  }

  const replanned = await replanActiveMoment(
    db.activeMoment,
    'Gaming zone is crowded right now'
  );
  db.activeMoment = replanned;

  res.json({
    success: true,
    message: 'Moment replanned successfully',
    moment: replanned,
  });
});

momentRoutes.get('/:id/rescue', async (_req: Request, res: Response) => {
  const interests = db.activeMoment?.sharedInterests || ['Photography', 'Music', 'Food'];
  const rescue = await getRandomConversationRescue(interests);
  res.json({
    success: true,
    rescue,
  });
});

momentRoutes.post('/:id/challenge/complete', (req: Request, res: Response) => {
  if (!db.activeMoment) {
    return res.status(404).json({ error: 'No active moment' });
  }

  db.activeMoment.challenge.completed = true;
  db.activeMoment.challenge.completedAt = new Date().toISOString();
  db.currentUser.xp += db.activeMoment.challenge.rewardXP;
  db.currentUser.stats.challengesCount += 1;

  res.json({
    success: true,
    challenge: db.activeMoment.challenge,
    userXp: db.currentUser.xp,
  });
});

momentRoutes.post('/:id/complete', async (req: Request, res: Response) => {
  if (!db.activeMoment) {
    return res.status(404).json({ error: 'No active moment' });
  }

  const memory = await generateMomentMemory(db.activeMoment);
  db.memories.unshift(memory);

  // Update user stats
  db.currentUser.stats.momentsCount += 1;
  db.currentUser.xp += 300;

  db.activeMoment = null;

  res.json({
    success: true,
    memory,
  });
});
