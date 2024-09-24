const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to serve static files
function serveStaticFile(res, filePath, contentType, responseCode = 200) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

const server = http.createServer((req, res) => {
    // Parsing URL
    let filePath = req.url === '/' ? '/index.html' : req.url;

    // Determine file extension and set the content type
    let ext = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm',
    };

    let contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Create different routes to handle HTTP methods
    if (req.method === 'GET') {
        // Serve static files
        serveStaticFile(res, path.join(__dirname, 'public', filePath), contentType);
    } else if (req.method === 'POST') {
        // Handle POST request (for demonstration)
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'POST data received', data: body }));
        });
    } else if (req.method === 'PUT') {
        // Handle PUT request (for demonstration)
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'PUT data received', data: body }));
        });
    } else if (req.method === 'DELETE') {
        // Handle DELETE request (for demonstration)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'DELETE request received' }));
    } else {
        // Method not allowed
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('405 - Method Not Allowed');
    }
});

// Server listening on port 3000
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
