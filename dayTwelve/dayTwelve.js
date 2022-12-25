const fileReader = require("../miscelleneous/fileReader");

let strings = 'abcdefghijklmnopqrstuvwxyz'

let elevationMap = {}

elevationMap.S = 1
elevationMap.E = 26

for (let i = 0; i < strings.length; i++) {
   elevationMap[strings[i]] = i + 1
}

// class Node {
//    constructor(name, value){
//       this.name = name,
//       this.value = value
//       this.isVisited = false
//       this.distance = null
//    }
// }

// const grid = fileReader('./test.txt').map((line) => line.split("")).map((row) => row.map((point) => new Node(point, elevationMap[point])))

// let starts = [];
   
// for (let row = 0; row < grid.length; row++) {
//  for (let col = 0; col < grid[row].length; col++) {
//      if(grid[row][col].name === "S" || grid[row][col].name === "a") {
//         starts.push(grid[row][col])
//      }
//      grid[row][col].coord = {row, col}
//  }
// }


// function findShortestPath(){

//    start.distance = 0

//    let queue = [start]

//    let previous = null

//    while (queue.length) {
      
//       let current = queue.shift()

//       if(current.isVisited === true) continue

//       current.isVisited = true

//       let row = current.coord.row 

//       let col = current.coord.col

//       let top = grid[row - 1]?.[col]
//       let bottom = grid[row + 1]?.[col]
//       let left = grid[row]?.[col - 1]
//       let right = grid[row]?.[col + 1]

//       let adjacents = [top, bottom, left, right]

//       for (let adjacent of adjacents) {
//         if(adjacent) {
//            adjacent.distance = current.distance + 1
//            if(adjacent.value - current.value <= 1) {
//              if(adjacent.isVisited === false) { 
//                queue.push(adjacent)
//           }
//          }
//        }
//       }
      
//       if(current.name === "E"){
//          console.log(current.distance)
//          break
//       }
//       previous = current
//    }
// }

// findShortestPath()

///////// Part Two /////////////

const grid = fileReader('./input.txt').map((line) => line.split(""))

let starts = [];
      
for (let row = 0; row < grid.length; row++) {
 for (let col = 0; col < grid[row].length; col++) {
     if(grid[row][col] === "S" || grid[row][col] === "a") {
        starts.push(grid[row][col])
     }
 }
}

let smallestSteps = Number.MAX_VALUE

function minSteps(index) {

   class Node {
      constructor(name, value){
         this.name = name,
         this.value = value
         this.isVisited = false
         this.distance = null
      }
   }
   
   const grid = fileReader('./input.txt').map((line) => line.split("")).map((row) => row.map((point) => new Node(point, elevationMap[point])))
   
   let starts = [];
      
   for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        if(grid[row][col].name === "S" || grid[row][col].name === "a") {
           starts.push(grid[row][col])
        }
        grid[row][col].coord = {row, col}
    }
   }
   
   function findShortestPath(start){
   
      start.distance = 0
   
      let queue = [start]
   
      let previous = null
   
      while (queue.length) {
         
         let current = queue.shift()
   
         if(current.isVisited === true) continue
   
         current.isVisited = true
   
         let row = current.coord.row 
   
         let col = current.coord.col
   
         let top = grid[row - 1]?.[col]
         let bottom = grid[row + 1]?.[col]
         let left = grid[row]?.[col - 1]
         let right = grid[row]?.[col + 1]
   
         let adjacents = [top, bottom, left, right]
   
         for (let adjacent of adjacents) {
           if(adjacent) {
              adjacent.distance = current.distance + 1
              if(adjacent.value - current.value <= 1) {
                if(adjacent.isVisited === false) { 
                  queue.push(adjacent)
             }
            }
          }
         }
         
         if(current.name === "E"){
           smallestSteps =  Math.min(current.distance, smallestSteps)
            break
         }
         previous = current
      }
   }
   
      findShortestPath(starts[index])
}

// for (let i = 0; i < starts.length; i++) {
//    minSteps(i)
// }

