import express from 'express';
import { addWelcomeEmailJob } from '../jobs/email.queue';
import { User } from '../models/user.model';
import { addReportJob } from '../jobs/report.queue';
import { Report } from '../models/report.model';
const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { name, email } = req.body;

  const user = await User.create({ name, email });

  // Queue the welcome email
  await addWelcomeEmailJob(email);

  res.status(201).json({ message: 'User created', user });
});


router.post('/generate-report', async (req, res) => {
  const { email } = req.body;

  const newReport = await Report.create({ userEmail: email });

  await addReportJob(newReport._id.toString(), email);

  res.status(202).json({ message: 'Report generation started', reportId: newReport._id });
});

router.get('/report-status/:id', async (req, res): Promise<any> => {
  const report = await Report.findById(req.params.id);
  if (!report) return res.status(404).json({ message: 'Report not found' });
  res.json(report);
});


export default router;
