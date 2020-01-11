# Pixi Mini-games

This is a small demonstration of what can be done with pixi and node. All puzzles are designed to be run on a phone web browser. but will work on desktop machines as well. 

This was built and run on a raspberry pi over a LAN.

## Prerequisites
Have `node.js` and `npm` installed on the target machine.

## Install

1. Clone the repository
1. Run `npm ci` to add the `ws` package

## Running

1. Run `node serv.js`
1. When you see the "Started" message the server is ready to handle requests
1. Navigate to the ip address of the server in a web browser at port 8080 to connect.
    - E.G. `http://127.0.0.1:8080`

## Current Elements

- `./`

The Debug page is at the root. This provides links to each puzzle, the dashboard and the naming page.

- `./dash`

The dashboard. This creates a websocket link with the server to update each time a puzzle is finished.

- `./reg`

Name registration. Will associate an IP with a provided username.

## Puzzle Types

### Keypad
A 10-digit keypad with an enter and backspace. Will clear the puzzle when the correct number is entered.

### Drag-path
Drag the circle along the path to clear the puzzle.

### Rotary lock
Press the buttons so all the lights light up to clear the puzzle.

### Slide level
Get all the level markers into the desired spots to clear the puzzle.
