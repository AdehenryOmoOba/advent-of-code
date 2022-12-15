const fileReader = require("../miscelleneous/fileReader");

const lines = fileReader(`${__dirname}\\input.txt`)

let instructionArray = lines.map((line) => {
    let newLine = line.split(" ")
    return {direction: newLine[0], numberOfMoves: Number(newLine[1])}
})

class Knot {
    constructor(name, x, y){
      this.name = name,
      this.currentCoord = {x: x, y: y},
      this.coordRecord = new Set()
      this.updateCoordRecord(x, y)
    }

    updateCoordRecord(x, y){
        this.currentCoord =  {x: x, y: y}
        this.coordRecord.add(`x:${x},y:${y}`)
    }
}

let head = new Knot("H", 0, 0)
let tail = new Knot("T", 0, 0)


function move(moveInstruction){

    function diagonalUR(x, y) {
        // increment on y and x axis
        let newX = ++x
        let newY = ++y
        tail.updateCoordRecord(newX, newY)
    }
    function diagonalUL(x, y) {
        // increment on y axis and decrement on x axis
          let newX = --x
          let newY = ++y
          tail.updateCoordRecord(newX, newY)
    }
    function diagonalDR(x, y) {
        // decrement on y axis and increment on x axis
          let newX = ++x
          let newY = --y
          tail.updateCoordRecord(newX, newY)
    }
    function diagonalDL(x, y) {
        // decrement on y and x axis
          let newX = --x
          let newY = --y
          tail.updateCoordRecord(newX, newY)
    }


    // if moveInstruction.direction === "R", increment 'x' by moveInstruction.numberOfMoves
    // if moveInstruction.direction === "L", decrement 'x' by moveInstruction.numberOfMoves
    
    // if moveInstruction.direction === "U", increment 'y' by moveInstruction.numberOfMoves
    // if moveInstruction.direction === "D", decrement 'y' by moveInstruction.numberOfMoves

    let moveCount = 0

    // move right
    if(moveInstruction.direction === "R"){
    while (moveCount < moveInstruction.numberOfMoves) {
            let headCurrentX = parseInt(head.currentCoord.x)
            let headCurrentY = parseInt(head.currentCoord.y)
            let headNewX = ++headCurrentX
            head.updateCoordRecord(headNewX, headCurrentY)

            // chech distance of head from tail on x axis, if it is > 1, move tail closer by 1 step
            if(headNewX - parseInt(tail.currentCoord.x) > 1){

                if(Math.abs(headNewX - parseInt(tail.currentCoord.x)) + Math.abs(headCurrentY - parseInt(tail.currentCoord.y)) > 2){
                    if(parseInt(head.currentCoord.x) > parseInt(tail.currentCoord.x)) {
                        if(parseInt(head.currentCoord.y) > parseInt(tail.currentCoord.y)){
                            diagonalUR(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }else{
                            diagonalDR(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }
                    }else{
                        if(parseInt(head.currentCoord.y) > parseInt(tail.currentCoord.y)){
                            diagonalUL(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }else{
                            diagonalDL(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }
                    }

                }else{
                let tailCurrentX = parseInt(tail.currentCoord.x)
                let tailCurrentY = parseInt(tail.currentCoord.y)
                let tailNewX = ++tailCurrentX
                tail.updateCoordRecord(tailNewX, tailCurrentY)
                }
            }
            moveCount++
        }
    }

    // move left
    if(moveInstruction.direction === "L"){
    while (moveCount < moveInstruction.numberOfMoves) {
            let headCurrentX = parseInt(head.currentCoord.x)
            let headCurrentY = parseInt(head.currentCoord.y)
            let headNewX = --headCurrentX
            head.updateCoordRecord(headNewX, headCurrentY)

            // chech distance of head from tail on x axis, if it is > 1, move tail closer by 1 step
            if(Math.abs(headNewX - parseInt(tail.currentCoord.x)) > 1){

                if(Math.abs(headNewX - parseInt(tail.currentCoord.x)) + Math.abs(headCurrentY - parseInt(tail.currentCoord.y)) > 2){
                    if(parseInt(head.currentCoord.x) > parseInt(tail.currentCoord.x)) {
                        if(parseInt(head.currentCoord.y) > parseInt(tail.currentCoord.y)){
                            diagonalUR(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }else{
                            diagonalDR(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }
                    }else{
                        if(parseInt(head.currentCoord.y) > parseInt(tail.currentCoord.y)){
                            diagonalUL(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }else{
                            diagonalDL(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }
                    }

                }else{
                    
                let tailCurrentX = parseInt(tail.currentCoord.x)
                let tailCurrentY = parseInt(tail.currentCoord.y)
                let tailNewX = --tailCurrentX
                tail.updateCoordRecord(tailNewX, tailCurrentY)
                }
            }
            moveCount++
        }
    }

    // move up
    if(moveInstruction.direction === "U"){
    while (moveCount < moveInstruction.numberOfMoves) {
            let headCurrentX = parseInt(head.currentCoord.x)
            let headCurrentY = parseInt(head.currentCoord.y)
            let headNewY = ++headCurrentY
            head.updateCoordRecord(headCurrentX, headNewY)

            // chech distance of head from tail on y axis, if it is > 1, move tail closer by 1 step
            if(headNewY - parseInt(tail.currentCoord.y) > 1){
                if(Math.abs(headNewY - parseInt(tail.currentCoord.y)) + Math.abs(headCurrentX - parseInt(tail.currentCoord.x)) > 2){
                    if(parseInt(head.currentCoord.x) > parseInt(tail.currentCoord.x)) {
                        if(parseInt(head.currentCoord.y) > parseInt(tail.currentCoord.y)){
                            diagonalUR(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }else{
                            diagonalDR(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }
                    }else{
                        if(parseInt(head.currentCoord.y) > parseInt(tail.currentCoord.y)){
                            diagonalUL(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }else{
                            diagonalDL(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }
                    }

                }else{
                 let tailCurrentX = parseInt(tail.currentCoord.x)
                 let tailCurrentY = parseInt(tail.currentCoord.y)
                 let tailNewY = ++tailCurrentY
                 tail.updateCoordRecord(tailCurrentX, tailNewY)
                }
            }
            moveCount++
        }
    }

    // move down
    if(moveInstruction.direction === "D"){
    while (moveCount < moveInstruction.numberOfMoves) {
            let headCurrentX = parseInt(head.currentCoord.x)
            let headCurrentY = parseInt(head.currentCoord.y)
            let headNewY = --headCurrentY
            head.updateCoordRecord(headCurrentX, headNewY)

            // chech distance of head from tail on y axis, if it is > 1, move tail closer by 1 step
            if(Math.abs(headNewY - parseInt(tail.currentCoord.y)) > 1){

                if(Math.abs(headCurrentX - parseInt(tail.currentCoord.x)) + Math.abs(headNewY - parseInt(tail.currentCoord.y)) > 2){
                    if(parseInt(head.currentCoord.x) > parseInt(tail.currentCoord.x)) {
                        if(parseInt(head.currentCoord.y) > parseInt(tail.currentCoord.y)){
                            diagonalUR(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }else{
                            diagonalDR(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }
                    }else{
                        if(parseInt(head.currentCoord.y) > parseInt(tail.currentCoord.y)){
                            diagonalUL(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }else{
                            diagonalDL(parseInt(tail.currentCoord.x),parseInt(tail.currentCoord.y))
                        }
                    }

                }else{
                    let tailCurrentX = parseInt(tail.currentCoord.x)
                    let tailCurrentY = parseInt(tail.currentCoord.y)
                    let tailNewY = --tailCurrentY
                    tail.updateCoordRecord(tailCurrentX, tailNewY)
                }
            }
            moveCount++
        }
    }
}

let callCount = 0

while (callCount < instructionArray.length) {
    move(instructionArray[callCount])
    callCount++
}

console.log(tail.coordRecord.size)



