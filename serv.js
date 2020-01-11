const http = require('http');
const fs = require('fs');
const url = require('url');
const myapis = require('./myapis');

const apis = {
    '/ruser': myapis.registerUsername,
    '/view' : myapis.registerViewed,
    '/solve' : myapis.registerSolved
};

const sites = {
    "/": "/debug.html",
    "/reg": "/setname.html",
    "/dash": "/ws-dash.html"
};

const users = {};
const redirects = {};

const puzzleIndex = './puzindex.html';

const puzzles = {
    '/1': 'kp0.js',
    '/2': 'sl0.js',
    '/3': 'dp0.js',
    '/4': 'rl0.js',
    '/kp1': 'kp1.js',
    '/rl1': 'rl1.js',
    '/sl1': 'sl1.js',
    '/sl2': 'sl2.js',
    '/dp1': 'dp1.js',
    '/dp2': 'dp2.js'
};

function sendPage(fname, type, response)
{
    fs.readFile("."+fname, (err, data) => {
        response.writeHead(200, {'Content-Type': type});
        response.end(data);});
}

console.log('Started');

const jsreg = RegExp('.*\.js');

http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    const ip = req.socket.remoteAddress;
    const path = q.pathname;
    if(jsreg.test(path))
    {
        sendPage(q.pathname, 'text/javascript', res);
        return;
    }

    if(path in apis)
    {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = JSON.parse(Buffer.concat(body).toString());
            res.end(JSON.stringify(apis[path](ip, body)));
            return;
        });
    }
    
    if(path in puzzles)
    {
        fs.readFile(puzzleIndex, {'encoding': 'utf8'}, (err, data) => {
            let output = data.replace(/{PUZZLE}/, "./public/" + puzzles[path]);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(output);
        });
        return;
    }

    if(path in sites)
    {
        // TODO: Validate login
        sendPage(sites[path], "text/html", res);
        return;
    }
}).listen(8080);
