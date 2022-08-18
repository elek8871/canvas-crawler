//grab canvas element
//get 2d context from canvas
const canvas = document.querySelector("canvas")
//grab movement display
const movementDisplay =document.querySelector("#movement")
//grab status
const statusDisplay = document.querySelector("#status")
 //console.log (canvas, movementDisplay, statusDisplay)


// get rendering context from canvas 
 const ctx = canvas.getContext('2d')
// //set canvas resolution to window resolution
 canvas.setAttribute("height", getComputedStyle(canvas)["height"])
 canvas.setAttribute("width", getComputedStyle(canvas)["width"])


// //  #1  set context properties
// ctx.fillStyle ="green"

// // #2 invoke context method to render things 
// //         fillRect = x, y, w, h in pixels*  (rect drawn from upper left corner x.y)
// //          x goes across (w) y goes to length  = where the rect is placed
// ctx.fillRect (10,10, 100, 100)

// // set properties
// ctx.strokeStyle = 'purple'
// ctx.lineWidth = 20
// //invoke context (rec, circles, lines)
// ctx.strokeRect (45, 100, 150, 200)

///making the game

function drawBox (x, y, width, height, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}


drawBox(10, 10, 100, 100, "purple")

canvas.addEventListener ("click", e => {
    //console.log(e.offsetX, e.offsetY)
    drawBox(e.offsetX, e.offsetY, 50, 50, "blue")
})

class Crawler {
    constructor (x, y, width, height, color){
        this.x =x
        this.y = y
        this.width= width
        this.height = height
        this.color = color
        this.alive = true
    }

    render () {
        ctx.fillStyle = this.color
        ctx.fillRect (this.x, this.y, this.width, this.height)
    }
}

// define game objects
const hero = new Crawler(10,10, 35, 35, 'hotpink')
const ogre = new Crawler(600, 200, 100, 150, 'green')

//define movement handler function
// speed is how many px the hero moves
const speed = 10
function movementHandler(e) {
    switch(e.key){
        case("w"):
            //move hero up
            hero.y -= speed
            break
        case('s'):
            //move down
            hero.y += speed
            break
        case("a"):
            //move left
            hero.x  -= speed
            break
        case("d"):  
            //move right
            hero.x += speed
            break
    }
}
document.addEventListener('keypress',movementHandler)
// define collision detection algorythm = "hit box"
// need 4 collision checks - each side of hero with each side of orge intersectionss
//axis aligned bounding box collision detection (AABB)
function detectHit (){
    const ogreLeft = hero.x + hero.width >= ogre.x
    //left side of h vs right side of ogre
    const ogreRight = hero.x <= ogre.x + ogre.width
    const ogreTop = hero.y + hero.height >= ogre.y
    const ogreBottom = hero.y <= ogre.y + ogre.height

    if (ogreRight && ogreLeft && ogreTop && ogreBottom) {
        console.log ("the hero has collided")
    // when collision accure stop game
    // stop rendering orge and display message
      ogre.alive = false
      statusDisplay.innerText = "you killed shrek. who is the monster now"
    }
}
// define game play loop
const gameLoopInterval = setInterval(gameLoop, 60)
function gameLoop() {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // do business logic of game - check for collisions
    detectHit()
    // render all the game pieces
    hero.render()
    //ogre.render()
    // only render orge if alive
    if (ogre.alive) {
        ogre.render()
    }
}
