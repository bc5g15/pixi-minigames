
app.stage.interactive = true;

const fontSize = HEIGHT/10;

const basicText = new PIXI.Text('', {fill: 0xFFFFFF,
    fontSize: fontSize+'px'});

const SPEED = 250

basicText.x = WIDTH/2;
basicText.y = HEIGHT/2;

const t2 = new PIXI.Text('', {align: "center", fill: 0xFFFFFF, 
    fontFamily: "\"Lucida Console\", Monaco, monospace",
fontSize: fontSize+'px'});
t2.x = WIDTH/2;
t2.y = (HEIGHT/2) + 50;

app.stage.addChild(basicText);
app.stage.addChild(t2);

app.renderer.plugins.interaction.on('pointerdown', ()=>slowWrite('PUZZLE COMPLETE', t2));

function slowWrite(str, textobj)
{
   let i = 0;
    textobj.text = "";
    t2.anchor.set(0.5);
    const fun = () => {
        textobj.text = textobj.text + str[i];
        i++;
        if(i<str.length)
        {
            setTimeout(() => {
                fun()}, SPEED);
        }

    }
    fun();
}
