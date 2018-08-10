var splash = {
  create: function(){
    var bg = game.add.sprite(0, 0, 'splash')
    enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    // Rain
    var emitter = game.add.emitter(game.world.centerX, 0, 400);
    emitter.width = game.world.width;
    // emitter.angle = 30;
    emitter.makeParticles('rain');
    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.5;
    emitter.setYSpeed(300, 500);
    emitter.setXSpeed(-5, 5);
    emitter.minRotation = 0;
    emitter.maxRotation = 0;
    emitter.start(false, 1600, 5, 0);

    // Title
    var style = { font: "bold 32px Courier", fill: "#000000", boundsAlignH: "center", boundsAlignV: "middle" };
    text = game.add.text(0, 0, "i m m o r t a l", style);
    text.setTextBounds(80, 350, 800, 100);
    // Start text
    startTxt = game.add.text(game.world.centerX, 550, "Press Enter");
    startTxt.alpha = 0.1;
    game.add.tween(startTxt).to({alpha: 1}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 100, true);
  },

  update: function(){
    if(enter.isDown){
      var params = {
        'life': 100
      };
      game.state.start('home', true, false, params);
    }
  }
};
