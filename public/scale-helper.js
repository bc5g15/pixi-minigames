function EvenSplit(width, height, c1, c2)
{
    let xBound, yBound;
    if(width>height)
    {
        c1.x = width/4;
        c2.x = width * (3/4);
        c1.y = c2.y = height/2;
        xBound = width/2;
        yBound = height;
    }
    else
    {
        c1.x = c2.x = width/2;
        c1.y = height/4;
        c2.y = height * (3/4);
        xBound = width;
        yBound = height/2;
    }
    adjustScale(c1, xBound, yBound);
    adjustScale(c2, xBound, yBound);
}

function adjustScale(container, xBound, yBound)
{
    let scaleVal = 1;
    let xmax = xBound / container.width;
    let ymax = yBound / container.height;
    scaleVal = Math.min(xmax, ymax);
    scaleVal *= 0.8;

    container.scale.x = container.scale.y = scaleVal;
}
