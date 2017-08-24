'use strict';

//comment

function DOMready() {
    let canvas = document.querySelector('#canvas');
    let context = canvas.getContext('2d');

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    let balls = [];

    function clearRectForFly() {
        window.requestAnimationFrame(clearRectForFly);
        //обновление canvas для перерисовки шариков и линий
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    class Ball {
        constructor(color) {
            this.color = color;
            this.speed = 1.5;
            this.dx = (0.5 - Math.random()) * this.speed;
            this.dy = ( 0.5 - Math.random()) * this.speed;
            this.x = Math.round(Math.random() * canvasWidth);
            this.y = Math.round(Math.random() * canvasHeight);
            this.radius = 2;
            this.fly();
        }

        changeX() {
            this.x += this.dx;
        };

        changeY() {
            this.y += this.dy;
        };

        fly() {
            window.requestAnimationFrame(this.fly.bind(this));
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.closePath();
            context.fill();

            //если dx положительная
            if (this.dx > 0) {
                if (this.x + this.radius >= canvasWidth) {
                    this.changeX = function () {
                        this.x -= this.dx;
                    }
                }
                if (this.x - this.radius <= 0) {
                    this.changeX = function () {
                        this.x += this.dx;
                    };
                }
            } else
            // если dx отрицательная
            if (this.dx < 0) {
                if (this.x + this.radius >= canvasWidth) {
                    this.changeX = function () {
                        this.x += this.dx;
                    }
                }
                if (this.x - this.radius <= 0) {
                    this.changeX = function () {
                        this.x -= this.dx;
                    };
                }
            }
            //если dy положительная
            if (this.dy > 0) {
                if (this.y + this.radius >= canvasHeight) {
                    this.changeY = function () {
                        this.y -= this.dy;
                    }
                }
                if (this.y - this.radius <= 0) {
                    this.changeY = function () {
                        this.y += this.dy;
                    }
                }
            } else
            //если dy отрицательная
            if (this.dy < 0) {
                if (this.y + this.radius >= canvasHeight) {
                    this.changeY = function () {
                        this.y += this.dy;
                    }
                }
                if (this.y - this.radius <= 0) {
                    this.changeY = function () {
                        this.y -= this.dy;
                    }
                }
            }
            this.changeX();
            this.changeY();
        };
    }

    class Lines {
        constructor(color) {
            this.color = color;
            this.lineLength = 200;
            this.renderLines();

        }

        renderLines() {
            window.requestAnimationFrame(this.renderLines.bind(this));
            let iBall;
            let jBall;
            for (let i = 0; i < balls.length; i++) {
                for (let j = 0; j < balls.length; j++) {
                    iBall = balls[i];
                    jBall = balls[j];

                    if (
                        (iBall.x - jBall.x) < this.lineLength &&
                        (iBall.y - jBall.y) < this.lineLength &&
                        (iBall.x - jBall.x) > -this.lineLength &&
                        (iBall.y - jBall.y) > -this.lineLength
                    ) {
                        context.strokeStyle = this.color;
                        context.beginPath();
                        context.lineWidth = 0.12;
                        context.moveTo(iBall.x, iBall.y);
                        context.lineTo(jBall.x, jBall.y);
                        context.stroke();
                        context.closePath();
                    }
                }
            }
        };
    }

//очищаем canvas для перерисовки шариков и линий на изменившихся координатах
    clearRectForFly();

//отрисовываем шарики
    for (let i = 0; i < 150; i++) {
        balls.push(new Ball('#e6e6e6'));
    }

//отрисовываем линии
    new Lines('#e7e7e7');

// цепляем первый шарик к курсору мыши
    document.addEventListener('mousemove', function (e) {
        let x = e.pageX;
        let y = e.pageY;
        let mouseDot = balls[0];
        mouseDot.x = x;
        mouseDot.y = y;
        mouseDot.dx = 0;
        mouseDot.dy = 0;
        mouseDot.radius = 0;
    });

}

document.addEventListener('DOMContentLoaded', DOMready);