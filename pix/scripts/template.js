//Aliases
const Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache;

let app = new Application({
    width:256,
    height:256,
    antialias: true,
    transparent: false,
    resolution: 1
});

document.body.appendChild(app.view);

//Any variables that need to exist across functions
let state;

let imagepath = "";
loader.add(imagepath).load(setup);

function setup()
{
    state = play;
    
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta)
{
    // Do anything general to all states

    // Call the current state
    state(delta);
}

function play(delta)
{
    // Do stuff exclusive to the play state
}
