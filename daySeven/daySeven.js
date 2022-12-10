//  const root =  {
//     "📁 a" : {
//         "📁 e": {
//             "📔 i" : "584", 
//         },
//         "📔 f" : "29116", 
//         "📔 g" : "2557", 
//         "📔 h.lst" : "62596", 
//     },
//     "📔 b.txt" : "14848514", 
//     "📔 c.dat" : "14848514",
//     "📁 d" : {
//         "📔 j" : "4060174", 
//         "📔 d.log" : "8033020", 
//         "📔 d.ext" : "5626152", 
//         "📔 k" : "7214296", 
//     }
// }


// $ cd /
// $ ls

// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d

// $ cd a
// $ ls

// dir e
// 29116 f
// 2557 g
// 62596 h.lst

// $ cd e
// $ ls

// 584 i

// $ cd ..
// $ cd ..

// $ cd d
// $ ls

// 4060174 j
// 8033020 d.log
// 5626152 d.ext 
// 7214296 k

const  fileReader = require("../miscelleneous/fileReader")
const   fileWriter = require("../miscelleneous/fileWriter")


function generateTree(filePath){

    const lines = fileReader(filePath)

    let instructionArray = lines.map((line) => line.slice(0, -1))

    instructionArray  = instructionArray.splice(1)

    const root = {}

    drawTreeRecursive(root, instructionArray)

    return root
}



function drawTreeRecursive(currentDirectory, instructionArray){
   
    let current = currentDirectory
    let instruction = instructionArray.splice(0, 1)

    if (instruction[0].startsWith("$ cd")){
      let instructionParts = instruction[0].split(" ")

      if(instructionParts[2] === "..") return

      current = current['📁folder-' + instructionParts[2]]

      drawTreeRecursive(current, instructionArray)
    }

    if (instruction[0].startsWith("$ ls")){

        while (instructionArray[0].startsWith("dir") || /^\d/.test(instructionArray[0]) ) {

            let newInstruction = instructionArray.splice(0, 1)
            let instructionParts = newInstruction[0].split(" ")
   
            if (instructionParts[0] === "dir") {
                current["📁folder-" + instructionParts[1]] = {}
            }else{
              current["⬜file-" + instructionParts[1]] = instructionParts[0]
            }

        }
        
    }
    console.log({testCurrent: current})
    console.log({testInstructionArray: instructionArray})

    drawTreeRecursive(current, instructionArray)
}

const tree = generateTree("testInput.txt")

console.log(tree)