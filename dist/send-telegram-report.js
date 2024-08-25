"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const resultsDir = "./allure-results";
async function sendTelegramNotification() {
    const reportFiles = fs_1.default
        .readdirSync(resultsDir)
        .filter((file) => file.endsWith("-result.json"));
    const totalScenarios = reportFiles.length;
    let totalPassed = 0;
    let totalFailed = 0;
    let totalDuration = 0;
    for (const file of reportFiles) {
        const filePath = path_1.default.join(resultsDir, file);
        const content = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        totalDuration += content.stop - content.start;
        if (content.status === "passed") {
            totalPassed += 1;
        }
        else if (content.status === "failed") {
            totalFailed += 1;
        }
    }
    const durationInSeconds = (totalDuration / 1000).toFixed(2);
    const passedPercentage = ((totalPassed / totalScenarios) * 100).toFixed(2);
    const successMessage = fs_1.default.existsSync("success_message.txt")
        ? fs_1.default.readFileSync("success_message.txt", "utf-8")
        : "";
    const failureMessage = fs_1.default.existsSync("failure_message.txt")
        ? fs_1.default.readFileSync("failure_message.txt", "utf-8")
        : "";
    const messagePrefix = successMessage || failureMessage;
    const message = `
    ${messagePrefix}
    📝 *Test Report*:
    - Total scenarios: ${totalScenarios}
    - Passed: ${totalPassed} (${passedPercentage}%)
    - Failed: ${totalFailed}
    - Duration: ${durationInSeconds} seconds

    [View Full Report](https://ovlasova1705.github.io/AutomatedTests/)
  `;
    await axios_1.default.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
    });
}
sendTelegramNotification().catch(console.error);
