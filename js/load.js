var load = {
  preload: function(){
    var loadingLabel = game.add.text(512, 384, 'loading',
                                    {font: '30px Courier', fill: '#FFFFFF'});

    game.load.image('splash', 'assets/splash.png');
    game.load.spritesheet('rain', 'assets/rain.png');
    game.load.image('grassy', 'assets/grassy.png');
    game.load.image('hero', 'assets/hero.jpg');
    game.load.image('door', 'assets/door.jpg');
    game.load.image('floor', 'assets/map2.jpg');
    game.load.image('gMob', 'assets/gMob.png');
    game.load.image('nMob', 'assets/nMob.png');
    game.load.image('bMob', 'assets/bMob.png');
    game.load.image('tree', 'assets/tree.png');
    game.load.image('hitbox', 'assets/hitbox.png');
  },

  create: function(){
    game.state.start('splash');
  }
};
