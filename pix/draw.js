const app = new PIXI.Application({ antialias: true });
document.body.appendChild(app.view);

const circle = new PIXI.Graphics()

circle.lineStyle(2, 0xFEEB77, 1);
circle.beginFill(0x650A5A, 1);
circle.drawCircle(0, 0, 50);
circle.endFill();

circle.boundsPadding = 0;
//circle.anchor.set(0.5);

circle.interactive = true;
circle.buttonMode = true;

circle.x = 250;
circle.y = 250;
//circle.on('pointerdown', onClick);

circle
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

app.stage.addChild(circle);

function onClick()
{
    console.log("Clicked Circle");
}

function onDragStart(event)
{
    // Reference to data is because of multitouch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd()
{
    this.alpha = 1;
    this.dragging = false;
    // Set the interaction data to null
    this.data = null;
}

function onDragMove()
{
    if (this.dragging)
    {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}
