const httpServer = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// creates the http server
const server = httpServer.createServer();

// listens to request made to the server
server.on('request', (req, res) => {
    // sets the response header content type to html
    res.writeHead(200, {'Content-Type': 'text/html'});
    let path = req.url.replace('/', ''); //gets the path to the files from the url, the first character is a '/' and is removed from the string

    if(path.indexOf('assets') > -1 && (path.indexOf('.css') > -1)) { // checks if the string 'assets' and '.css' is in the detected in the path
        // changes the response header content type to css to send over the css files for the html pages
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(fs.readFileSync(`${path}`, 'utf8'));
        res.end();
    } else if(path.indexOf('functionality') > -1 && (path.indexOf('.js') > -1)) { // checks if the string 'functionality' and '.js' is in the detected in the path

        // changes the response header content type to javascript to send over the javascript files for the html pages
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(fs.readFileSync(`${path}`, 'utf8'));
        res.end();
    } else if(path === '' || path === 'index') { // checks if the path is empty or index

        res.write(fs.readFileSync(`index.html`, 'utf8'));
        res.end();
    } else if(fs.existsSync(`${path}.html`)) { // checks if the file in the directory matches the path from the url

        res.write(fs.readFileSync(`${path}.html`, 'utf8'));
        res.end();
    } else if(fs.existsSync(`${path}/index.html`)) { // checks if a nested file within a directory matches the path from the url

        res.write(fs.readFileSync(`${path}/index.html`, 'utf8'))
        res.end();
    } else if(path.indexOf('/') > -1 && checkForPathExistence(path.split('/'))) { // checks if the path is nested and if the nested path exists

        res.write(fs.readFileSync(`${path}.html`, 'utf8'));
        res.end();
    } else { // if the path does not exist, send the 404 page

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


/**
 * Checks for the existence of a nested file in a given directory structure.
 *
 * @param {string} requestedPath - The requested path .
 * @param {string[]} paths - An array of strings that were splitted that would represent file or directory.
 * @param {string} [currPath=''] - The current path being evaluated (used for recursive calls).
 * @returns {boolean} - Returns true if the path exists, false otherwise.
 */
const checkForPathExistence = (paths, currPath='') => {
    let exist = false;
    let arrayCount = paths.length

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
                checkForPathExistence(paths, path);
            }

        } else {
            break;
        }
    }

    return exist;
}