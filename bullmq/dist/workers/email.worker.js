"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const queue_1 = require("../queue");
const emailWorker = new bullmq_1.Worker("email-queue", (job) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = job.data;
    console.log(`Sending welcome email to ${email}`);
    yield new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Sent welcome email to ${email}`);
}), { connection: queue_1.connection });
emailWorker.on('completed', job => {
    console.log(`Job ${job.id} completed`);
});
emailWorker.on('failed', (job, err) => {
    console.log(`Job ${job === null || job === void 0 ? void 0 : job.id} failed`);
});
