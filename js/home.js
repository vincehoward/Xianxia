var home = {
  init: function(params){
    life = params['life'];
  },

  create: function(){
    game.add.tileSprite(0, 0, 1280, 720, 'grassy');
    game.world.setBounds(0, 0, 1280, 720);
    game.add.sprite(1000, 40, 'tree');
    // Hero
    hero = new Agent(this, 600, 700, life);
    // Doors
    doors = game.add.group();
    doors.add(door = new Door(this, 100, 140));
    doors.add(worldDoor = new Door(this, 1230, game.world.centerY));
  },

  update: function(){
    game.physics.arcade.overlap(hero, doors, this.changeState, null, this);
  },

  changeState: function(hero, doors){
    params = {
      'life': hero.life
    }
    if(doors == worldDoor){
      game.state.start('world', true, false, params);
    }else{
      game.state.start('inside', true, false, params);
    }
  }
};
