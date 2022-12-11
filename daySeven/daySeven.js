const fs = require("fs")
const fileReader = require("../miscelleneous/fileReader")
const fileWriter = require("../miscelleneous/fileWriter")



function writeObject(directory, array){

  let childArray = array.slice()

  if (childArray[0]?.startsWith("$ ls")){

    childArray.splice(0, 1)

    while (childArray.length && childArray[0].startsWith("dir") || childArray.length && /^\d/.test(childArray[0]) ) {
  
      let newInstruction = childArray.splice(0, 1)
      let instructionParts = newInstruction[0].split(" ")
  
      if (instructionParts[0] === "dir") {
          directory["📁folder-" + instructionParts[1]] = {}
      }else{
        directory["⬜file-" + instructionParts[1]] = instructionParts[0]
      }
  
    }
  }

      if (childArray.length && childArray[0].startsWith("$ cd")) {
      
      let instruction = childArray.splice(0, 1)

      let instructionParts = instruction[0].split(" ")

      if(instructionParts[2] === "..") {
        return {directory, childArray}
        // return 
      } else{
         const result = writeObject(directory['📁folder-' + instructionParts[2]], childArray)
         childArray = result.childArray
      }
    }
  
  return {directory, childArray}
}

function generateTree(filePath) {

    const lines = fileReader(filePath)

    let instructionArray = lines.map((line) => line.slice(0, -1))

    instructionArray  = instructionArray.splice(1)

    let root = {}

   while(instructionArray.length){

    const result = writeObject(root, instructionArray)

    root = result.directory

    instructionArray = [...result.childArray]

   }

    return {root, instructionArray}
 } 

  const {root, instructionArray} = generateTree(`${__dirname}\\testInput.txt`)
  console.log({root, instructionArray})
  fileWriter(JSON.stringify({root}, null, 3))