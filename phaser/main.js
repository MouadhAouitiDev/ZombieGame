var main = {
	preload: function() {
		// Charger les fichiers
		game.load.image('player', 'assets/player.png');
        game.load.image('mechant', 'assets/mechant.png');


	},
	create: function() {  
// Afficher et paramétrer :
		game.stage.backgroundColor = '#A91101';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.renderer.renderSession.roudPixels = true;
// Player :
		this.player = game.add.sprite(300, 500, 'player');
        this.player.scale.setTo(0.5);
		//this.player.anchor.setTo(0.5);
        game.physics.arcade.enable(this.player);
        this.cursors= game.input.keyboard.createCursorKeys();
        
        this.mechants = game.add.group();

        
        this.timer = game.time.events.loop(200, this.ajouterUnMechant, this);

        
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0" , {font: "30px Arial", fill:"#fff"});

	},
    
	update: function() {
// Mécanique du jeu 60 fps:
        game.physics.arcade.overlap(this.player, this.mechants, this.restartGame, null, this);

        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
     if (this.cursors.left.isDown) {
            
          this.player.body.velocity.x =  vitesse * -1;
        }
        
        if (this.cursors.right.isDown) {
            
          this.player.body.velocity.x =  vitesse;
        }
        if (this.cursors.up.isDown) {
            
          this.player.body.velocity.y = vitesse * -1;
        }
         if (this.cursors.down.isDown) {
            
          this.player.body.velocity.y =  vitesse;
        }
         if (this.player.inWorld == false) {
             this.restartGame();
         }
        
        
	},
    
    restartGame: function() {

        game.state.start('main');
        
    },

    
   ajouterUnMechant: function() {
        var position = Math.floor(Math.random() * 950) + 1;
        var mechant = game.add.sprite(position, -50, 'mechant');
        game.physics.arcade.enable(mechant);
        mechant.body.gravity.y = 200;
        this.mechants.add(mechant);
        mechant.checkWorldBounds = true;
        mechant.outOfBoundsKill = true;
       
        this.score += 20;
        this.labelScore.text = this.score;

        
        
    }
    
};
var reg = {};

function createModals() {
  reg.modal.createModal({
            type:"modal1",
            includeBackground: true,
            modalCloseOnInput: true,
            itemsArr: [
                {
            type: "graphics",
            graphicColor: "0xffffff",
            graphicWidth: 300,
            graphicHeight: 300,
            graphicRadius: 40
        }, {
            type: "text",
            content: "The white behind me\nis a [Phaser.Graphic]",
            fontFamily: "Luckiest Guy",
            fontSize: 22,
            color: "0x1e1e1e",
            offsetY: -50
        }
            ]
        }); 
}

function showModal1(){
  reg.modal.showModal("modal1");
}

var GameState = function(game) {
};

GameState.prototype.create = function() {
  reg.modal = new gameModal(game);
  createModals();
  var m1 = this.game.add.button(30, 50, "m1", showModal1);
};

var game = new Phaser.Game(750, 380, Phaser.CANVAS, 'game');
game.state.add('game', GameState, true);


var game = new Phaser.Game(1000, 1000, Phaser.AUTO, 'gameDiv');
var vitesse = 650;
game.state.add('main', main);
game.state.start('main');