"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
function findResultFile(dir) {
    const files = fs_1.default.readdirSync(dir);
    const resultFile = files.find((file) => file.endsWith("-result.json"));
    if (!resultFile) {
        throw new Error("Result file not found");
    }
    return path_1.default.join(dir, resultFile);
}
const resultsDir = "./allure-results";
function parseTestResults(reportPath) {
    const report = JSON.parse(fs_1.default.readFileSync(reportPath, "utf8"));
    const totalScenarios = 1;
    const totalPassed = report.status === "passed" ? 1 : 0;
    const duration = report.duration;
    return {
        totalScenarios,
        totalPassed,
        duration,
        passedPercentage: ((totalPassed / totalScenarios) * 100).toFixed(2),
    };
}
async function sendTelegramNotification(results) {
    const message = `
    Results:
    Duration: ${new Date(results.duration).toISOString().substr(11, 8)}
    Total scenarios: ${results.totalScenarios}
    Total passed: ${results.totalPassed} (${results.passedPercentage}%)
    Report available at the link: https://ovlasova1705.github.io/AutomatedTests/
    `;
    const response = await axios_1.default.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
    });
    return response.data;
}
async function main() {
    try {
        const reportPath = findResultFile(resultsDir);
        const results = parseTestResults(reportPath);
        await sendTelegramNotification(results);
    }
    catch (error) {
        console.error("Error processing test results:", error);
    }
}
main().catch(console.error);
main().catch(console.error);
