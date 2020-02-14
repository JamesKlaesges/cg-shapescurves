class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        var color = [168, 78, 50, 100];
        var left_bot = {x:100, y:100};
        var right_top = {x:700, y:500};
        this.drawRectangle(left_bot, right_top, color, framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        var color = [66, 245, 129, 100];
        var center = {x:250, y:250};
        var radius = 100;
        this.drawCirle(center, radius, color, framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {

    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {

    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawRectangle(left_bottom, right_top, color, framebuffer) {
        var left_top = {x: left_bottom.x, y: right_top.y};
        var right_bot = {x: right_top.x, y: left_bottom.y};
        
        this.drawLine(left_bottom, right_bot, color, framebuffer);
        this.drawLine(right_bot, right_top, color, framebuffer);
        this.drawLine(right_top, left_top, color, framebuffer);
        this.drawLine(left_top, left_bottom, color, framebuffer);
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCirle(center, radius, color, framebuffer) {
        var current;
        var previous = {x: center.x + radius, y: center.y};
        var num_points = this.num_curve_sections;
        var angle = 360/num_points;
        var currentAngle = angle;
        var i;
        for (i=0; i<num_points+1; i++){
               current = {x: center.x + (radius * Math.cos(currentAngle)), y: center.y + (radius * Math.sin(currentAngle))};
               this.drawLine(previous, current, color, framebuffer);
               console.error('Plotting from x = ' + previous.x + ', y = ' + previous.y + ' to point x = ' + current.x + ', y = ' + current.y);
               console.error('Angle = ' + currentAngle);
                previous = current;
               currentAngle = currentAngle + angle;
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer) {
        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawLine(pt0, pt1, color, framebuffer)
    {
        drawLineXY(pt0.x, pt0.y, pt1.x, pt1.y, color, framebuffer);
    }
};

function pixelIndex(x, y, framebuffer){
    return 4 * y * framebuffer.width + 4 * x;
}
function setFramebufferColor(framebuffer, px, color){
    framebuffer.data[px + 0] = color[0];
    framebuffer.data[px + 1] = color[1];
    framebuffer.data[px + 2] = color[2];
    framebuffer.data[px + 3] = color[3];
}
function drawLineXY(x0,y0,x1,y1,color,framebuffer){
    if (Math.abs(y1-y0) <= Math.abs(x1-x0)) {
        if (x0<x1){
            drawLineLow(x0,y0,x1,y1,color,framebuffer);
        }
        else{
            drawLineLow(x1,y1,x0,y0,color,framebuffer);
        }
    }
    else{
        if(y0<y1){
            drawLineHigh(x0,y0,x1,y1,color,framebuffer);
        }
        else{
            drawLineHigh(x1,y1,x0,y0,color,framebuffer);
        }
    }
}
function drawLineLow(x0, y0, x1, y1, color, framebuffer){
    var A = y1 - y0;
    var B = x0 - x1;
    var iy = 1;
    if (A < 0) {
        iy = -1;
        A *= -1;
    }
    var D = 2 * A + B;
    var x = x0;
    var y = y0;
    var px;
    while (x <= x1){
        px = pixelIndex(x, y, framebuffer);
        setFramebufferColor(framebuffer, px, color);
        x += 1;
        if (D <= 0){
            D += 2 * A;
        }else{
            D += 2 * A + 2 * B;
            y += iy;
        }
    }
} 
function drawLineHigh(x0,y0,x1,y1,color,framebuffer){
    var x = x0;
    var y = y0;
    var deltaX = y1 - y0;
    var deltaY = x1 - x0;
    var A = deltaY;
    var B = -deltaX;
    var px;
    var dx = 1;

    if (A<0)
    {
        dx = -1;
        A = A*(-1);
    }

    var D = (2 * A) + B;
    var D1 = (2 * A) + (2 * B);
    var D0 = (2 * A);

    for (var i=y0; i<y1; i++)
    {
        px = pixelIndex(x,y,framebuffer);
        setFramebufferColor(framebuffer, px, color);

        y = y + 1;

        if (D<=0)
        {	
            D = D + D0;
        }
        else
        {
            D = D + D1;
            x = x + dx;
        }


    }
}
