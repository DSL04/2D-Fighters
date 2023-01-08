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
        this.width = 50;
        this.height = 200;
        this.playerHitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            }
        }
        this.opponentHitBox = {
            position: {
                x: this.position.x ,
                y: this.position.y
            }
        }
        this.health = 100;

    }
    // draws the background sprite
     drawSprite() {
       context.fillStyle = "black";
       context.fillRect(this.position.x, this.position.y, this.width, this.height)

    }
    // draws players and allows for movement
    spriteMotion() {
     this.drawSprite();
     this.playerHitBox.position.x = player.position.x + 50
     this.playerHitBox.position.y = player.position.y
     this.opponentHitBox.position.x = opponent.position.x
     this.opponentHitBox.position.y = opponent.position.y


     this.position.x += this.speed.x;
    
     // player cannot advance past the borders of the x-axis
     if (this.position.x + this.width + this.speed.x >= canvas.width) {
        this.position.x = canvas.width - this.width;
     } else if(this.position.x <= 0) {
        this.position.x = 0;
     } 
     

     // bottom floor boundary(so player doesn't fall to his impending doom) + gravity effect
     if (this.position.y + this.height + this.speed.y < canvas.height) {
        this.speed.y += 0.35
        this.position.y += this.speed.y;
     } else if( this.position.y + this.height + this.speed.y >= canvas.height) {
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
    context.fillRect(player.playerHitBox.position.x , player.playerHitBox.position.y, 100, 200);     
    }

    opponentAttackSprite() {
    //opponent
    context.fillStyle = "red";
    context.fillRect(opponent.opponentHitBox.position.x , opponent.opponentHitBox.position.y, -100, 200);
    }

    attackCollison() {
    var attacked = false;

        if ((player.playerHitBox.position.x + 100 >= opponent.position.x) && checkPlayerAttack == true) {
            attacked = true;
            console.log(attacked);

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
var checkJumpPlayer = false;
var checkJumpOpponent = false;

//by default, players are not in an attacking state
var checkPlayerAttack = false;
var checkOpponentAttack = false;

//by default, players are not being attacked
var playerAttacked = false;
var opponentAttacked = false;

document.addEventListener('keydown', (event) =>{
    if (event.key == "d") {
        player.speed.x = 7;
    } else if (event.key == "a" ) {
        player.speed.x = -7;
    } else if (event.key == "w" && checkJumpPlayer == false) {
        player.speed.y = -12 ;
        checkJumpPlayer = true;
    } else if(event.key == "j" && checkPlayerAttack == false ) {
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
    } else if (event.key == "j" && checkPlayerAttack == true) {
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
    } else if (event.key == ";" && checkOpponentAttack == false) {
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
    } else if (event.key == ";" && checkOpponentAttack == true) {
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
    }if (checkOpponentAttack == true) {
        opponent.opponentAttackSprite();
    }
    if ((player.playerHitBox.position.x + 100 >= opponent.position.x) 
         && (opponent.position.x + 50 >= player.playerHitBox.position.x) 
         && checkPlayerAttack == true) 
    {
        // opponentAttacked = true;
        // setTimeout(() => {
        //     opponentAttacked = false;
        // }, 1000)

        // console.log("opponentAttacked");
        opponent.health -= 1
        document.querySelector("#opponentHealth").style.width = opponent.health + "%"

    } if ((opponent.opponentHitBox.position.x -100 <= player.position.x + 50) 
        && (player.position.x + 50 <= opponent.opponentHitBox.position.x) 
        && checkOpponentAttack == true) {
        // playerAttacked = true;
        // console.log("playerAttacked");
        // document.querySelector("#enemyHealth").style.width = "20%"
        player.health -= 1
        document.querySelector("#playerHealth").style.width = player.health + "%"
    }

    


    
}

animation()

var counter = 10;
function timer() {
    setTimeout(timer, 1000);
    if (counter > 0) {
        counter--;
        document.querySelector("#timer").innerHTML = counter;
    }
    
}

timer();

function winConditions() {
    document.querySelector("#winConditionsText").style.display = "flex"
    if (counter > 0) {
        if (opponent.health === 0) {
            document.querySelector("#winConditionsText").innerHTML = "Player 1 Wins"
        } else if (player.health === 0) {
            document.querySelector("#winConditionsText").innerHTML = "Player 2 Wins"

        } else if (player.health === opponent.health) {
            document.querySelector("#winConditionsText").innerHTML = "Draw"
        }

    } 
    // else if ( counter === 0) {
    //     if (player.health > opponent.health) {
    //         document.querySelector("#winConditionsText").innerHTML = "Player 1 Wins"
    //     } else if (player.health < opponent.health) {
    //         document.querySelector("#winConditionsText").innerHTML = "Player 2 Wins"
    //     } else if (player.health === opponent.health) {
    //         document.querySelector("#winConditionsText").innerHTML = "Draw"
    //     }
    // }

}

// class Players extends EnvironmentSprite{

// }