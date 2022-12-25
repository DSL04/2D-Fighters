// Yo
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillStyle = "blue";
context.fillRect(0,0,canvas.width, canvas.height);

//Class for background sprite
class EnvironmentSprite {
    constructor({position, speed,}, width, height) {
        this.position = position;
        this.speed = speed;
        this.width = width;
        this.height = height;

    }
    // draws the background sprite
     drawSprite() {
       context.fillStyle = "black";
       context.fillRect(this.position.x, this.position.y, 50, 200)
    }
    // draws players and allows for movement
    spriteMotion() {
     this.drawSprite();
    
     this.position.x += this.speed.x;
     if (this.position.y + 200 + this.speed.y < canvas.height) {
        this.speed.y += 0.35
        this.position.y += this.speed.y;
     } else if( this.position.y + 200 + this.speed.y >= canvas.height) {
        this.speed.y = 0
     }
        
    }
}

//Creates player object
const player = new EnvironmentSprite({
    position: {
     x: 0,
     y:0
    },
    speed: {
     x: 0,
     y: 0 
    }
    
})

const opponent = new EnvironmentSprite({
    position:{
     x:500,
     y:0 
    },
    speed:{
    x:0,
    y:0
    }
})

document.addEventListener('keydown', (event) =>{
    if (event.key == "d") {
        player.position.x += 5;
    } else if (event.key == "a" ) {
        player.position.x -= 5;
    } else if (event.key == "w") {
        player.position.y = 3;
    }
})


// infinite loop that animates sprites and frames
function animation(){
    window.requestAnimationFrame(animation);
    context.fillStyle = "blue";
    context.fillRect(0,0,canvas.width, canvas.height);
    // opponent.spriteMotion();
    player.spriteMotion();
    
}

animation()

// class Players extends EnvironmentSprite{

// }