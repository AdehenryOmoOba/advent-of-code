const fileReader = require("../miscelleneous/fileReader");

const lines = fileReader(`${__dirname}\\input.txt`)

let instructionArray = lines.map((line) => {
    let newLine = line.split(" ")
    return {direction: newLine[0], numberOfMoves: Number(newLine[1])}
})

const movesDefinition = {
  R: { x: 1, y: 0},
  L: { x: -1, y: 0},
  U: {x: 0, y: 1}, 
  D: { x: 0, y: -1}
}

class Knot {
    constructor(name, x, y){
      this.name = name,
      this.coord = {x: x, y: y},
      this.coordRecord = new Set()
      this.addCoord(x, y)
    }

    addCoord(x, y){
        this.coordRecord.add(`x:${x}, y:${y}`)
    }
}

let head = new Knot("H", 0, 0)
let tail = new Knot("T", 0, 0)


function move(moveInstruction) {

  for (let numOfMovesIndex = 0; numOfMovesIndex < moveInstruction.numberOfMoves; numOfMovesIndex++) {
  
    let move = movesDefinition[moveInstruction.direction]
  
    // move head
    head.coord.x += move.x
  
    head.coord.y += move.y
  
    // move tail
    let xDiff = head.coord.x - tail.coord.x
  
    let yDiff = head.coord.y - tail.coord.y
  
    let maxDiff = Math.max(Math.abs(xDiff), Math.abs(yDiff))
  
    if(maxDiff > 1){    
  
      let newX = Math.abs(xDiff) === 2 ? xDiff / 2 : xDiff
  
      let newY = Math.abs(yDiff) === 2 ? yDiff / 2 : yDiff
          
      tail.coord.x += newX
  
      tail.coord.y += newY
  
    }
    tail.addCoord(tail.coord.x, tail.coord.y)
  }
}

for (let instructionIndex = 0; instructionIndex < instructionArray.length; instructionIndex++) {
   move(instructionArray[instructionIndex])
}

console.log(tail.coordRecord.size)

///////////////////// Part Two ////////////////////////////

class Knot2 {
    constructor(name, x, y){
      this.name = name,
      this.coord = {x: x, y: y},
      this.coordRecord = new Set()
      this.addCoord(x, y)
    }

    addCoord(x, y){
        this.coordRecord.add(`x:${x}, y:${y}`)
    }
}

let head2 = new Knot2("H", 0, 0)
let b1 = new Knot2("B", 0, 0)
let b2 = new Knot2("b2", 0, 0)
let b3 = new Knot2("b3", 0, 0)
let b4 = new Knot2("b4", 0, 0)
let b5 = new Knot2("b5", 0, 0)
let b6 = new Knot2("b6", 0, 0)
let b7 = new Knot2("b7", 0, 0)
let b8 = new Knot2("b8", 0, 0)
let tail2 = new Knot2("T", 0, 0)

const knotsArray = [head2,b1,b2,b3,b4,b5,b6,b7,b8,tail2]

function moveSnake(knotsArray, moveInstruction){

    for (let numOfMovesIndex = 0; numOfMovesIndex < moveInstruction.numberOfMoves; numOfMovesIndex++) {
  
      let move = movesDefinition[moveInstruction.direction]
  
      // move head 
      head2.coord.x += move.x
  
      head2.coord.y += move.y
  
      // move rest of the body
      for (let knotIndex = 1; knotIndex < knotsArray.length; knotIndex++) {
  
        let  prevKnotCoord = knotsArray[knotIndex - 1].coord
  
        let xDiff = prevKnotCoord.x - knotsArray[knotIndex].coord.x
  
        let yDiff = prevKnotCoord.y - knotsArray[knotIndex].coord.y
  
        let maxDiff = Math.max(Math.abs(xDiff), Math.abs(yDiff))
  
        if(maxDiff > 1){    
  
          let newX = Math.abs(xDiff) === 2 ? xDiff / 2 : xDiff
  
          let newY = Math.abs(yDiff) === 2 ? yDiff / 2 : yDiff
          
          knotsArray[knotIndex].coord.x += newX
  
          knotsArray[knotIndex].coord.y += newY
  
        }
      }
      tail2.addCoord(tail2.coord.x, tail2.coord.y)
  }
}

for (let instructionIndex = 0; instructionIndex < instructionArray.length; instructionIndex++) {
  moveSnake(knotsArray, instructionArray[instructionIndex])
}

 console.log("tail ",tail2.coordRecord.size)