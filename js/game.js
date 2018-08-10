// Game Start
var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv');

game.state.add('splash', splash);
game.state.add('home', home);
game.state.add('inside', inside);
game.state.add('world', world);
game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('battle', battle);

game.state.start('boot');
