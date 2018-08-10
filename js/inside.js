var inside = {
  init: function(params){
    life = params['life'];
  },

  create: function(){
    ground = game.add.sprite(0, 0, 'floor');
    game.world.setBounds(0, 0, 1024, 768);
    // Hero
    hero = new Agent(this,60, 150, life);
    // Door
    door = new Door(this, 60, 70);
  },

  update: function(){
    game.physics.arcade.overlap(hero, door, this.changeState, null, this);
  },

  changeState: function(hero, door){
    params = {
      'life': hero.life
    }
    game.state.start('home', true, false, params);
  }
};
