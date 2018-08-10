var battle = {
  init: function(params){
    life = params['life'];
  },

  create: function(){
    game.add.tileSprite(0, 0, 1280, 720, 'grassy');
    game.world.setBounds(0, 0, 1280, 720);
    // Hero
    hero = new Agent(this, 50, game.world.centerY, life);
    // Enemy
    enemies = game.add.group();
    alive = 0;
    dead = 0;
    for(i = 0; i < 3; i++){
      enemies.add(new Creature(this, game.world.randomX, game.world.randomY, 'bad'));
      alive++;
      enemies.children[i].events.onKilled.add(this.remaining, this);
    }

    console.log(alive);
  },

  update: function(){
    game.physics.arcade.collide(hero, enemies, this.enemyAttack, null, this);
    game.physics.arcade.overlap(hero, door, this.changeState, null, this);
  },

  enemyAttack: function(hero, enemy){
    this.knockback(enemy, hero);
  },

  knockback: function(knocker, knockee){
    if(!knockee.knocked){
      knockee.knocked = true;
      knocker.knocked = true;
      knocker.body.immovable = true;
      if(knockee.bounced = false){
        knockee.body.bounce.set(1);
        knockee.bounced = true;
      }else if(knockee.bounced = true){
        knockee.body.bounce.set(0);
      }
      game.time.events.add(500, this.knockEnd, this);
    }
  },

  knockEnd: function(){
    hero.body.bounce.set(0, 0);
    hero.knocked = false;
    hero.bounced = false;
  },

  remaining: function(){
    dead++;
    remain = alive - dead;
    console.log(remain);
    if((remain) == 0){
      this.allowExit();
    }
  },

  allowExit: function(){
    door = new Door(this, 20, game.world.centerY);
  },

  changeState: function(hero, door){
    params = {
      'life': hero.life
    }
    game.state.start('world', true, false, params);
  }
};
