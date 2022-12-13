const fileReader = require("../miscelleneous/fileReader")
// const fileWriter = require("../miscelleneous/fileWriter")


// Generate Tree
class Node {
  constructor(name) {
      this.name = name
      this.children = {}
      this.size = 0
      this.parent = null
  }
}

function drawTree(parentNode, array){

    if (!array.length) return

    if (array[0].startsWith("$ ls")) {

      array.shift()

      while (array.length && array[0].startsWith("dir") || array.length && /^\d/.test(array[0]) ) {

      let currentInstruction = array.shift()

      let instructionParts = currentInstruction.split(" ")

      if (instructionParts[0] === "dir") {
          let node = new Node(instructionParts[1])
          node.parent = parentNode
          parentNode.children = {...parentNode.children, [instructionParts[1]]: node}
      }else{
        parentNode.children[instructionParts[1]] = Number(instructionParts[0])
        parentNode.size += Number(instructionParts[0])
      }
    }

  }

    if (array.length && array[0].startsWith("$ cd")) {
      
      let currentInstruction = array.shift()

      let instructionParts = currentInstruction.split(" ")

      if(instructionParts[2] === "..") {
        drawTree(parentNode.parent, array)
      } else{  
        let childNode = parentNode.children[instructionParts[2]]
        drawTree(childNode, array)
      }
    }

   return 
}

function generateTree() {

    let instructionArray = fileReader(`${__dirname}\\input.txt`)

    instructionArray = instructionArray.map((item) => item.slice(0, -1))
      
    instructionArray  = instructionArray.splice(1)
    
    let rootNode = new Node("root")

    drawTree(rootNode, instructionArray)

    return rootNode
 } 

const tree =  generateTree()


// Traverse Tree
function queueFolders(root) {
  let current = root
  let currentIndex = null

  let directories = []

  do {
      
      if(!current) break

      for (let child in current.children){
          if (typeof current.children[child] !== "number") directories.push(current.children[child])
      }
      
      if(currentIndex === null){
          currentIndex = 0
      }else{
          currentIndex++
      }

      current = directories[currentIndex]
      
  } while (true);

  return directories
}

function selectDirectroies(directories){

  let updatedArray = []
  let sum = 0

  while(directories.length){
      let currentNode = directories.pop()
      currentNode.parent.size += currentNode.size
      updatedArray.push(currentNode)
  }

  for (let item of updatedArray){
     if(item.size <= 100000) sum += item.size
  }

  return {sum, updatedArray}
   
}


// Free up space
function freeUpSpaces(directories, sizeNeeded){

  let directoryToBeDeleted;

  let sorted = directories.sort((a, b) => a.size - b.size )

  for (let directory of sorted){
    if (directory.size > sizeNeeded) {
      directoryToBeDeleted = directory
      break
    }
  }
  
  return directoryToBeDeleted

}

function getFileSize(root){

  let directories = queueFolders(root)

  let {sum, updatedArray} =  selectDirectroies(directories)

  // As per instruction
  let sizeNeeded = 2_805_968

  let directoryToBeDeleted =  freeUpSpaces(updatedArray, sizeNeeded)

  return {root, directoryToBeDeleted}
}

const {root, directoryToBeDeleted} = getFileSize(tree)
console.log({directoryToBeDeleted})
console.log({root})

// system size = 70_000_000 
// rootDirectory size = 42_805_968
// size needed = 2_805_968

