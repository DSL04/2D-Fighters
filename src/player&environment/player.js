class Player {
    constructor({position, speed,}, width, height) {
        this.position = position;
        this.speed = speed;
        this.width = width = 50;
        this.height = height = 200;
        this.playerHitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            }
        }
        this.opponentHitBox = {
            position: {
                x: this.position.x,
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

}