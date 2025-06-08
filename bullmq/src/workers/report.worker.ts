import { Worker } from 'bullmq';
import { connection } from '../queue';
import { Report } from '../models/report.model';
import { connectToDb } from '../config/db';


const reportWorker = new Worker(
  'report-queue',
  async job => {
    const { reportId, email } = job.data;

    console.log(`🛠️ Generating report for ${email}...`);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = `Report data for ${email} at ${new Date().toISOString()}`;

    await Report.findByIdAndUpdate(
      reportId,
      {
        status: 'completed',
        result,
        completedAt: new Date(),
      }
    );

    console.log(`✅ Report ready for ${email}`);
  },
  { connection }
);

reportWorker.on('failed', async (job, err) => {
  console.error('❌ Job failed:', err);
  if (job?.data?.reportId) {
    await Report.findByIdAndUpdate(
      job.data.reportId,
      {
        status: 'failed',
        result: err.message,
        completedAt: new Date(),
      }
    );
  }
});
