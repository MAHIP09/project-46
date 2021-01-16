var PLAY=0
var END=1
var gameState=PLAY
var l=3
var score=0

function preload(){
groundImage=loadImage("groundImage.jpg")
smallEnemyImage=loadImage("enemy.png")
player1=loadAnimation("boy.png","boy2.png","boy3.png",)
bulletImage=loadImage("bullet.png")
}
function setup(){
createCanvas(1200,400)
ground=createSprite(600,390,1200,20)
ground.addImage(groundImage)
ground.scale=2.5


player=createSprite(50,200,10,10)
player.shapeColor="red"
player.addAnimation("player1",player1)
player.scale=0.9

bulletGroup=new Group()
enemyGroup=new Group()

edges=createEdgeSprites()
}
function draw(){
    background("blue")
    ground.velocityX=-(3+2*score/150)
    
     

    if(gameState===PLAY){


    if(ground.x<0){
     ground.x=ground.width/2

    }
if(keyDown(UP_ARROW)){
  player.y=player.y-3

}
if(keyDown(DOWN_ARROW)){
    player.y=player.y+3
  
  }
  if(keyDown(LEFT_ARROW)){
    
    player.x=player.x-3
  
  }
  if(keyDown(RIGHT_ARROW)){
    player.x=player.x+3
  
  }
    if(keyWentDown("SPACE")){
       bullet=createSprite(player.x,player.y)
       bullet.velocityX=4
       bullet.scale=0.1
      bulletGroup.add(bullet)
      bullet.addImage(bulletImage)

     }
          if(player.isTouching(enemyGroup)){
            l=l-1
             enemyGroup.destroyEach()

          }

    if(bulletGroup.isTouching(enemyGroup)){
      enemyGroup.destroyEach()
      bulletGroup.destroyEach()
      score=score+50

    }
    player.bounce(edges)

    
  enemy()
    }

    if(gameState===END){
        ground.velocityX=0
        bulletGroup.setVelocityXEach(0)
        player.velocity=0
        enemyGroup.setVelocityXEach(0)
       
    }
      drawSprites()
      fill("blue")
      strokeWeight(3)
      stroke("green")
      textSize(20)
      text("Score-"+score,100,100)

      fill("red")
      strokeWeight(3)
      stroke("yellow")
      textSize(20)
      text("Lives="+l,1000,100)

      if(l===0){
        gameState=END
        fill ("black")
        strokeWeight(3)
        stroke("purple")
        textSize(40)
        text("Game Over",500,250)
       
       }
}
  function enemy(){
  if(frameCount%100===0){
     smallEnemy=createSprite(1200,200,30,30)
     smallEnemy.velocityX=-(10+score/30)
   smallEnemy.y=Math.round(random(50,350))
     
     smallEnemy.addImage(smallEnemyImage)
      smallEnemy.scale=0.3
     enemyGroup.add(smallEnemy)
    }




}