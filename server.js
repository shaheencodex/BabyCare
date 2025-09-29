const http = require("http");
const fs = require("fs");
const path = require("path");

// Content type mapping
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.url}`);

  // Default to index.html
  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(err.code === "ENOENT" ? 404 : 500, {
        "Content-Type": "text/html",
      });
      res.end(
        `<h1>${
          err.code === "ENOENT" ? "404 - File Not Found" : "500 - Server Error"
        }</h1>`
      );
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
