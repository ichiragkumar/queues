import { Worker} from "bullmq"; 

import {connection} from "../queue";

const emailWorker = new Worker("email-queue",async (job)=>{
    const {email} = job.data;

    console.log(`Sending welcome email to ${email}`);

    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Sent welcome email to ${email}`);
}, {connection});


emailWorker.on('completed', job => {
    console.log(`Job ${job.id} completed`);
});


emailWorker.on('failed', (job, err) => {
    console.log(`Job ${job?.id} failed`);
});

