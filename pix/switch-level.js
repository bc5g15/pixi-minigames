//const app = new PIXI.Application({
//    antialias: true,
//    transparent: false,
//    resolution: 1,
//    color: 0x111111});

//app.renderer.view.style.position = "absolute";
//app.renderer.view.style.display = "block";
//app.renderer.autoDensity = true;
//app.renderer.resize(window.innerWidth, window.innerHeight);

//document.body.appendChild(app.view);

//const WIDTH = app.renderer.view.width;
//const HEIGHT = app.renderer.view.height;

const RECT = 0;
const CIRC = 1;

const buttons = new PIXI.Container();
const lights = new PIXI.Container();

const c_back = 0x555555;
const c_front = 0xff7700;

const ranges = [
    {x:0, y:0, low:3, high: 5}
];

const MAX_HEIGHT = 10;

let scaleData = [];

const buttonData = [
    {x: -4, y: 0, v: [2] },
    {x: 4, y: 0, v: [4] }
];

const b_width = 6;
const b_height = 6;

const b_line = 0x564aff;
const b_press = 0x00ff00;

const l_onColour = 0x4df062;
const l_offColour = 0x000000;
const l_wrong = 0xff0000

const c_correct_off = 0xdb5353;
const c_correct_on = 0x00ff00;

// Format : {obj, a, b, t}
const anim = [];

function draw(i, lineStyle, fill, ROS)
{
    let g = i.graph;
    g.clear();
    g.lineStyle(lineStyle.thickness, lineStyle.colour, 1, 1);
    g.beginFill(fill);
    if(ROS === RECT)
    {
        //g.drawRect(0, 0, b_width, b_height);
        g.drawRect(-b_width/2, -b_height/2, b_width, b_height);
        //console.log(-b_width/2, b_width/2);
    }
    g.endFill();
}

function lerp(a, b, t) { return (a * (1-t)) + (b*t); }

function smoothLerp(a, b, t)
{
    return lerp(a, b, Math.sin(t*(Math.PI/2)));
}

function buttonPress(btn)
{
    for(let i = 0; i<ranges.length; i++)
    {
    let num = (btn.on ? btn.v[i] : -btn.v[i]);
    ranges[i].val += num;
    startMove(ranges[i]);
    }
}

function startMove(range)
{
    drawRange(range, c_correct_off);
    range.moving = true;
    range.cur = 0;
    range.start = range.graph.y;
    range.end = -range.val;
}

function moveTick(delta)
{
    for(let r of ranges)
    {
        if(r.moving)
        {
            r.cur += (delta * (1/30));
            if(r.cur >= 1)
            {
                r.cur = 1;
                r.moving = false;
                if(r.val>= r.low && r.val <= r.high)
                { drawRange(r, c_correct_on);}
            }
            
            r.graph.y = smoothLerp(
                r.start, r.end, r.cur);
        }
    }
}

function drawRange(range, colour)
{
    range.correct.clear();
    range.correct.beginFill(colour);
    range.correct.drawRect(-(1/2), -range.low, 1,
        -(range.high-range.low));
    range.correct.endFill();
}

function initScale(range, container)
{
    let output = {};
    // Set state
    range.moving = false;
    range.cur = 0;
    range.start = 0;
    range.end = 0;
    range.val = 0;
    
    const tempC = new PIXI.Container();
    const backdrop = new PIXI.Graphics();
    const small_width = 1;
    const large_width = 1;
    const pointer_width = 3;
    const pointer_height = 0.5;
    backdrop.x = 0;
    backdrop.y = 0;
    tempC.x = 0;
    tempC.y = MAX_HEIGHT/2;
    //Draw rectangle
    backdrop.clear();
    backdrop.beginFill(c_back);
    backdrop.drawRect(-(small_width)/2, 0, small_width, -MAX_HEIGHT);
    backdrop.endFill();
    // Draw correct area
    const correct = new PIXI.Graphics();
    range.correct = correct;
    drawRange(range, c_correct_off);

    // Add moveable handle
    let handle = new PIXI.Graphics();
    handle.beginFill(0xFF0000);
    handle.drawRect(-(pointer_width/2), -(pointer_height/2),
        pointer_width, pointer_height);
    
    range.graph = handle;
    //container.height = MAX_HEIGHT;
    tempC.addChild(backdrop);
    tempC.addChild(correct);
    tempC.addChild(handle);
    //tempC.height = MAX_HEIGHT;
    //container.addChild(backdrop);
    container.addChild(tempC);
    container.height = MAX_HEIGHT;
}

function initButtons(btns, container)
{
    for (let b of btns)
    {
        b.on = false;
        b.graph = new PIXI.Graphics();
        b.graph.x = b.x; b.graph.y = b.y;
        draw(b, b_line, b_line, RECT);
        b.graph.interactive = true;
        b.graph.buttonMode = true;
        b.graph
            .on('pointertap', ()=>
                {
                    b.on = !b.on;
                    buttonPress(b)
                    let col = (b.on ? b_press : b_line);
                    draw(b, {thickness:0, colour:0}, col, RECT);
                }); 
        container.addChild(b.graph);
    }
}

let style = {fill: 0xFFFFEE}

const myWidth = new PIXI.Text("Width: " + app.renderer.view.width, style);
const myHeight = new PIXI.Text("Height: " + app.renderer.view.height, style);
myWidth.x = myHeight.x = 100;
myWidth.y = 130;
myHeight.y = 160;

const bc = new PIXI.Container();
const lc = new PIXI.Container(); 
const sc = new PIXI.Container();

initButtons(buttonData, bc);
//console.log(bc.height, bc.width);
//initLights(lightData, lc);
ranges.map((r) => initScale(r, sc));

//app.stage.addChild(basicText);
app.stage.addChild(myWidth);
app.stage.addChild(myHeight);

EvenSplit(WIDTH, HEIGHT, sc, bc);

app.stage.addChild(bc);
app.stage.addChild(sc);

app.ticker.add(moveTick);
