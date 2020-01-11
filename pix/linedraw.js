const app = new PIXI.Application({ antialias: true});
document.body.appendChild(app.view);

const path = new PIXI.Graphics();
path.lineStyle(2, 0xFFFFFF, 1);
path.moveTo(0, 0);
path.lineTo(100, 200);
path.lineTo(200, 200);
path.lineTo(240, 100);

app.stage.addChild(path);

