const fs = require("fs")
const fileReader = require("../miscelleneous/fileReader")
const fileWriter = require("../miscelleneous/fileWriter")


function writeObject(directory, array, stack){

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
    stack.push(directory)
  }

      if (childArray.length && childArray[0].startsWith("$ cd")) {
      
      let instruction = childArray.splice(0, 1)

      let instructionParts = instruction[0].split(" ")

      if(instructionParts[2] === "..") {
        stack.pop()
        const result = writeObject(stack[stack.length - 1], childArray, stack)
        childArray = result.childArray
        stack = result.stack
      } else{
        writeObject(stack[stack.length - 1]['📁folder-' + instructionParts[2]], childArray, stack)
      }
    }
  return {directory ,childArray, stack}
}

function generateTree(filePath) {

    const lines = fileReader(filePath)

    let instructionArray = lines.map((line) => line.slice(0, -1))

    instructionArray  = instructionArray.splice(1)

    let root = {}

    let stack = [root]

    const {directory} = writeObject(root, instructionArray, stack)

    return directory
 } 

  const rootDirectory = generateTree(`${__dirname}\\input.txt`)
  fileWriter(JSON.stringify({rootDirectory}, null, 3))