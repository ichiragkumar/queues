import { Queue } from 'bullmq';
import { connection } from '../queue';

export const emailQueue = new Queue('email-queue', { connection });

export const addWelcomeEmailJob = async (email: string) => {
  await emailQueue.add('send-welcome-email', { email });
};


