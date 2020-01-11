const app = new PIXI.Application({ antialias: true});
document.body.appendChild(app.view);

app.stage.interactive = true;
const basicText = new PIXI.Text('Basic Text', {fill: 0xFFFFFF});
basicText.x = 100;
basicText.y = 100;
app.stage.addChild(basicText);

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

function onClick()
{
    const circle = new PIXI.Graphics();
    circle.beginFill(Math.random() * 0x11FFFF, 1);
    let rad = Math.max(app.renderer.view.width, app.renderer.view.height);
    let x = app.renderer.view.width/2;
    let y = app.renderer.view.height/2;
    //console.log(x, y);
    circle.drawCircle(0, 0, 8);
    //circle.anchor.set(100, 100);
    circle.endFill();
    circle.x = x;
    circle.y = y;
    app.stage.addChild(circle);

    let i = 0;
    let myFun = () => {
        circle.scale.x += 1;
        circle.scale.y += 1;
        i += 1;
        if(i>x/4)
        {
            console.log("Stop");
            app.ticker.remove(myFun);
        }
    }
    app.ticker.add(myFun);
        //console.log(circle.scale);
    
}

app.renderer.plugins.interaction.on('pointerdown', onClick);
