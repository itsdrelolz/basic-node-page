const http = require('http'); 
const fs = require('fs')
const url = require('url')
const port = process.env.process || 8080; 


const server = http.createServer((req, res) => { 
    const query = url.parse(req.url, true); 
    const filename = query.pathname === '/' ? './index.html' : '.' + query.pathname; // if local host default is run, we serve index.html 
    
    fs.readFile(filename, (err, data) => { 
        if (err) {
            fs.readFile('./404.html', (_, errorFileData) => {
                res.statusCode = 404; 
                res.setHeader('Content-Type', 'text/html');
                res.end(errorFileData);
            });
            return; 
        }
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'text/html');
    res.end(data)
})});

server.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})