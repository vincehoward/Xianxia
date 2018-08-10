// Hero constructor
Agent = function(game, x, y, life){
  Phaser.Sprite.call(this, game, x, y, 'hero');
  this.health = life;
  game.add.existing(this);
  game.physics.arcade.enable(this);
  this.body.fixedRotation = true;
  this.body.collideWorldBounds = true;

  cursors = game.input.keyboard.createCursorKeys();
  zKey = Phaser.KeyCode.Z;
  console.log(game.state.current);
  this.knocked = false;
  this.bounced = false;
};
Agent.prototype = Object.create(Phaser.Sprite.prototype);
Agent.prototype.constructor = Agent;

Agent.prototype.update = function(){
  //hero movement
  if(!hero.knocked){
    hero.body.velocity.x = 0;
    hero.body.velocity.y = 0;

    if(cursors.up.isDown){
      hero.body.velocity.y -= 200;
      this.vert = 2;
    }
    else if(cursors.down.isDown){
      hero.body.velocity.y += 200;
      this.vert = -2;
    }else{
        this.vert = 0;
    }
    if(cursors.left.isDown){
      hero.body.velocity.x -= 200;
      this.horiz = -2;
    }
    else if(cursors.right.isDown){
      hero.body.velocity.x += 200;
      this.horiz = 2;
    }else{
      this.horiz = 0;
    }
  }

  if(this.vert > 1){
    if(this.horiz > 1){
      this.direction = Phaser.TOP_RIGHT;
    }else if(this.horiz < -1){
      this.direction = Phaser.TOP_LEFT;
    }else{
      this.direction = Phaser.TOP_CENTER;
    }
  }else if(this.vert < -1){
    if(this.horiz > 1){
      this.direction = Phaser.BOTTOM_RIGHT;
    }else if(this.horiz < -1){
      this.direction = Phaser.BOTTOM_LEFT;
    }else{
      this.direction = Phaser.BOTTOM_CENTER;
    }
  }else{
    if(this.horiz > 1){
      this.direction = Phaser.RIGHT_CENTER;
    }else if(this.horiz < -1){
      this.direction = Phaser.LEFT_CENTER;
    }else if(this.direction == null){
      this.direction = Phaser.RIGHT_CENTER;
    }
  }

  if(game.input.keyboard.isDown(zKey) && game.state.current == 'battle'){
    function playerAttack(hero, enemy){
      enemy.damage(hitbox.dmg);
      enemy.knocked = true;
      console.log('clang');
      console.log(enemy.health);
    }

    hero.addChild(hitbox = new Hitbox(game, hero, 'melee'));
    // console.log(this.x + ',' + this.y + ',' + hitbox.x + ',' + hitbox.y);
    console.log('swish');
    game.physics.arcade.overlap(hitbox, enemies, playerAttack, null, this);
    hitbox.kill();
  }
};

// Hitbox constructor
Hitbox = function(game, hero, attack){
  if(attack == 'melee'){
    Phaser.Sprite.call(this, game, hero.x, hero.y, null);
    game.physics.arcade.enable(this);
    this.alignTo(hero, hero.direction)
    this.body.setSize(50, 50);
    game.add.existing(this);
    this.dmg = 20;
  }
};
Hitbox.prototype = Object.create(Phaser.Sprite.prototype);
Hitbox.prototype.constructor = Hitbox;

Hitbox.prototype.update = function(){
};
