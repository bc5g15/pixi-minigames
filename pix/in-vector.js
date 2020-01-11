const app = new PIXI.Application({
    antialias: true,
    transparent: false,
    resolution: 1,
    color: 0x111111});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
//DEPRECATED - app.renderer.autoResize = true;
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

let style = {fill: 0xFFFFEE}

const basicText = new PIXI.Text("This is my basic text", style);
basicText.x = 50;
basicText.y = 100;

const myWidth = new PIXI.Text("Width: " + app.renderer.view.width, style);
const myHeight = new PIXI.Text("Height: " + app.renderer.view.height, style);
myWidth.x = myHeight.x = 100;
myWidth.y = 130;
myHeight.y = 160;

app.stage.addChild(basicText);
app.stage.addChild(myWidth);
app.stage.addChild(myHeight);


//Checking the mouse trajectory vector
