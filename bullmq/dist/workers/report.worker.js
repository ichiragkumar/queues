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
const report_model_1 = require("../models/report.model");
const db_1 = require("../config/db");
(0, db_1.connectToDb)();
const reportWorker = new bullmq_1.Worker('report-queue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    const { reportId, email } = job.data;
    console.log(`🛠️ Generating report for ${email}...`);
    yield new Promise(resolve => setTimeout(resolve, 2000));
    const result = `Report data for ${email} at ${new Date().toISOString()}`;
    yield report_model_1.Report.findByIdAndUpdate(reportId, {
        status: 'completed',
        result,
        completedAt: new Date(),
    });
    console.log(`✅ Report ready for ${email}`);
}), { connection: queue_1.connection });
reportWorker.on('failed', (job, err) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.error('❌ Job failed:', err);
    if ((_a = job === null || job === void 0 ? void 0 : job.data) === null || _a === void 0 ? void 0 : _a.reportId) {
        yield report_model_1.Report.findByIdAndUpdate(job.data.reportId, {
            status: 'failed',
            result: err.message,
            completedAt: new Date(),
        });
    }
}));
