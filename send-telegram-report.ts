import fs from "fs";
import path from "path";
import axios from "axios";

interface TestResult {
  status: string;
  duration: number;
}

function findResultFile(dir: string): string {
  const files = fs.readdirSync(dir);
  const resultFile = files.find((file) => file.endsWith("-result.json"));
  if (!resultFile) {
    throw new Error("Result file not found");
  }
  return path.join(dir, resultFile);
}

const resultsDir = "./allure-results";

function parseTestResults(reportPath: string) {
  const report: TestResult = JSON.parse(fs.readFileSync(reportPath, "utf8"));

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

async function sendTelegramNotification(
  results: ReturnType<typeof parseTestResults>
) {
  const message = `
    Results:
    Duration: ${new Date(results.duration).toISOString().substr(11, 8)}
    Total scenarios: ${results.totalScenarios}
    Total passed: ${results.totalPassed} (${results.passedPercentage}%)
    Report available at the link: https://ovlasova1705.github.io/AutomatedTests/
    `;

  const response = await axios.post(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
    }
  );

  return response.data;
}

async function main() {
  try {
    const reportPath = findResultFile(resultsDir);
    const results = parseTestResults(reportPath);
    await sendTelegramNotification(results);
  } catch (error) {
    console.error("Error processing test results:", error);
  }
}

main().catch(console.error);

main().catch(console.error);
