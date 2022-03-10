var boy,boyimg
var ground,groundimg
var zombie,zombieimg
var score=0

var PLAY=1
var end=0
var gameState=PLAY
var invground,rock,rockimg
var rockgroup,zombiegroup

function preload(){
 boyimg=loadImage("boy.png")
 groundimg=loadImage("ground2.png")
 zombieimg=loadImage("zombie.png")
 rockimg=loadImage("rock.png")
}

function setup(){
  createCanvas(700,300)
  

  boy=createSprite(80,220)
  boy.addImage("boy",boyimg)
  boy.scale=0.3
  boy.debug=true
  boy.setCollider("rectangle",0,0,130,400)

  ground=createSprite(300,250,700,10)
  ground.addImage("ground",groundimg)
  
  

  invground=createSprite(300,295,700,10)
  invground.visible=false

   zombiegroup=new Group()
   rockgroup=new Group()



}

function draw(){
  background(200)
  text("SCORE:",+score,600,100)

  
  if(gameState===PLAY){
      if(keyDown("space") && boy.y>180){
      boy.velocityY=-7
    }
    boy.velocityY=boy.velocityY+0.2

    ground.velocityX=-(1+score/100)
    score=score+Math.round(getFrameRate()/30)
    

    if(ground.x<0){
      ground.x=ground.width/2
    }

    

    if(score>0 &&score%100==0 ){
        spawnrock()
    }

    if(boy.isTouching(zombiegroup) || boy.isTouching(rockgroup)){
      gameState=end

    }


    

    

    boy.collide(invground)
  }

  if(gameState==end){
    
    rockgroup.destroyEach()
    zombiegroup.destroyEach()

    boy.destroy()
    ground.destroy()
    
    
    
    
    background("black")
    fill("yellow")
    stroke("silver")
    strokeWeight("10")
    textSize("30")

    text("GAME OVER",350,150)


    




    
  }


  

  spawnzombie()

 drawSprites()

}

   function spawnzombie(){
      if(frameCount%250==0){
        zombie=createSprite(600,230)
        zombie.addImage("zombie",zombieimg)
        zombie.velocityX=-(1+score/100)
        zombie.scale=0.2
        zombie.lifetime=250


        zombiegroup.add(zombie)
      }

   }
  
   function spawnrock(){
     if(frameCount%100==0){
       rock=createSprite(650,Math.round(random(10,100)))
       rock.addImage("rock",rockimg)
       rock.velocityX=-(1+score/100)
       rock.scale=0.5
       rock.lifetime=40

       rockgroup.add(rock)
     }
   }



