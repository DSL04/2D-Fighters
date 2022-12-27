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

     if (this.position.x + 50 + this.speed.x >= canvas.width) {
        this.speed.x = 0;
        this.position.x += this.speed.x;
     } else if(this.position.x <= 0) {
        this.speed.x = 0;
        this.position.x += this.speed.x;

     } 
     

     // bottom floor boundary(so player doesn't fall to his impending doom) + gravity effect
     if (this.position.y + 200 + this.speed.y < canvas.height) {
        this.speed.y += 0.35
        this.position.y += this.speed.y;
     } else if( this.position.y + 200 + this.speed.y >= canvas.height) {
        this.speed.y = 0
        checkJump = false;
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

// by default, players are in a no jump state
let checkJump = false;

document.addEventListener('keydown', (event) =>{
    if (event.key == "d") {
        player.speed.x = 7;
    } else if (event.key == "a" ) {
        player.speed.x = -7;
    } else if (event.key == "w" && checkJump == false) {
        player.speed.y = -12 ;
        checkJump = true;
    }
})

document.addEventListener('keyup', (event) =>{
    if (event.key == "d") {
        player.speed.x += 0;
    } else if (event.key == "a" ) {
        player.speed.x -= 0;
    } else if (event.key == "w") {
        player.speed.y += 0; 
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