const app = new PIXI.Application({
    antialias: true,
    transparent: false,
    resolution: 1,
    color: 0x111111});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

const WIDTH = app.renderer.view.width;
const HEIGHT = app.renderer.view.height;
