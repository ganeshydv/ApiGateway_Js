const bunyan = require('bunyan');

// Define the logger configuration
const logger = bunyan.createLogger({
  name: 'Gateway', // Set the logger name
  streams: [
    {
      level: 'info', // Set the log level (info, warn, error, etc.)
      // stream: process.stdout, // Log to the console,
      path: 'app/logs/info.json', // Path to info log file
    },
    {
      level: 'error', // Log error messages to a separate file
      path: 'app/logs/error.log', // Path to error log file 
    },
    {
      type: 'rotating-file',
      path: 'app/logs/app1.json',
      period: '1d',   // Daily rotation
      count: 3,       // Keep 3 rotated log files
    },
  ],
});

module.exports.logger = logger;

// Use a custom stream to log each request as an array in the JSON file
module.exports.CustomFileStream=class CustomFileStream {
  write(rec) {
    const logEntry = JSON.stringify(rec);
    const logFile = 'app/logs/app.json';

    // Create an array if the file doesn't exist or is empty
    let logArray = [];
    try {
      const existingLogs = fs.readFileSync(logFile, 'utf8');
      logArray = JSON.parse(existingLogs);
    } catch (error) {
      // File doesn't exist or is empty
    }

    // Append the log entry to the array
    logArray.push(JSON.parse(logEntry));

    // Write the updated array back to the file
    fs.writeFileSync(logFile, JSON.stringify(logArray, null, 2) + '\n', 'utf8');
  }
}
