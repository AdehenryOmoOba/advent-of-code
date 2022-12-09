const fs = require("fs")

const items = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

// function getDuplicates(filePath){

//     const lines = fs.readFileSync(filePath, "utf-8").split("\n").slice(0, -1)

//     let result = 0

//     const duplicates = []

//     for (let line of lines) {
//       const left = line.slice(0, line.length / 2)  
//       const right = line.slice(line.length / 2, line.length - 1)  
      
//       for(let char of left){
//         if(right.includes(char)) {
//             duplicates.push(char)
//             break
//         }
//       }
//     }

//     for(let item of duplicates){
//        result += items.indexOf(item) + 1
//       }
  
//     console.log(result)
// }

// getDuplicates("input.txt")

//////////////////////////////////////


function partTwo(filePath){

  const lines = fs.readFileSync(filePath, "utf-8").split("\n").slice(0, -1)

  let result = []

  let temArr = []

  while (lines.length) {

      let currentLine = lines.splice(0, 1)
      temArr.push(currentLine[0].slice(0, -1))

      if (temArr.length === 3){
        result.push([...temArr])
        temArr.length = 0
      }
 
  }
  
  let groups =  {}
  
  let groupNumber = 1

  for (let group of result) {

    let childOne = {}
    for (let char of group[0]){
      childOne[char] =   1
    }
    let childTwo = {}
    for (let char of group[1]){
      childTwo[char] =   1
    }
    let childThree = {}
    for (let char of group[2]){
      childThree[char] =  1
    }

    groups["group" + groupNumber] = {childOne: {...childOne}, childTwo: {...childTwo}, childThree: {...childThree}}

    groupNumber++
  }

  let prioritySum = 0

  for (let group in groups) {

    for (let char in groups[group].childOne){
      if (char in groups[group].childTwo && char in groups[group].childThree){
        prioritySum += items.indexOf(char) + 1
        break
      }
    }
      
  }

  console.log(prioritySum)

}

partTwo("input.txt")
