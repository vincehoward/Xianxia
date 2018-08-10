var boot = {
  create: function(){
    // Start arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.state.start('load');
  }
};
