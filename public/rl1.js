const id = 'rotary-lock-1';
RegisterView(id);
const RECT = 0;
const CIRC = 1;

const buttons = new PIXI.Container();
const lights = new PIXI.Container();

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

/*
 * Puzzle 2 - 8 lights
 */

const bc = new PIXI.Container();
const lc = new PIXI.Container(); 

const POS = 27
const LFactor = 3;

const lightData = {
    0: {x:-POS, y:-POS/LFactor},
    1: {x:-POS/LFactor, y:-POS},
    2: {x:POS/LFactor, y:-POS},
    3: {x:POS, y:-POS/LFactor},
    4: {x:POS, y:POS/LFactor},
    5: {x:POS/LFactor, y:POS},
    6: {x:-POS/LFactor, y:POS},
    7: {x:-POS, y:POS/LFactor}
}
const light_r = 9;

/*
const arrow = PIXI.Texture.from('images/up_48.png');
arrow.x = 100; arrow.y = 100;
app.stage.addChild(arrow)


const arrowPositions = [
    {x:-POS, y:0, r:0},
    {x:0, y:-POS, r:(Math.PI)/2},
    {x:POS, y:0, r:(Math.PI)},
    {x:0, y:POS, r:(Math.PI)*1.5}
];

for(let a of arrowPositions)
{
    const arr = new PIXI.Sprite(arrow);
    arr.anchor.set(0.5);
    arr.x = a.x;
    arr.y = a.y;
    arr.rotation = a.r;
    lc.addChild(arr);
}

*/
const BSIZE = 8;
const buttonData = [
    {x: -BSIZE, y: -BSIZE, n: 0, on:false, graph:null},
    {x: 0, y:-BSIZE, n:4},
    {x: BSIZE, y: -BSIZE, n: 1, on:false},
    {x: BSIZE, y: 0, n:5},
    {x:-BSIZE, y:BSIZE, n:2, on:false},
    {x: 0, y:BSIZE, n:6},
    {x:BSIZE, y:BSIZE, n:3, on:false},
    {x:-BSIZE, y:0, n:7}
];

const b_width = 6;
const b_height = 6;

const b_line = 0x564aff;
const b_press = 0x261e9c;

const l_onColour = 0x4df062;
const l_offColour = 0x306134;
const l_wrong = 0xff0000

function draw(i, fill, ROS)
{
    let g = i.graph;
    g.clear();
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

const LIGHT_NUM = buttonData.length;

function onComplete()
{
    /*
     * Add some pretty animation
     * and indication that the puzzle 
     * is successfully done
     * May also need some communication
     * with the server
     */
    console.log("Puzzle complete!");
    FinalScreen(app, id);
}

let prev_choice = -1;

function buttonPress(num)
{
    lightData[num].on = true;
    if(prev_choice === -1 || num === (prev_choice+1)%LIGHT_NUM)
    {
        let l = lightData[num];
        //l.on = !l.on;
        let col = (l.on ? l_onColour : l_offColour);
        draw(l, col, CIRC);
        prev_choice = num;
        // Check for completion
        if(buttonData.every((b) => b.on))
        {
            // Complete the puzzle
            onComplete();
        }
    }
    else
    {
        // Wrong guess
        // Reset the buttons and lights
        for(let b of buttonData) {b.graph.interactive = false;}
        for(let n in lightData)
        {
            if(lightData[n].on)
            {
                let g = lightData[n].graph;
                g.clear();
                draw(lightData[n], l_wrong, CIRC);
            }
        }
        setTimeout(() =>{
            buttonData.map(resetButton);
            for(let n in lightData) {resetLight(lightData[n]);}
            prev_choice = -1;
        }, 500);
    }
}

function resetLight(l)
{
    let g = l.graph;
    l.on = false;
    g.clear();
    draw(l, l_offColour, CIRC);
}

function resetButton(b)
{
    let g = b.graph;
    b.on = false;
    g.clear();
    draw(b, b_line, RECT);
    g.interactive = true;
}

function initButtons(btns, container)
{
    for (let b of btns)
    {
        b.on = false;
        b.graph = new PIXI.Graphics();
        b.graph.x = b.x; b.graph.y = b.y;
        draw(b, b_line, RECT);
        b.graph.interactive = true;
        b.graph.buttonMode = true;
        let tapFun = () => {
            b.on = !b.on;
            let col = (b.on ? b_press : b_line);
            draw(b, col, RECT);
            //b.graph.off('pointertap', tapFun);
            b.graph.interactive=false;
            buttonPress(b.n)
        }
        b.graph
            .on('pointertap', tapFun);
        container.addChild(b.graph);
    }
}

function initLights(lights, container)
{
    for(let n in lights)
    {
        let l = lights[n];
        l.on = false;
        l.graph = new PIXI.Graphics();
        l.graph.x = l.x; l.graph.y = l.y;
        draw(l, l_offColour, CIRC);
        container.addChild(l.graph);
    }
}

let style = {fill: 0xFFFFEE}


initButtons(buttonData, bc);
initLights(lightData, lc);

EvenSplit(WIDTH, HEIGHT, lc, bc);
app.stage.addChild(bc);
app.stage.addChild(lc);

