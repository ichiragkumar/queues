import { Queue } from 'bullmq';
import { connection } from '../queue';

export const reportQueue = new Queue('report-queue', { connection });

export const addReportJob = async (reportId: string, email: string) => {
  await reportQueue.add('generate-report', { reportId, email });
};
