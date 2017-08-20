var football = (function () {

    // 封装requestAnimationFrame兼容各浏览器
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60)
            }
    })();

    var canvas;
    var context;
    var image;

    var football = {
        play: function () {
            init();
        }
    };

    function init() {
        canvas = document.getElementById('football');
        context = canvas.getContext('2d');
        image = new Image();
        image.src = 'football/football.png';
        image.onload = loadBall;
    }

    function loadBall() {
        var ball = new Ball(image, {
            width: 100,
            height: 100,
            left: 0,
            top: 0
        });
        ball.draw();
    }

    function Ball(image, option) {
        this.width = option.width;
        this.height = option.height;
        this.x = option.left;
        this.y = option.top;
        this.image = image;
    }

    Ball.prototype.draw = function () {
        context.drawImage(this.image,
            0, 0,
            100, 100,
            this.x, this.y,
            this.width, this.height);
    }

    return football;
})();