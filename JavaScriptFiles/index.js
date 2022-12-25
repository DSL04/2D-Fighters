// Yo
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillStyle = "blue";
context.fillRect(0,0,canvas.width, canvas.height);

class EnvironmentSprite {
    constructor(position, speed, width, height) {
        this.position = position;
        this.speed = speed;
        this.width = width;
        this.height = height;

    }

     drawSprite() {
       context.fillStyle = "black";
       context.fillRect(this.position.x,this.position.y, this.width = 50, this.height = 200);
    }
}


const player = new EnvironmentSprite({
    x:0,
    y:0
})

const opponent = new EnvironmentSprite({
    x:500,
    y:0
})

opponent.drawSprite();

player.drawSprite();


// class Players extends EnvironmentSprite{

// }