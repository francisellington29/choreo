const http = require('http');
const fs = require('fs');
const exec = require("child_process").exec;
const subtxt = '.npm/sub.txt'
const PORT = process.env.PORT || 3000;

// Run start.sh
fs.chmod("start.sh", 0o777, (err) => {
    if (err) {
        console.error(`start.sh empowerment failed: ${err}`);
        return;
    }
    console.log(`start.sh empowerment successful`);
    const child = exec('bash start.sh');
    child.stdout.on('data', (data) => {
        console.log(data);
    });
    child.stderr.on('data', (data) => {
        console.error(data);
    });
    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        console.clear()
        console.log(`App is running`);
    });
});

// create HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
        <html>
            <head>
            <title>Welcome to nginx!</title>
            <style>
            html { color-scheme: light dark; }
            body { width: 35em; margin: 0 auto;
            font-family: Tahoma, Verdana, Arial, sans-serif; }
            </style>
            </head>
            <body>
            <h1>Welcome to nginx!</h1>
            <p>If you see this page, the nginx web server is successfully installed and
            working. Further configuration is required.</p>

            <p>For online documentation and support please refer to
            <a href="http://nginx.org/">nginx.org</a>.<br/>
            Commercial support is available at
            <a href="http://nginx.com/">nginx.com</a>.</p>

            <p><em>Thank you for using nginx.</em></p>
            </body>
        </html>
        `);
    }
    // get-sub
    if (req.url === '/sub') {
        fs.readFile(subtxt, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error reading sub.txt' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(data);
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});