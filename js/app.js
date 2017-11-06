// Enemy bugs our player must avoid
var Enemy = function(yInit, speed) {
    // Variables applied to each of our instances go here.
    this.x = Math.random()*(-500);
    this.y = yInit;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png'; // The image/sprite for our enemies, this uses a helper to easily load images.
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt,pObj) {
    /* Any movement must be multiplied by the dt parameter
     * which will ensure the game runs at the same speed for
     * all computers. */
    this.x = this.x + this.speed*dt;
    xRight = this.x + 75;
    xRightPlayer = pObj.x + 100;  
    if(this.x > 504)
    {
        this.x = -100;
    }
    else if((xRight>=pObj.x) && (xRight<=xRightPlayer))
    {
        if(pObj.y-this.y === 22)
        {
            pObj.x = 202;
            pObj.y = 415;
            if(pObj.livesCount>0)
            {
                alert("You lost a life! :(");
                pObj.livesCount--;
            }
            else
            {
                levelUpdate(pObj.level);
            }
        }
    }
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
/* This class requires an update(), render() and
 * a handleInput() method. */
var Player = function() {
    this.sprite = "images/char-boy.png";
    this.lives = "images/Heart.png";
    this.x = 202;
    this.y = 415;
    this.livesCount = 3;
    this.level = 1;
    this.score = 0;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.drawImage(Resources.get(this.lives), 0, 500, 50, 75);
    ctx.fillText("Score ", 150, 100);
    ctx.fillText(this.score, 280, 100);
    ctx.fillText(this.livesCount, 51, 555);
    ctx.fillText("Lvl ", 415, 555 );
    ctx.fillText(this.level, 475, 555);
}

Player.prototype.update = function(xUp, yUp) {
    var xNew = this.x + xUp;
    var yNew = this.y + yUp;
    if((xNew>=0 && xNew<=404) && (yNew>=0 && yNew<=415))
    {
        if(yNew<=82)
        {
            this.x = 202; this.y = 415;
            levelUpdate(this.level);
        }
        else
        {
            this.x = xNew; this.y = yNew;
        }
    }
}

Player.prototype.handleInput = function(keycode) {
    if(keycode === "left") { this.update(-101,0); }
    else if(keycode === "up") { this.update(0,-83); }
    else if(keycode === "right") { this.update(101,0); }
    else if(keycode === "down") { this.update(0,83); }
}

//Gem class 
var Gem = function(loc, scoreInc){
    var kX, kY;
    this.yArray = [83, 166, 249];
    this.xArray = [0, 101, 202, 303, 404];
    kX = Math.floor(Math.random()*5);
    kY = Math.floor(Math.random()*3);
    this.x = this.xArray[kX];
    this.y = this.yArray[kY];
    this.sprite = loc;
    this.scoreInc = scoreInc;
    this.taken = false;
};

Gem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/* This function takes care of updating the player and enemy object parameters, as well as those of the gems, as applicable
 * when the player progresses to the next level by reaching the target (water) in the current level, or wins the game
 * by successfully clearing all three levels. It also resets the game when the player loses all his lives and has to 
 * start all over again from level 1. */ 
var levelUpdate = function(level){
    if(player.livesCount > 0)
    {
        if(level < 3)
        {
            alert("Congrats! :) You won level "+player.level+"!");
            player.level++;
            player.score+=100;
            allEnemies.forEach(function(enemy){
                enemy.speed+=100;
                enemy.x = Math.random()*(-500);
            });
        }
        else
        {
            var res = confirm("You did it! Your score is: "+(player.score+100)+". :) Play again?");
            if(res)
            {
                player.level = 1;
                player.score = 0;
                player.livesCount = 3;
                allEnemies.forEach(function(enemy){
                    enemy.speed = 200;
                    enemy.x = Math.random()*(-500);
                });
                allGems.forEach(function(gem){
                    gem.taken = false;
                    kX = Math.floor(Math.random()*5);
                    kY = Math.floor(Math.random()*3);
                    gem.x = gem.xArray[kX];
                    gem.y = gem.yArray[kY];
                });
                
            }
        }
    }
    else
    {
        alert("Game Over! :( Try again!");
        player.level = 1;
        player.score = 0;
        player.livesCount = 3;
        allEnemies.forEach(function(enemy){
            enemy.speed = 200;
            enemy.x = Math.random()*(-500);
        });                
        allGems.forEach(function(gem){
            gem.taken = false;
            kX = Math.floor(Math.random()*5);
            kY = Math.floor(Math.random()*3);
            gem.x = gem.xArray[kX];
            gem.y = gem.yArray[kY];
        });
    }
}


// Object instantiation
/* All enemy objects are placed in an array called allEnemies,
 * the player object is a variable called player and 
 * the gems (one for each level) are placed in an array called allGems. */
var enemyR1 = new Enemy(61, 200),
    enemyR2 = new Enemy(144, 200),
    enemyR3 = new Enemy(227, 200);
var allEnemies = [enemyR1, enemyR2, enemyR3];
var player = new Player(); 
var gem1 = new Gem("images/Gem Blue.png", 50),
    gem2 = new Gem("images/Gem Green.png", 100),
    gem3 = new Gem("images/Gem Orange.png", 200);
var allGems = [gem1, gem2, gem3];   





/* This listens for key presses and sends the keys to the
 * Player.handleInput() method. */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
