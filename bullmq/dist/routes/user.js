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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const email_queue_1 = require("../jobs/email.queue");
const user_model_1 = require("../models/user.model");
const report_queue_1 = require("../jobs/report.queue");
const report_model_1 = require("../models/report.model");
const router = express_1.default.Router();
router.post('/send-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const user = yield user_model_1.User.create({ name, email });
    // Queue the welcome email
    yield (0, email_queue_1.addWelcomeEmailJob)(email);
    res.status(201).json({ message: 'User created', user });
}));
router.post('/generate-report', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const newReport = yield report_model_1.Report.create({ userEmail: email });
    yield (0, report_queue_1.addReportJob)(newReport._id.toString(), email);
    res.status(202).json({ message: 'Report generation started', reportId: newReport._id });
}));
router.get('/report-status/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const report = yield report_model_1.Report.findById(req.params.id);
    if (!report)
        return res.status(404).json({ message: 'Report not found' });
    res.json(report);
}));
exports.default = router;
