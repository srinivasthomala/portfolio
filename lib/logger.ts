import fs from "fs";
import path from "path";

export class Logger {
  private static logFile = path.join(process.cwd(), "logs", "abuse.log");

  static async logAbusiveAttempt(ip: string, type: string, reason: string) {
    if (process.env.NODE_ENV === "production") {
      const entry = {
        ip,
        type,
        reason,
        timestamp: new Date().toISOString(),
      };

      // Ensure logs directory exists
      const logsDir = path.join(process.cwd(), "logs");
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
      }

      // Append to log file
      const logEntry = JSON.stringify(entry) + "\n";
      await fs.promises.appendFile(this.logFile, logEntry);
    }
  }
}
