class Player extends EnvironmentSprite{
    constructor({position, width, height, speed, imgSrc, magnify = 1, maxFrames = 1, currentFrame = 0, sprites}) {
        super({position, imgSrc, maxFrames, currentFrame});
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
        this.sprites = sprites
        this.health = 100;
        this.magnify = magnify;
        this.displacedFrames = 0;
        this.pausedFrame = 15;
        
    }
    // draws the background sprite
    //  drawSprite() {
    //     context.drawImage(
    //          this.imgSrc,
    //          this.position.x, 
    //          this.position.y, 
    //          this.img.width * this.scale, 
    //          this.img.height * this.scale )

    // }
    // draws players and allows for movement
    updateSprite() {
     this.drawSprite();
     this.updateFrame()

     

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