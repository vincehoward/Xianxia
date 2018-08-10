var world = {
  init: function(params){
    life = params['life'];
  },

  create: function(){
    game.add.tileSprite(0, 0, 1600, 1200, 'grassy');
    game.world.setBounds(0, 0, 1600, 1200);
    // Hero
    hero = new Agent(this,50, game.world.centerY, life);
    // Camera
    game.camera.follow(hero);
    // Doors
    doors = game.add.group();
    doors.add(door = new Door(this, 20, game.world.centerY));
    doors.add(dummy = new Creature(this, 200, 200, 'bad'));
    // Good mob
    bunny = new Creature(this, game.world.randomX, game.world.randomY, 'good');
  },

  update: function(){
    game.physics.arcade.overlap(hero, doors, this.changeState, null, this);
  },

  changeState: function(hero, doors){
    params = {
      'life': hero.life
    }
    if(doors == door){
      game.state.start('home', true, false, params);
    }else{
      game.state.start('battle', true, false, params);
    }
  }
};
