const fileReader = require("../miscelleneous/fileReader");

const lines = fileReader(`${__dirname}\\input.txt`)

let instructionArray = lines.map((line) => {
    let newLine = line.split(" ")
    return {action: newLine[0], x: parseInt(newLine[1]) || 0}
})


function getSignalSum(instructionArray){

 let x = 1
 
 let cycleCount = 0

 let signalStrengthSum = 0

 function checkCycle(cycle){
  return cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle === 180 || cycle === 220 ? true : false
 }

 for (let instruction of instructionArray) {
    
  if(instruction.action !== "noop"){

    cycleCount++
    if(checkCycle(cycleCount)) signalStrengthSum += cycleCount * x

    cycleCount++
    if(checkCycle(cycleCount)) signalStrengthSum += cycleCount * x

    x += instruction.x

  }else{

    cycleCount++
    if(checkCycle(cycleCount)) signalStrengthSum += cycleCount * x

  }
 }
 console.log(signalStrengthSum)
}

getSignalSum(instructionArray)

//////////////// Part Two //////////////

let screen = new Array(6).fill("").map(() => new Array(40).fill("#"))

function generateCode(screen, array){

    let instructionIndex = 0

    let currentInstruction = array[instructionIndex]

    let spriteLocation = 1

    let cycleCount = 0

    for (let rowIndex = 0; rowIndex < screen.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < screen[rowIndex].length; columnIndex++) {
           
            let spriteRange = [spriteLocation - 1, spriteLocation, spriteLocation + 1] 

            if(currentInstruction?.action.startsWith("addx")){

                if(spriteRange.includes(columnIndex)){
                    screen[rowIndex][columnIndex] = "o"
                }else{
                    screen[rowIndex][columnIndex] = " "
                }

                cycleCount++

                if(cycleCount === 2){
                    cycleCount = 0
                    spriteLocation += currentInstruction.x
                    instructionIndex++
                    currentInstruction = array[instructionIndex]
                }

            }else{

                if(spriteRange.includes(columnIndex)){
                    screen[rowIndex][columnIndex] = "o"
                }else{
                    screen[rowIndex][columnIndex] = " "
                }
                instructionIndex++
                currentInstruction = array[instructionIndex]

            }
        }
    }
    for (const row of screen) {
        console.log(row.join(" "))
    }
}

generateCode(screen, instructionArray)