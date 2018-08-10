// Door constructor
Door = function(game, x, y){
  Phaser.Sprite.call(this, game, x, y, 'door');
  game.add.existing(this);
  game.physics.arcade.enable(this);
  this.body.static = true;
};
Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;


// Creature constructor
Creature = function(game, x, y, alignment){
  this.aggressive = false;
  if(alignment == 'good'){
    Phaser.Sprite.call(this, game, x, y, 'gMob');
  }else if(alignment == 'neutral'){
    Phaser.Sprite.call(this, game, x, y, 'nMob');
  }else{
    Phaser.Sprite.call(this, game, x, y, 'bMob');
    this.aggressive = true;
  }
  game.add.existing(this);
  game.physics.arcade.enable(this);
  this.body.fixedRotation = true;
  this.body.collideWorldBounds = true;
  this.health = 100;
  this.knocked = false;
  this.unknocking = false;

  timer = game.time.create(false);
  timer.loop(3000, randomMove, this);
  timer.start();

  this.mobPosX = 0;
  this.mobPosY = 0;
  this.mobMoving = false;

  this.body.onWorldBounds = new Phaser.Signal();
  this.body.onWorldBounds.add(stopAtBounds, this);

  function stopAtBounds(){
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.mobMoving = false;
  }

  function randomMove(){
    var dist = game.physics.arcade.distanceToXY(this, this.mobPosX, this.mobPosY);
    if((Math.round(dist) >= -1 && Math.round(dist) <= 1) || this.mobMoving == true){
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      this.mobMoving = false;
    }else{
      this.mobPosX = randomPos(this.body.x);
      this.mobPosY = randomPos(this.body.y);
      game.physics.arcade.moveToXY(this, this.mobPosX, this.mobPosY, 75);
      this.mobMoving = true;
    }
  }

  function randomPos(pos){
    min = pos - 50;
    max = pos + 50;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
Creature.prototype = Object.create(Phaser.Sprite.prototype);
Creature.prototype.constructor = Creature;

Creature.prototype.update = function(){
  if(this.knocked == false){
    if(this.aggressive){
      range = game.physics.arcade.distanceBetween(this, hero);
      if(range < 200){
        game.physics.arcade.moveToObject(this, hero, 150);
      }
    }
  }else if(this.knocked){
    this.body.moves = false;
    if(this.unknocking == false){
      game.time.events.add(800, unKnock, this);
      this.unknocking = true;
    }
    function unKnock(){
      this.body.bounce.set(0);
      this.knocked = false;
      this.unknocking = false;
      this.body.moves = true;
    }
  }
};
