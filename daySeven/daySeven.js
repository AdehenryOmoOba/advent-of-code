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

  const rootDirectory = generateTree(`${__dirname}\\testInput.txt`)
  // fileWriter(JSON.stringify({rootDirectory}, null, 3))

//   let dir = {
//     "📁folder-rootDirectory": {
//        "📁folder-a": {
//           "📁folder-e": {
//              "⬜file-i": "584"
//           },
//           "⬜file-f": "29116",
//           "⬜file-g": "2557",
//           "⬜file-h.lst": "62596"
//        },
//        "⬜file-b.txt": "14848514",
//        "⬜file-c.dat": "8504156",
//        "📁folder-d": {
//           "⬜file-j": "4060174",
//           "⬜file-d.log": "8033020",
//           "⬜file-d.ext": "5626152",
//           "⬜file-k": "7214296"
//        }
//     },
//     "⬜file-test": "29116"
//  }

 //rootDirectory : 48410281
 //📁folder-rootDirectory : 48381165
 //📁folder-a  : 94853 //
//📁folder-d : 24933642
//📁folder-e : 584 //



 let stack = new Map()
 let directorySizeMap = {}


 function sumDirectorySizes(currentDirectoryKey, currentDirectory, stack, directorySizeMap) {

     stack.set(currentDirectoryKey, {parentKey: currentDirectoryKey, childValue: currentDirectory})

    let allFolders = []

    while(stack.size){
      
      let currentKey = [...stack.keys()].at(-1)
      
      let currentValue = stack.get(currentKey)
      
      let currentSize = 0
      
      for (let item in currentValue.childValue){
        if (item.startsWith('⬜file')) {
          currentSize += Number(currentValue.childValue[item])
        }
      }
      
      allFolders.push({[currentKey]: currentSize, parent: currentValue.parentKey})
   
     stack.delete(currentKey)

    for (let item in currentValue.childValue){
      if (item.startsWith('📁folder')) {
        stack.set(item, {parentKey: currentKey, childValue: currentValue.childValue[item]})
      }
   }
  }

  console.log({allFolders})
 }

 sumDirectorySizes("📁folder-rootDirectory",rootDirectory, stack, directorySizeMap)



 



