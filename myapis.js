const WebSocket = require('ws');

const users = {};
const viewed = {};
const solved = {};

const history = [];

const done = {'done': true};

function getUser(ip)
{
    if(ip in users)
    {
        return users[ip];
    } else {
        return ip;
    }
}
exports.getUser = getUser;

function registerUsername(ip, body)
{
    users[ip] = body.name;
    broadcast(`${ip} set name to ${body.name}`);
    return {'username': body.name};
}
exports.registerUsername = registerUsername;

function registerViewed(ip, body)
{
    broadcast(`${getUser(ip)} has viewed ${body.puzzleId}`);
    if(!(body.puzzleId in viewed))
    {
        broadcast(`${getUser(ip)} was the first to view ${body.puzzleId}`);
        viewed[body.puzzleId] = ip;
    }
    return done
}
exports.registerViewed = registerViewed;

function registerSolved(ip, body)
{
    broadcast(`${getUser(ip)} has solved ${body.puzzleId}`);
    const id =  body.puzzleId;
    if(id in solved)
    {
        solved[id].add(ip);
        broadcast(`${getUser(ip)} was not the first`);
    } else {
        solved[id] = new Set([ip]);
        broadcast(`${getUser(ip)} was the first to solve ${id}`);
    }
    return done;
}
exports.registerSolved = registerSolved;

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
    console.log("New Connection");
    ws.send(JSON.stringify(
        history
    ));
});

function broadcast(message)
{
    console.log("WS: " + message);
    history.push(message);
    const msg = JSON.stringify([message]);
    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
}
