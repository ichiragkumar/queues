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
exports.addReportJob = exports.reportQueue = void 0;
const bullmq_1 = require("bullmq");
const queue_1 = require("../queue");
exports.reportQueue = new bullmq_1.Queue('report-queue', { connection: queue_1.connection });
const addReportJob = (reportId, email) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.reportQueue.add('generate-report', { reportId, email });
});
exports.addReportJob = addReportJob;
