//Setting environment to 2D by querying for the canvas tag and retrieving 2D context
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const video = document.querySelector('video');

//Game screen dimensions
canvas.width = 1024;
canvas.height = 587;

context.fillStyle = "blue";
context.fillRect(0,0,canvas.width, canvas.height);



//Class for background sprite
const background = new EnvironmentSprite({
    position: {
        x:0,
        y:0
    },
    imgSrc: 'src/assets/backgrounds/heavens_arena.png'
})

// const some = new EnvironmentSprite({
//     position: {
//         x:0,
//         y:0
//     },
//     imgSrc: 'src/assets/characters/chrollo_idle.png' 
// })

//Creates player object
const player = new Player({
    position: {
     x: 0,
     y: 450
    },
    speed: {
     x: 0,
     y: 0 
    }, 
    imgSrc: 'src/assets/characters/chrollo/chrollo_idle2.png',
    magnify: 2,
    maxFrames: 1,
    
    
      
})

const opponent = new Player({
    position:{
     x:500,
     y:0 
    },
    speed:{
     x:0,
     y:0
    },

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

//Game timer
var counter = 10;
function timer() {
    setTimeout(timer, 1000);
    if (counter > 0 && player.health > 0 && opponent.health > 0) {
        counter--;
        document.querySelector("#timer").innerHTML = counter;
    } else {
        return counter
    }
    
}

timer();


//Checks for attack collision and deducts health points based on the position
function attackCollison() {

    if (checkPlayerAttack == true) {
        player.playerAttackSprite();
        // while the button is pressed, only initiate the attack after certain time, during that time
        // the attack state will be of false, after that period finishes, it goes back to true
    }
    if (checkOpponentAttack == true) {
        opponent.opponentAttackSprite();
    }

    if ((player.playerHitBox.position.x + 100 >= opponent.position.x) 
    && (opponent.position.x + 50 >= player.playerHitBox.position.x) 
    && (checkPlayerAttack == true)
    && (opponent.health >= 0 && counter > 0 && player.health >= 0)) {

    opponent.health -= 1
    document.querySelector("#opponentHealth").style.width = opponent.health + "%"

    } 
    if ((opponent.opponentHitBox.position.x -100 <= player.position.x + 50) 
    && (player.position.x + 50 <= opponent.opponentHitBox.position.x) 
    && (checkOpponentAttack == true)
    && (player.health >= 0 && counter > 0 && opponent.health >= 0)) {
 
    player.health -= 1
    document.querySelector("#playerHealth").style.width = player.health + "%"
    }
    }

    // Win and lose conditions for both player and opponent
function winConditions() {
    document.querySelector("#winConditionsText").style.display = "flex"
    if (counter > 0) {
        if (opponent.health === 0) {
            document.querySelector("#winConditionsText").innerHTML = "Player 1 Wins"
            
        } 
        else if (player.health === 0) {
            document.querySelector("#winConditionsText").innerHTML = "Player 2 Wins"
            return counter
        } 

    } 
    else if ( counter === 0) {
        if (player.health > opponent.health) {
            document.querySelector("#winConditionsText").innerHTML = "Player 1 Wins"
        } else if (player.health < opponent.health) {
            document.querySelector("#winConditionsText").innerHTML = "Player 2 Wins"
        } else if (player.health === opponent.health) {
            document.querySelector("#winConditionsText").innerHTML = "Draw"
        }
    }


    
} 


// infinite loop that animates sprites and frames
function animation(){
    window.requestAnimationFrame(animation);
    context.fillStyle = "blue";
    context.fillRect(0,0,canvas.width, canvas.height);
    background.updateSprite();
    // some.spriteMotion()
    // context.drawImage(video, 0, 0,)
    player.updateSprite();
    // opponent.updateSprite();
    
    attackCollison();
    winConditions();
    


    
}

animation()



