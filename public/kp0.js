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
const id = 'keypad-0';
RegisterView(id);

const buttons = new PIXI.Container();
const display = new PIXI.Container();

const codeLen = 4;
const testCode = [1,9,8,4];
let code = [];

const dw = 7;

let displayData = [];

const buttonData = [
    {x: 0, y: 0, n: 5},
    {x: -dw, y: 0, n: 4},
    {x:dw, y:0, n:6},
    {x:-dw, y:dw, n:1},
    {x:0, y:dw, n:2},
    {x:dw, y:dw, n:3},
    {x:-dw, y:(2*dw), n:-1}, // Backspace
    {x:0, y:(2*dw), n:0},
    {x:dw, y:(2*dw), n:-2}, // Submit
    {x:-dw, y:-dw, n:7},
    {x:0, y:-dw, n:8},
    {x:dw, y:-dw, n:9}
];

const b_width = 6;
const b_height = 6;

const b_line = 0x564aff;
const b_press = 0x261e9c;

const l_onColour = 0x4df062;
const l_offColour = 0x000000;
const c_wrong = 0xff0000;
const c_right = 0x00ff00;

let curIndex = 0;

function draw(i, fill)
{
    let g = i.graph;
    g.clear();
    g.beginFill(fill);
    g.drawRect(-b_width/2, -b_height/2, b_width, b_height);
    g.endFill();
}


function backspace()
{ 
    if(curIndex > 0)
    {
        code.pop();
        displayData[curIndex-1].text.text = "";
        curIndex--;
    }
} 

function match(arr1, arr2)
{
    for(let i = 0; i<arr1.length; i++)
    {
        if(arr1[i] !== arr2[i])
        {
            return false;
        }
    }
    return true;
}


function submit() 
{
    // disable all input
    for(let b of buttonData)
    {
        b.graph.interactive = false;
    }

    //Is the code right?
    if(match(code, testCode))
    {
        console.log("Right");
        for(let d of displayData)
        {
            boxDraw(d.graph, c_right, fontSize);
        }
        FinalScreen(app, id); 
    }
    else
    {
        console.log("Wrong");
        code = [];
        for(let d of displayData)
        {
            boxDraw(d.graph, c_wrong, fontSize);
            d.text.text = " ";
            curIndex = 0;
        }
        setTimeout(() => {
            for(let b of buttonData){b.graph.interactive = true;}
            for(let d of displayData){boxDraw(d.graph, 0, fontSize);}
        }, 500);
    }
}

function addDigit(num)
{
    if(curIndex < codeLen)
    {
        code.push(num);
        displayData[curIndex].text.text = num;
        curIndex++;
    }
}

function buttonPress(num)
{
    console.log("Pressed: " + num);
    if(num===-1)
    {
        backspace();
    }
    else if(num===-2)
    {
        submit();
    }
    else
    {
        addDigit(num);
    }
}


function initButtons(btns, container)
{
    for (let b of btns)
    {
        b.graph = new PIXI.Graphics();
        b.graph.x = b.x; b.graph.y = b.y;
        draw(b, b_line);
        b.graph.interactive = true;
        b.graph.buttonMode = true;
        b.graph
            .on('pointertap', ()=>
                {
                    buttonPress(b.n)
                }); 
        container.addChild(b.graph);
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

initButtons(buttonData, buttons);

//app.stage.addChild(basicText);
//app.stage.addChild(myWidth);
//app.stage.addChild(myHeight);

//EvenSplit(WIDTH, HEIGHT, lc, bc);
buttons.x = WIDTH/2;
buttons.y = HEIGHT * (3/5);
adjustScale(buttons, WIDTH, HEIGHT *(3/5));
app.stage.addChild(buttons);

const fontSize = b_height * buttons.scale.y;
function addTextOverlay(container, button, scale)
{
    let txt;
    if(button.n === -1)
    {
        txt = new PIXI.Text("BACK", {fontSize:(fontSize/3)+"px"});
    }
    else if(button.n === -2)
    {
        txt = new PIXI.Text("SUBMIT", {fontSize:(fontSize/4)+"px"});
    }
    else
    {
        txt = new PIXI.Text(button.n, {fontSize:fontSize+"px"});
    }
    txt.anchor.set(0.5);
    txt.x = button.x * scale;
    txt.y = button.y * scale;
    container.addChild(txt);
}

// Try adding fonts
let overlay = new PIXI.Container();
overlay.x = buttons.x;
overlay.y = buttons.y;
const scale = buttons.scale.x;
buttonData.map((btn) => addTextOverlay(overlay, btn, scale));
//let txt = new PIXI.Text("5", {fontSize:font+"px", fontFill:0xFFFFFF});
//txt.x = 0; txt.y = 0;
//txt.anchor.set(0.5);
//overlay.addChild(txt);

app.stage.addChild(overlay);

// Quick draw boxes
function boxDraw(graphics, fill, size)
{
    let g = graphics;
    g.clear();
    g.lineStyle(5, b_line, 1, 1);
    g.beginFill(fill);
    g.drawRect(-(size/2), -(size/2), size ,size);
    g.endFill();
}

// Add boxes
function drawDisplay(container, codeLength, size)
{
    const gap = 1;
    //const g = new PIXI.Graphics();
    //g.lineStyle(5, b_line, 1, 1);

    let output = [];

    const tempC = new PIXI.Container();
    for(let i = 0; i<codeLength; i++)
    {
        let cx = (size*i) + (gap*i);
        let g = new PIXI.Graphics();
        g.x = cx; g.y = 0;
        boxDraw(g, 0, size);
        tempC.addChild(g);

        const txt = new PIXI.Text("", {fill: 0xFFFFFF, fontSize:size});
        txt.anchor.set(0.5);
        txt.x = cx; txt.y = 0;
        tempC.addChild(txt);
        output.push({graph: g, text: txt});
    }

    //Move the whole thing
    tempC.x = -(((size * (codeLength-1)) + (gap * (codeLength-1)))/2);
    container.addChild(tempC);
    return output;
}

displayData = drawDisplay(display, codeLen, fontSize);
display.x = WIDTH/2;
display.y = HEIGHT * (1/5);
app.stage.addChild(display);

