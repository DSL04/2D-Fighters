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
    
     // player cannot advance past the borders of the x-axis
     if (this.position.x + 50 + this.speed.x >= canvas.width) {
        this.position.x = canvas.width - 50;
     } else if(this.position.x <= 0) {
        this.position.x = 0;
     } 
     

     // bottom floor boundary(so player doesn't fall to his impending doom) + gravity effect
     if (this.position.y + 200 + this.speed.y < canvas.height) {
        this.speed.y += 0.35
        this.position.y += this.speed.y;
     } else if( this.position.y + 200 + this.speed.y >= canvas.height) {
        this.speed.y = 0;
        if (this.position.y === player.position.y) {
            checkJumpPlayer = false;
        }
        else if (this.position.y === opponent.position.y) {
            checkJumpOpponent = false;
        }
        
    } 
    
    }

    playerAttackSprite() {
    //player
    context.fillStyle = "red";
    context.fillRect(player.position.x + 50 , player.position.y, 100, 200);     
    }

    opponentAttackSprite() {
    //opponent
    context.fillStyle = "red";
    context.fillRect(opponent.position.x , opponent.position.y, -100, 200);
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
var checkJumpPlayer = false;
var checkJumpOpponent = false;
var checkPlayerAttack = false;
var checkOpponentAttack = false;

document.addEventListener('keydown', (event) =>{
    if (event.key == "d") {
        player.speed.x = 7;
    } else if (event.key == "a" ) {
        player.speed.x = -7;
    } else if (event.key == "w" && checkJumpPlayer == false) {
        player.speed.y = -12 ;
        checkJumpPlayer = true;
    } else if(event.key == "j" ) {
        checkPlayerAttack = true;
    }
})

document.addEventListener('keyup', (event) =>{
    if (event.key == "d") {
        player.speed.x = 0;
    } else if (event.key == "a") {
        player.speed.x = 0;
    } else if (event.key == "w") {
        player.speed.y += 0; 
    } else if (event.key == "j") {
        checkPlayerAttack = false;
    }
})

document.addEventListener('keydown', (event) =>{
    if ( event.key == "ArrowRight") {
        opponent.speed.x = 7;
    } else if (event.key == "ArrowLeft" ) {
        opponent.speed.x = -7;
    } else if (event.key == "ArrowUp" && checkJumpOpponent == false) {
        opponent.speed.y = -12 ;
        checkJumpOpponent = true;
    } else if (event.key == ";") {
        checkOpponentAttack = true;
    }
})

document.addEventListener('keyup', (event) =>{
    if (event.key == "ArrowRight") {
        opponent.speed.x = 0;
    } else if (event.key == "ArrowLeft") {
        opponent.speed.x = 0;
    } else if (event.key == "ArrowUp") {
        opponent.speed.y += 0;
    } else if (event.key == ";") {
        checkOpponentAttack = false;
    }
})



// infinite loop that animates sprites and frames
function animation(){
    window.requestAnimationFrame(animation);
    context.fillStyle = "blue";
    context.fillRect(0,0,canvas.width, canvas.height);
    player.spriteMotion();
    opponent.spriteMotion();
    if (checkPlayerAttack == true) {
        player.playerAttackSprite();
    } else if (checkOpponentAttack == true) {
        opponent.opponentAttackSprite();
    }

    
}

animation()

// class Players extends EnvironmentSprite{

// }