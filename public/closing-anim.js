function close_lerp(a, b, t)
{
    return (a*(1-t))+(b*t);
}

function close_slerp(a, b, t)
{
    return lerp(a,b,Math.sin(t*(Math.PI/2)));
}

function circleWipe(root, onDone)
{
   const circle = new PIXI.Graphics();
   circle.beginFill(Math.random() * 0xFFFFFF, 1);
    const rad = Math.max(WIDTH, HEIGHT);
    const x = WIDTH/2;
    const y = HEIGHT/2;

    circle.drawCircle(0, 0, 8);
    circle.endFill();
    circle.x = x;
    circle.y = y;
    root.stage.addChild(circle);

    let i = 0;
    const scaleUp = (delta) => {
        const sv = close_lerp(1, rad/4, i);
        circle.scale.x = sv;
        circle.scale.y = sv;
        i += delta * (1/60);
        if(i>1)
        {
            root.ticker.remove(scaleUp);
            onDone()
        } 
    }
    root.ticker.add(scaleUp);
}

function multiText(root, texts)
{
    const SPEED = 100;
    const fontSize = WIDTH/10;
    const style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: fontSize + 'px',
        fontFamily: "\"Lucida Console\", Monaco, monospace",
        strokeThickness: 1
    });
    const tobj = [];
    const cont = new PIXI.Container();
    for(let i = 0; i<texts.length; i++)
    {
        const t = new PIXI.Text('', style); 
        t.anchor.set(0.5);
        t.x = 0;
        t.y = (fontSize+1)*i;
        cont.addChild(t);
        tobj.push(t);
    }

    root.stage.addChild(cont);
    cont.x = WIDTH/2;
    cont.y = HEIGHT*(1/4);
    
    let i = 0;
    let n = 0;
    const slowLoop = (n) => {
        if(n<texts.length)
        {       
            tobj[n].text = tobj[n].text + texts[n][i];
            i++;
            if(i<texts[n].length)
            {
                setTimeout(() => slowLoop(n), SPEED);
            }
            else
            {
                i = 0;
                n++;
                setTimeout(() => slowLoop(n), SPEED);
            }
        }
    }
    slowLoop(n);
}
function slowText(root, text)
{
    const SPEED = 200;
    const fontSize = WIDTH/10;
    const style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: fontSize + 'px',
        fontFamily: "\"Lucida Console\", Monaco, monospace",
        strokeThickness: 1
    });
    const txt = new PIXI.Text('', style);
    txt.x = WIDTH/2;
    txt.y = HEIGHT/2;
    root.stage.addChild(txt);

    let i = 0;
    const slowLoop = () => {
        txt.text = txt.text + text[i];
        i++;
        if(i<text.length)
            setTimeout(slowLoop, SPEED);
    }
    slowLoop();
}

function RegisterView(id)
{
    const URL = "./view";
    fetch(URL, {method: 'POST', body: JSON.stringify({puzzleId: id})})
        .then((res) => res.json())
        .then((json) => console.log(json));
}

function FinalScreen(root, id)
{
    // Send a message to the server
    const URL = "./solve";
    fetch(URL, {method: 'POST', body: JSON.stringify({puzzleId: id})})
        .then((res) => res.json())
        .then((json) => console.log(json));
    // With a small delay
    setTimeout(() => 
    circleWipe(root, () => multiText(root, ['PUZZLE', 'COMPLETE'])), 500);
}
