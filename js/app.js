// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.rowToYMultiplier = 75;
    this.maxSpeed = 200;
    this.y = this.enemy_position();
    this.speed = Math.floor(Math. random() * this.maxSpeed + 1);

    // Convert the columns and rows to xy coordinates
    //this.y = this.row * this.rowToYMultiplier;
    //this.speed = Math.floor(Math.random() * this.maxSpeed + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //If the enemy goes off the right most side of the canvas,
    //reset it's position at a randgom negative position off
    //the left side of the canvas.
    if(this.x > ctx.canvas.width) {
        this.x = 0;
    }
    //Check for collisions
    if (this.collisions(player)) {
        //Descrese if collides
        player.point -= 5;
        console.log(player.point);
        player.reset();
    }
};

Enemy.prototype.enemy_position = function(){
        return Math.floor(Math.random() * 3 +1 ) * this.rowToYMultiplier;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Collison Detection
Enemy.prototype.collisions = function(player) {
     var colwidth = 80;
     var rowHeight = 101;

     var col = Math.floor(this.x / colwidth);
     var row = Math.floor(this.y / rowHeight) + 1;

     if( col == player.col && row == player.row){
        return true;
     }
};

//Player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.startCol = 2;
    this.startRow = 5;
    this.col = this.startCol;
    this.row = this.startRow;
    this.columnToXMultiplier = 100;
    this.rowToYMultiplier = 80;
    this.point = 0;
    // Convert the columns and rows to xy coordinates
    this.x = this.col * this.columnToXMultiplier;
    this.y = this.row * this.rowToYMultiplier;
};

//Update Players position
Player.prototype.update = function() {
        this.x = this.col * this.columnToXMultiplier;
        this.y = this.row * this.rowToYMultiplier;

};

//Draw the image of player and points on the screen
Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        this.points();
};

//Reset player if collision occurs
Player.prototype.reset =function(){
    this.col = this.startCol;
    this.row = this.startRow;
};

//Print points
Player.prototype.points = function() {
     ctx.font = "36px impact";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(this.point, 450, 100);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText(this.point, 450, 100);
};

//Keyboard input handeling for player
Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'left' :
            this.col -= 1;
            if(this.col < 0){
                this.col = 0;
            }
            break;
        case 'right' :
            this.col += 1;
            if(this.col > 4){
                this.col = 4;
            }
            break;
        case 'up' :
            this.row -= 1;
            if(this.row == 0){
                this.point += 10;
                this.row = 5;
            }
            break;

        case 'down' :
            this.row += 1;
            if(this.row > 5){
                this.row = 5;
            }
            break;

    }

};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4);


// Place the player object in a variable called player
var player = new Player();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
