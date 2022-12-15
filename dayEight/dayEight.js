// Number of edges = (number of rows * 2) + (number of columns - 2) * 2  =  (5 * 2) + (5 - 2) * 2

// const test = [
//     [ '3', '0', '3', '7', '3' ],
//     [ '2', '5', '5', '1', '2' ],
//     [ '6', '5', '3', '3', '2' ],
//     [ '3', '3', '5', '4', '9' ],
//     [ '3', '5', '3', '9', '0' ]
//   ]

const fileReader = require("../miscelleneous/fileReader")
const lines = fileReader(`${__dirname}\\input.txt`)

// Generate matrix
let inputArray = lines.map((line) => {
   return [...line].map(Number);
})

// Count the trees on the edges
function countEdges() {
  let myArray = inputArray.slice()
  let numberOfRows = myArray.length
  let numberOfColumns = myArray[0].length
  let numberOfEdges = (numberOfRows * 2) + (numberOfColumns - 2) * 2

  return numberOfEdges
}

// Search to the right
function searchRight(currentTree, x, y){
  let rightIndex = y + 1
  while(rightIndex < inputArray[x].length){
    let currentRight = inputArray[x][rightIndex]
    if(currentRight >= currentTree) return false
    rightIndex++
  }
  return true
}

// Search to the left
function searchLeft(currentTree, x, y){
  let leftIndex = y - 1
  while(leftIndex >= 0){
    let currentLeft = inputArray[x][leftIndex]
    if(currentLeft >= currentTree) return false
    leftIndex--
  }
  return true
}

// Search to the top
function searchTop(currentTree, x, y){
  let topIndex = x - 1
  while(topIndex >= 0){
    let currentTop = inputArray[topIndex][y]
    if(currentTop >= currentTree) return false
    topIndex--
  }
  return true
}

// Search to the bottom
function searchBottom(currentTree, x, y){
  let bottomIndex = x + 1
  while(bottomIndex < inputArray.length){
    let currentBottom = inputArray[bottomIndex][y]
    if(currentBottom >= currentTree) return false
    bottomIndex++
  }
  return true
}

function checkVisibility(x, y){
  let currentTree = inputArray[x][y]

  const isVisibleRight = searchRight(currentTree, x, y)
  const isVisibleLeft = searchLeft(currentTree, x, y)
  const isVisibleUp = searchTop(currentTree, x, y)
  const isVisibleDown = searchBottom(currentTree, x, y)

 if (isVisibleRight || isVisibleLeft || isVisibleUp || isVisibleDown){
  return  true
 }
 return false
}

function countVisibleTrees(){

  let visibleInnerTrees = 0

  for (let i = 1; i < inputArray.length; i++) {
    if (i === inputArray.length -1) continue
      for (let j = 1; j < inputArray[i].length; j++){
        if(j === inputArray[i].length -1) continue

        let isVisible = checkVisibility(i, j)
        if (isVisible) visibleInnerTrees++

      }
    }

  let numberOfEdges = countEdges()
  let allVisibleTrees = numberOfEdges + visibleInnerTrees

  console.log({allVisibleTrees})
}
// countVisibleTrees()



// Part two

// Search to the right
function searchRight(currentTree, x, y){
  let count = 0
  let rightIndex = y + 1
  while(rightIndex < inputArray[x].length){
    let currentRight = inputArray[x][rightIndex]
    if(currentRight >= currentTree){
      count++
      return count
    }
    count++
    rightIndex++
  }
  return count
}

// Search to the left
function searchLeft(currentTree, x, y){
  let count = 0
  let leftIndex = y - 1
  while(leftIndex >= 0){
    let currentLeft = inputArray[x][leftIndex]
    if(currentLeft >= currentTree) {
      count++
      return count
    }
    count++
    leftIndex--
  }
  return count
}

// Search to the top
function searchTop(currentTree, x, y){
  let count = 0
  let topIndex = x - 1
  while(topIndex >= 0){
    let currentTop = inputArray[topIndex][y]
    if(currentTop >= currentTree) {
      count++
      return count
    }
    count++
    topIndex--
  }
  return count
}

// Search to the bottom
function searchBottom(currentTree, x, y){
  let count = 0
  let bottomIndex = x + 1
  while(bottomIndex < inputArray.length){
    let currentBottom = inputArray[bottomIndex][y]
    if(currentBottom >= currentTree) {
      count++
      return count
    }
    count++
    bottomIndex++
  }
  return count
}

function countScores(x, y){
  let currentTree = inputArray[x][y]

  const rightCount = searchRight(currentTree, x, y)
  const leftCount = searchLeft(currentTree, x, y)
  const upCount = searchTop(currentTree, x, y)
  const downCount = searchBottom(currentTree, x, y)

  let score = rightCount * leftCount * upCount * downCount

 return score
}

// From current tree, count to each of the four directions, stop on each direction when (1) a tree of same size/taller is on the way or (2) the edge is reached
function scenicScore() {

  let maxScore = 0

  for (let i = 1; i < inputArray.length; i++) {
    if (i === inputArray.length -1) continue
      for (let j = 1; j < inputArray[i].length; j++){
        if(j === inputArray[i].length -1) continue

        let currentScore = countScores(i, j)
        if (currentScore > maxScore) maxScore = currentScore

      }
    }

  console.log({maxScore})
}

// scenicScore()

