// A - rock          X - loss
// B - paper         Y - draw
// C - scissors      Z - win

// weights:
// rock     - 1
// paper    - 2
// scissors - 3

// win  - 6
// draw - 3
// loss - 0

// order:
// rock
// scissors
// paper
// rock 


// Part One 

// const fs = require("fs")

// function readFileContent(filePath) {

//     let result = 0

//     const combinations = {AX: 4 , AY: 8 , AZ: 3 , BX: 1 , BY: 5 , BZ: 9 , CX: 7 , CY: 2 , CZ: 6}

//     const lines = fs.readFileSync(filePath, "utf-8").split("\n")

//     for (let line of lines) {
//        let newLine = line.slice(0, -1).replace(" ", "")
//      if (combinations[newLine])  result += combinations[newLine]
//     }
    
//     console.log(result)
// }

// readFileContent("input.txt")



// Part Two


function readFileContent(filePath) {

    let result = 0

    const combinations = {AX: 3 , AY: 4 , AZ: 8 , BX: 1 , BY: 5 , BZ: 9 , CX: 2 , CY: 6 , CZ: 7}

    const lines = fs.readFileSync(filePath, "utf-8").split("\n")
    

    for (let line of lines) {
       let newLine = line.slice(0, -1).replace(" ", "")
     if (newLine) result += combinations[newLine]

    }
    
    console.log(result)
}

readFileContent("input.txt")

// AX: lose {pick: scissors, score: 3} 
// AY: draw {pick: rock, score: 4} 
// AZ: win {pick: paper, score: 8}
// BX: lose {pick: rock, score: 1} 
// BY: draw {pick: paper, score: 5} 
// BZ: win {pick: scissors, score: 9}
// CX: lose {pick: paper, score: 2} 
// CY: draw {pick: scissors, score: 6} 
// CZ: win {pick: rock, score: 7} 
