const circle = new PIXI.Graphics();

circle.lineStyle(2, 0xFEEB77, 1);
circle.beginFill(0x650A5A, 1);
circle.drawCircle(0, 0, 50);
circle.endFill();

circle.boundsPadding = 0;
//circle.anchor.set(0.5);

circle.interactive = true;
circle.buttonMode = true;

//circle.on('pointerdown', onClick);

circle
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);


let path = [[100, 100], [400, 100]];

let path2 = [
    {x:100, y:100},
    {x:400, y:100},
    {x:400, y:300},
    {x:100, y:300}
]
circle.x = path2[0].x;
circle.y = path2[0].y;

//Draw the path
//const pth = new PIXI.Graphics();
//move to first point
//pth.lineStyle(2, 0xFFFFFF, 1);
//pth.moveTo(path[0][0], path[0][1]);
//pth.lineTo(path[1][0], path[1][1]);
//pth.lineTo(200, 200);
//app.stage.addChild(pth);

const group = new PIXI.Container()

//const ln = new PIXI.Graphics();
function drawPath(path, container)
{
    const ln = new PIXI.Graphics();
    ln.lineStyle(7, 0xFFFFFF, 1);
    for(i=1; i<path.length; i++)
    {
        ln.moveTo(path[i-1].x, path[i-1].y);
        ln.lineTo(path[i].x, path[i].y);
    }
    container.addChild(ln);
}

drawPath(path2, group);

//Hopefully layer the circle on top
group.addChild(circle);
adjustScale(group, WIDTH, HEIGHT);
app.stage.addChild(group);

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

function lerp(a, b, t)
{
   return (a*(1-t)) + (b*t);
}

function distance(x1, y1, x2, y2)
{
    return Math.abs(x2-x1) + Math.abs(y2-y1);
}
function nodeDistance(n1, n2) { return distance(n1.x, n1.y, n2.x, n2.y); }


let curStart=0;
let curEnd=1;

/*
 * Adjustment:
 * Consider a and b,
 * if a-b = line_length then we are at 1
 * if a-b = -line_length then we are at 0
 * use that to create a ratio
 */
function onDragMove()
{
    if (this.dragging)
    {
        let startNode = path2[curStart];
        let endNode = path2[curEnd];
        const playerPos = this.data.getLocalPosition(this.parent);
        //this.x = newPosition.x;
        //this.y = newPosition.y;
        //Check newposition as a proximity along a line
        let a = nodeDistance(playerPos, startNode);
        let b = nodeDistance(playerPos, endNode);
        let check = nodeDistance(startNode, endNode);
        let ll = a-b;
        let ratio = ((ll/check)/2)+0.5;
        //console.log(r2, "A: " + a, "B: " + b, "CHECK: " + check);
        //a = (a<check ? a : check);
        //b = (b<check ? b : check);
        //let ratio = a/(a+b);
        //console.log(ratio);
        //let near = [newPosition.x-path[0][0], newPosition.y-path[0][1]]
        //let whole = [near[0] +
        this.x = lerp(startNode.x, endNode.x, ratio);
        this.y = lerp(startNode.y, endNode.y, ratio);

        if(ratio===1)
        {
            if(curEnd < path2.length-1)
            {
                curEnd++;
                curStart++;
            }
            else
            {
                // On Completion...
                console.log("Complete!");
            }
        }
        else if(ratio===0)
        {
            if(curStart > 0)
            {
                curEnd--;
                curStart--;
            }
        }
    }
}

function onWin()
{
    // Disable input handles
    // Turn circle green over time
    // Activate finish screen
}
