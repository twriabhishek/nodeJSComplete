const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Get IP address
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Get browser name
  const userAgent = req.headers["user-agent"];
  const browserName = userAgent;
  

  // Log the IP address, browser name, and current time
  const log = `Browser Name: ${browserName}, IP Address: ${ipAddress}, Path: ${req.url}, Time: ${new Date().toISOString()}\n`;

  fs.appendFile("log.txt", log, (err) => {
    if (err) {
        console.error('Error writing to log file:', err);
    }
    res.end('Hello From Server Again');
  });
});

server.listen(8023, () => {
  console.log("Server is listening on port 8023");
});
