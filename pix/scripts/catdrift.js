const Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache;

let app = new Application({width: 256, height: 256,
    antialias: true, transparent: false,
    resolution:1});

//Add the canvas to the HTML document
document.body.appendChild(app.view);

//PIXI.loader
//    .add("images/cat.png")
//    .load(setup);

loader.add('../images/tileset.png').load(setup);

let cat, state;

//This setup function will run when the image has loaded
function setup()
{
    // Create the cat sprite
    //let cat = new Sprite(resources["images/cat.png"].texture);
    let texture = TextureCache["../images/tileset.png"];

    let rectangle = new Rectangle(0,0,64,64);
    texture.frame = rectangle;
    //Set the position
    //cat.x = 96;
    //cat.y = 96;

    cat = new Sprite(texture);
    cat.x = 32;
    cat.y = 32;

    state = play_state;
    app.stage.addChild(cat);

    //Add the cat to the stage
    //app.stage.addChild(cat);
    
    //app.renderer.render(app.stage);
    app.ticker.add(delta => gameLoop(delta));
}

// Set the game state

function gameLoop(delta)
{
    //Set the cat's velocity
    //Apply velocity values to the movement
    state(delta);
}

function play_state(delta)
{
    cat.vx = 1;
    cat.x += cat.vx * delta;
}

//console.log("Hello there?");
