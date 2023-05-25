var playerPos = { x: 5, y: 8};
var started = false;
var bullets = [];
var enemies = [[],[],[]];
var temp = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
var level = 1;



function checkCollisions() {
    for (var i = 0; i < bullets.length; i++) {
      var bullet = bullets[i];
      var bulletPos = {
        x: parseInt(bullet.css('grid-column-start')),
        y: parseInt(bullet.css('grid-row-start'))
      };
  
      for (var j = 0; j < 3; j++) {
        for (var k = 0; k < 9; k++) {
          var enemy = enemies[j][k];
          if (enemy !== 0) {
            var enemyPos = {
              x: parseInt(enemy.css('grid-column-start')),
              y: parseInt(enemy.css('grid-row-start'))
            };
  
            if (bulletPos.x === enemyPos.x && bulletPos.y === enemyPos.y) {
              bullet.remove();
              bullets.splice(i, 1);
              i--;
              enemy.remove();
              enemies[j][k] = 0;
            }
          }
        }
      }
    }
  }
  
//enemy display
function enemyPattern(){
    for(let i=0; i<3; i++){
        for(let j=0; j<9; j++){
            let E = Math.round(Math.random());
            enemies[i][j] = E;
        }
    }
}

function enemyEntry() {
    enemyPattern();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 9; j++) {
        if (enemies[i][j] === 1) {
          var enemy = $('<div class="enemy"><img src="./assets/images/Enemy1.png" alt="" class="enemy"><div>')
          enemy.css('grid-column-start', j + 1);
          enemy.css('grid-row-start', i + 1);
          $('.gameBoard').append(enemy);
          enemies[i][j] = enemy;
        }
      }
    }
  }
  

$('.player').css('grid-column-start', playerPos.x);
$('.player').css('grid-row-start', playerPos.y);
$(document).keydown(function (e) {
    if (!started) {
        $('.title').html("<h1 class='title'>Level "+level+"</h1>");
        enemyEntry();
        $(document).on("keydown", function (e) {
            if (e.key === 'ArrowLeft') {
                if (playerPos.x > 1 && playerPos.x <= 9) {
                    playerPos.x -= 1;
                    $('.player').css('grid-column-start', playerPos.x);
                }
            }
            if (e.key === 'ArrowRight') {
                if (playerPos.x >= 1 && playerPos.x < 9) {
                    playerPos.x += 1;
                    $('.player').css('grid-column-start', playerPos.x);
                }
            }
            if (e.key === ' ') {
                var bulletPos = { x: playerPos.x, y: playerPos.y - 1 };
                var bullet = $('<div class="bullet"></div>');
                bullet.css('grid-column-start', bulletPos.x);
                bullet.css('grid-row-start', bulletPos.y);
                $('.gameBoard').append(bullet);
                bullets.push(bullet);
            }
        });
        
        started = true;
    }
});

function updateBullets() {
    for (var i = 0; i < bullets.length; i++) {
      var bullet = bullets[i];
      var currentRow = parseInt(bullet.css('grid-row-start'));
      bullet.css('grid-row-start', currentRow - 1);
      if (currentRow <= 1) {
        bullet.remove();
        bullets.splice(i, 1);
        i--;
      }
    }
    
    checkCollisions();
    emptyEnemy();
  }


const equalsCheck = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}
function emptyEnemy(){
    if(equalsCheck(enemies, temp)){
        level=level+1;
        $('.title').html("<h1 class='title'>Level "+level+"</h1>");
        enemyEntry();
    }
}



function levelClear(level){
    level++;
    enemyEntry();
}

setInterval(function () {
    updateBullets();
    
}, 100);


