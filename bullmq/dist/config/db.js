"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDb = () => {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not set");
    }
    try {
        mongoose_1.default.connect(MONGO_URI);
        console.log("Connected to mongodb");
    }
    catch (error) {
        console.log(error);
        throw new Error("Error connecting to mongodb");
    }
};
exports.connectToDb = connectToDb;
