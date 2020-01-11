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

const WIDTH = app.renderer.view.width;
const HEIGHT = app.renderer.view.height;

const RECT = 0;
const CIRC = 1;

const buttons = new PIXI.Container();
const lights = new PIXI.Container();

const lightData = {
    0: {x:-6, y:0, on:false, graph:null},
    1: {x:6, y:0, on:false, graph:null}
}

const light_r = 6;

const buttonData = [
    {x: -4, y: 0, n: 0, on:false, graph:null},
    {x: 4, y: 0, n: 1, on:false}
];

const b_width = 6;
const b_height = 6;

const b_line = 0x564aff;
const b_press = 0x261e9c;

const l_onColour = 0x4df062;
const l_offColour = 0x000000;
const l_wrong = 0xff0000

function draw(i, lineStyle, fill, ROS)
{
    let g = i.graph;
    g.clear();
    g.lineStyle(lineStyle.thickness, lineStyle.colour, 1);
    g.beginFill(fill);
    if(ROS === RECT)
    {
        //g.drawRect(0, 0, b_width, b_height);
        g.drawRect(-b_width/2, -b_height/2, b_width, b_height);
        //console.log(-b_width/2, b_width/2);
    }
    else
    {
        g.drawCircle(0, 0, light_r);
    }
    g.endFill();
}

function buttonPress(num)
{
    let l = lightData[num];
    l.on = !l.on;
    let col = (l.on ? l_onColour : l_offColour);
    draw(l, {thickness:1, colour: l_onColour}, col, CIRC);
}

function initButtons(btns, container)
{
    for (let b of btns)
    {
        b.graph = new PIXI.Graphics();
        b.graph.x = b.x; b.graph.y = b.y;
        draw(b, b_line, b_line, RECT);
        b.graph.interactive = true;
        b.graph.buttonMode = true;
        b.graph
            .on('pointertap', ()=>
                {
                    buttonPress(b.n)
                    b.on = !b.on;
                    let col = (b.on ? b_press : b_line);
                    draw(b, {thickness:0, colour:0}, col, RECT);
                }); 
        container.addChild(b.graph);
    }
}

function initLights(lights, container)
{
    for(let n in lights)
    {
        let l = lights[n];
        l.graph = new PIXI.Graphics();
        l.graph.x = l.x; l.graph.y = l.y;
        draw(l, {thickness:1, colour:l_onColour}, l_offColour, CIRC);
        container.addChild(l.graph);
    }
}

let style = {fill: 0xFFFFEE}

const basicText = new PIXI.Text("This is my basic text", style);
basicText.x = 50;
basicText.y = 100;

const myWidth = new PIXI.Text("Width: " + app.renderer.view.width, style);
const myHeight = new PIXI.Text("Height: " + app.renderer.view.height, style);
myWidth.x = myHeight.x = 100;
myWidth.y = 130;
myHeight.y = 160;

const bc = new PIXI.Container();
const lc = new PIXI.Container(); 

initButtons(buttonData, bc);
initLights(lightData, lc);

//app.stage.addChild(basicText);
app.stage.addChild(myWidth);
app.stage.addChild(myHeight);

EvenSplit(WIDTH, HEIGHT, lc, bc);

app.stage.addChild(bc);
app.stage.addChild(lc);

const arrow = PIXI.Sprite.from('images/up_18.png');
arrow.x = 100; arrow.y = 100;
app.stage.addChild(arrow);

const biga = PIXI.Sprite.from('images/up_48.png');
biga.x = 200; biga.y = 200;
app.stage.addChild(biga);
