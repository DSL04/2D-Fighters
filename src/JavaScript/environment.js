class EnvironmentSprite {
    constructor({position, imgSrc, magnify = 1, maxFrames = 1, currentFrame = 0 }) {
        this.position = position;
        this.img = new Image();
        this.img.src = imgSrc;
        this.magnify = magnify
        this.maxFrames = maxFrames;
        this.currentFrame = currentFrame
        

    }
    // draws the background sprite
     drawSprite() {
        context.drawImage(
            // Image frame displacement
            this.img,
            this.currentFrame * (this.img.width / this.maxFrames),
            0,
            this.img.width / this.maxFrames,
            this.img.height,

            //Image position
            this.position.x, 
            this.position.y, 
            (this.img.width / this.maxFrames) * this.magnify, 
            this.img.height * this.magnify  
        )
    }

    updateFrame() {
        this.displacedFrames++
     if (this.displacedFrames % this.pausedFrame === 0) {
        if (this.currentFrame < this.maxFrames - 1) {
            this.currentFrame++;
         } else {
            this.currentFrame = 0;
         }
     }
    }
    // draws players and allows for movement
    updateSprite() {
     this.drawSprite();
    
    }

}