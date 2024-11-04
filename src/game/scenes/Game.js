import { Scene } from 'phaser';
import fire from '@/game_assets/fire.png';
import plane_image from '@/game_assets/plane_img.png';
import plane_shadow from '@/game_assets/plane_shadow.png';
import hills from '@/game_assets/mountain-1.svg';
import watch_circle from '@/game_assets/watch.png';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        
        this.canvasWidth;
        this.canvasHeight;
        
        this.planePositions;
        
        this.plane;
        this.hills;
        this.watchCircle;
        this.smokeTrail;
        this.fire;
        this.countdown = 9;
        this.countdownText;
        this.planeCrashed = false;
        this.randomCrashTime;  // This will store the random time for the crash
        this.timeElapsed = 0;  // Track the elapsed time after countdown
        this.flightTimerText;  // Text to display the timer during flight
        this.flightStartTime = 0;  // Store the time when flight starts
        this.textPosition;
        this.planeTrail = [];
        this.graphics;
    }

     preload() {
        this.load.image('plane', plane_image);
        this.load.image('hills', hills);
        this.load.image('smoke', plane_shadow);
        this.load.image('watchCircle', watch_circle);
        this.load.spritesheet('fire', fire, { frameWidth: 200, frameHeight: 200 });
    }
    create ()
    {

        this.canvasWidth  = this.sys.game.canvas.width;
        this.canvasHeight  = this.sys.game.canvas.height;

        this.planePositions = {x : this.canvasWidth * 0.03, y: this.canvasHeight * 0.9}

        this.textPosition = {x: this.canvasWidth - 100, y: this.canvasHeight - 100};
        
        this.hills = this.add.tileSprite(this.canvasWidth * 0.1, this.canvasHeight * 0.9, this.canvasWidth * 2 , 200, 'hills');
        this.watchCircle = this.add.image(this.canvasWidth * 0.9, this.canvasHeight * 0.9, 'watchCircle').setScale(0.15);
        this.watchCircle.setOrigin(0.5, 0.5);  // Origin point at the bottom of the hand

        // Add the plane sprite and position it
        this.plane = this.add.sprite(this.planePositions.x, this.planePositions.y, 'plane');
        this.plane.setScale(0.5);

        // this.smokeTrail = this.add.particles('smoke').createEmitter({
        //     speed: 100,
        //     scale: { start: 0.5, end: 0 },
        //     lifespan: 800,
        //     frequency: 100,
        //     follow: plane
        // });
        
        // Add countdown text
        this.countdownText = this.add.text( this.textPosition.x ,  this.textPosition.y, ` ${this.countdown}`, { fontSize: '50px',     fontStyle: 'bold', fill: '#bd0707' });
        // Add flight timer text for displaying the timer in seconds with milliseconds
        this.flightTimerText = this.add.text(this.textPosition.x-50,  this.textPosition.y, ``, { fontSize: '30px',  fontStyle: 'bold', fill: '#fff' });
      
        // Add fire animation
        this.anims.create({
            key: 'burn',
            frames: this.anims.generateFrameNumbers('fire', { start: 0, end: 23 }),
            frameRate: 20,
            repeat: 0
        });

        // Start countdown timer
        this.time.addEvent({ delay: 1000, callback: this.updateCountdown, callbackScope: this, loop: true });
        this.randomCrashTime = Phaser.Math.Between(1000, 10000);

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(3, 0xFFCD00, 2);  // Line style (white, width 2)
    }
    update(time, delta) {
        
        if (this.countdown <= 0 && !this.planeCrashed) {
            // Move plane from bottom-left to top-right
            this.watchCircle.setVisible(false);
            if(this.plane.x < this.canvasWidth - 50){
                this.plane.x += 2;
                this.plane.y -= 1.1;
            }
            // Add slight shake to plane
            this.plane.angle = Math.sin(this.plane.x / 10) * 2;
    
            // Move the background hills from right to left
            this.hills.tilePositionX += 1;
    
            // Track time elapsed after countdown (flight time)
            this.timeElapsed += delta;  // `delta` is the time between frames in milliseconds
            
            // Update flight timer text with seconds and milliseconds
            let flightTimeInSeconds = (this.timeElapsed / 1000).toFixed(2);
            this.countdownText.setText('');
            this.flightTimerText.setText(`${flightTimeInSeconds}x`);
    
            // Check if it's time to crash the plane
            if (this.timeElapsed >= this.randomCrashTime) {
                this.planeCrashed = true;
                this.planeCrash();
            }

            // Add the current position of the plane to the trail
            this.planeTrail.push({ x: this.plane.x, y: this.plane.y });

            // Draw the trail
            this.drawPlaneTrail();
        }
    }

updateCountdown() {
        this.watchCircle.rotation += Phaser.Math.DegToRad(-6);  // Rotate by 6 degrees (360/60)
    if (this.countdown > 0) {
        this.countdown--;
        this.countdownText.setText(`${this.countdown}`);
    }
}

    drawPlaneTrail() {
        // Clear previous drawings
        this.graphics.clear();

        // Redraw the line connecting all previous positions of the plane
        this.graphics.beginPath();
        this.graphics.moveTo(this.planeTrail[0].x, this.planeTrail[0].y);

        for (let i = 1; i < this.planeTrail.length; i++) {
            this.graphics.lineTo(this.planeTrail[i].x, this.planeTrail[i].y);
        }

        this.graphics.strokePath();
    }

planeCrash() {
    // Show fire animation at the plane crash location
    this.fire = this.add.sprite(this.plane.x, this.plane.y, 'fire').setScale(.5);
    this.fire.play('burn');

    // Hide the plane
    this.plane.setVisible(false);

    // Restart the game after a delay
    this.time.addEvent({
        delay: 3000,
        callback: this.restartGame,
        callbackScope: this
    });

    this.planeTrail = [];
}

    restartGame() {
        // Reset variables and positions to restart the game
        this.planeCrashed = false;
        this.plane.setVisible(true);
        this.plane.x =  this.planePositions.x;
        this.plane.y =  this.planePositions.y;
        this.countdown = 10;
        this.countdownText.setText(`${this.countdown}`);
        this.timeElapsed = 0;
        this.flightStartTime = 0;
        this.flightTimerText.setText('');
        this.watchCircle.setVisible(true);
        this.planeTrail = [];
    }
    
}
