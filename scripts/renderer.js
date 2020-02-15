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
        var color = [168, 78, 50, 500];
        var left_bot = {x:100, y:100};
        var right_top = {x:700, y:500};
        this.drawRectangle(left_bot, right_top, color, framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        var color = [66, 245, 129, 500];
        var center = {x:250, y:250};
        var radius = 100;
        this.drawCircle(center, radius, color, framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        var color = [0, 0, 0, 500];
        var pt0 = {x: 250, y: 250};
        var pt1 = {x: 250, y: 500};
        var pt2 = {x: 450, y: 500};
        var pt3 = {x: 450, y: 250};
        this.drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer)
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        var color = [135, 43, 227, 500];
        var pt0;
        var pt1;
        var pt2;
        var pt3;
        var center;
        var radius = 50;
        
        //J
        pt0 = {x:60, y:400};
        pt1 = {x:190, y:403};
        this.drawRectangle(pt0, pt1, color, framebuffer);
        pt0 = {x:125, y:400};
        pt1 = {x:125, y:300};
        this.drawLine(pt0, pt1, color, framebuffer);
        
        pt0 = {x:125, y:300};
        pt1 = {x:125, y:175};
        pt2 = {x:50, y:175};
        pt3 = {x:50, y:300};
        this.drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer);
        
        //a
        center = {x: 225, y:250};
        this.drawCircle(center, radius, color, framebuffer);
        pt0 = {x:250, y:300};
        pt1 = {x:300, y:200};
        this.drawLine(pt0, pt1, color, framebuffer);
        
        //m
        pt0 = {x:325, y:200};
        pt1 = {x:325, y:340};
        pt2 = {x:375, y:340};
        pt3 = {x:375, y:200};
        this.drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer);
        pt0 = {x:375, y:200};
        pt1 = {x:375, y:340};
        pt2 = {x:425, y:340};
        pt3 = {x:425, y:200};
        this.drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer);
        
        //e
        pt0 = {x:500, y:200};
        pt1 = {x:425, y:200};
        pt2 = {x:425, y:300};
        pt3 = {x:500, y:300};
        this.drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer);
        pt0 = {x:500, y:300};
        pt1 = {x:525, y:300};
        pt2 = {x:525, y:275};
        pt3 = {x:500, y:275};
        this.drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer);
        pt0 = {x:500, y:275};
        pt1 = {x:475, y:275};
        pt2 = {x:457, y:285};
        pt3 = {x:467, y:290};
        this.drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer);
        
        //s
        pt0 = {x:550, y:200};
        pt1 = {x:625, y:200};
        pt2 = {x:625, y:250};
        pt3 = {x:575, y:250};
        this.drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer);
        pt0 = {x:575, y:250};
        pt1 = {x:525, y:250};
        pt2 = {x:525, y:300};
        pt3 = {x:600, y:300};
        this.drawBezierCurve(pt0, pt1, pt2, pt3, color, framebuffer);
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
        
        cosole.error('Show points='+this.show_points);
        if (this.show_points === true) {
            this.drawPoint(left_bottom, 5, color, framebuffer);
            this.drawPoint(right_top, 5, color, framebuffer);
            this.drawPoint(left_top, 5, color, framebuffer);
            this.drawPoint(right_bot, 5, color, framebuffer);
        }
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, color, framebuffer) {
        var current;
        var previous = {x: center.x + radius, y: center.y};
        var num_points = this.num_curve_sections;
        var angle = 360/num_points;
        var currentAngle = angle;
        for (var i=0; i<num_points; i++){
               current = {x: center.x + Math.round(radius * Math.cos(currentAngle*0.0174533)), y: center.y + Math.round(radius * Math.sin(currentAngle*0.0174533))};
               this.drawLine(previous, current, color, framebuffer);
               if (this.show_points === true) {
                    this.drawPoint(previous, 3, color, framebuffer);
               }
               previous = current;
               currentAngle = currentAngle + angle;
        }
    }
    
    drawPoint(center, radius, color, framebuffer) {
        var current;
        var previous = {x: center.x + radius, y: center.y};
        var num_points = this.num_curve_sections;
        var angle = 360/num_points;
        var currentAngle = angle;
        for (var i=0; i<num_points; i++){
               current = {x: center.x + Math.round(radius * Math.cos(currentAngle*0.0174533)), y: center.y + Math.round(radius * Math.sin(currentAngle*0.0174533))};
               this.drawLine(previous, current, color, framebuffer);
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
        var x;
        var y;
        var current;
        var previous = {x: pt0.x, y: pt0.y};
        var num_points = this.num_curve_sections;
        var increment = 1/num_points;
        var t = increment;
        this.drawPoint(pt1, 3, color, framebuffer);
        this.drawPoint(pt2, 3, color, framebuffer);
        for (var i=0; i<num_points; i++){
               x = Math.round(((1 - t)**3) * pt0.x + 3*((1 - t)**2) * t * pt1.x + 3*(1 - t) * t**2 * pt2.x + t**3 * pt3.x);
               y = Math.round(((1 - t)**3) * pt0.y + 3*((1 - t)**2) * t * pt1.y + 3*(1 - t) * t**2 * pt2.y + t**3 * pt3.y);
               current = {x: x, y: y};
               this.drawLine(previous, current, color, framebuffer);
               if (this.show_points === true) {
                    this.drawPoint(previous, 3, color, framebuffer);
               }
               previous = current;
               t = t + increment;
        }
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
