"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const mongoose_1 = require("mongoose");
const reportSchema = new mongoose_1.Schema({
    userEmail: String,
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    result: String,
    startedAt: { type: Date, default: Date.now },
    completedAt: Date,
});
exports.Report = (0, mongoose_1.model)('Report', reportSchema);
