// import httpServer from 'http';
const httpServer = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = httpServer.createServer();

server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let path = req.url.replace('/', '');
    console.log({path});

    // check if path contains a '/', if so check if the first part of the path is a directory
    if(path.indexOf('assets') > -1 && (path.indexOf('.css') > -1)) {

        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(fs.readFileSync(`${path}`, 'utf8'));
        res.end();
    } else if(path.indexOf('functionality') > -1 && (path.indexOf('.js') > -1)) {

        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(fs.readFileSync(`${path}`, 'utf8'));
        res.end();
    } else if(path === '' || path === 'index') {

        res.write(fs.readFileSync(`index.html`, 'utf8'));
        res.end();
    } else if(fs.existsSync(`${path}.html`)) {

        res.write(fs.readFileSync(`${path}.html`, 'utf8'));
        res.end();
    } else if(fs.existsSync(`${path}/index.html`)) {

        res.write(fs.readFileSync(`${path}/index.html`, 'utf8'))
        res.end();
    } else if(path.indexOf('/') > -1 && checkForPathExistence(path, path.split('/'))) {

        res.write(fs.readFileSync(`${path}.html`, 'utf8'));
        res.end();
    } else {

        res.write(fs.readFileSync('404.html'));
        res.end();
    }
});

server.on('error', (err) => {
    console.log({err});
});


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


const checkForPathExistence = (requestedPath, paths, currPath='') => {
    let exist = false;
    let arrayCount = paths.length

    console.log({requestedPath, paths, currPath, arrayCount});

    if (arrayCount === 0) {
        if (fs.existsSync(`${path}.html`) || fs.existsSync(`${path}/index.html`)) {
            return !exist;
        }
        return exist;
    }

    for (i = 0; i < paths.length; i++) {
        let path = currPath != "" ? `${currPath}/${paths[i]}` : paths[i];
        paths.shift()

        if (fs.existsSync(`${path}`)) {
            if (fs.existsSync(`${path}.html`)) {
                exist = true;
                break;
            } else {
                checkForPathExistence(requestedPath, paths, path);
            }

        } else {
            break;
        }
    }

    return exist;
}