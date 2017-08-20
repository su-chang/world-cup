var football = (function () {
    // 封装浏览器兼容的 requestAnimationFrame
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60)
            }
    })();

    var canvas,
        ctx,
        football,
        ballimage;

    // Ball定义
    function Ball (ballimage, options) {
        this.vy = 0.8;
        this.vx = 4;
        this.vyAdjust = -15;
        this.vxAdjust = 0.25;
        this.bounceFactor = options.factor;
        this.gravity = 0.4;
        this.width = options.width;
        this.height = options.height;
        this.x = options.left;
        this.y = options.top;
        this.ballimage = ballimage;
        this.degree = 0;
        this.end = false;
        this.ctx = options.ctx;
        this.canvas = options.canvas;
    }

    Ball.prototype.draw = function () {
        this.ctx.save();
        this.rotate();

        this.ctx.drawImage(this.ballimage,
            0, 0,
            100, 100,
            this.x, this.y,
            this.width, this.height
        )
        this.ctx.restore();

        if(this.vx > 0) {
            this.degree += 1 + this.vx;
        }
    }

    Ball.prototype.rotate = function () {
        this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        this.ctx.rotate(Math.PI / 180 * this.degree);
        this.ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
    }

    Ball.prototype.hit = function () {
        this.vy = this.vyAdjust;
    }

    Ball.prototype.move = function () {
        this.y += this.vy;
        this.vy += this.gravity;

        if ((this.y + this.height) > this.canvas.height) {
            this.hit();
            this.vyAdjust = (this.vyAdjust * this.bounceFactor);
            if (this.vx) {
                this.vx = this.vx - this.vxAdjust;
            }
        }

        if ((this.x + this.width) < this.canvas.width - 50) {
            if (this.vx) {
                this.x += this.vx;
            }
        }
    }

    Ball.prototype.clearCanvas = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    Ball.prototype.update = function() {
        this.clearCanvas();
        this.move();
        this.draw();
    }


    // 初始化 football
    function init() {
        canvas = document.getElementById('football');
        ctx = canvas.getContext('2d');
        ballimage = new Image();
        ballimage.src = 'football/football.png';
        ballimage.onload = loadBall;
    }


    function loadBall() {
        var top = (0 - Math.floor((Math.random() * 10) + 1))

        football = new Ball(ballimage, {
            factor: 0.7,
            top: top,
            left: 0,
            height: 100,
            width: 100,
            ctx: ctx,
            canvas: canvas
        });

        loop();
    }

    function loop() {
        football.update();
        if(!football.end) {
            requestAnimFrame(loop);
        }
    }

    return {
        play: function () {
            init();
        }
    }
})();