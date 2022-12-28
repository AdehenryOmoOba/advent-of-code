const fs = require("fs")

function fileReader(filePath){
    const lines = fs.readFileSync(filePath,{encoding:"utf-8"}).replace(/\r/g, "").trim().split("\n\n").map((line) => line.split("\n").map((item) => JSON.parse(item)))
    return lines
}

const pairs = fileReader('./input.txt')

function compare(a, b){

  if(a === undefined) return 1
  if(b === undefined) return -1
 
  let result;

  if(typeof a === "number" && typeof b === "number"){
    result = a < b ? 1 : a > b ? -1 : 0
  }

  if(typeof a === "number" && Array.isArray(b)){
    a = [a]
    result = compare(a, b)
  }

  if(Array.isArray(a) && typeof b === "number"){
    b = [b]
    result = compare(a, b)
  }

  if(Array.isArray(a) && Array.isArray(b)){

    let count = 0

    while (count < Math.max(a.length, b.length)) {

     let output = compare(a[count], b[count])

     if(output !== 0) return output

     count++
    }
    return 0
  }
  return result
}

let megaSum = 0

function findorder(arrayPair, index) {

  let pair = arrayPair.slice()

  let maxLength = Math.max(pair[0].length, pair[1].length)
  
  for (let pairIndex = 0; pairIndex < maxLength; pairIndex++) {

    let result = compare(pair[0][pairIndex], pair[1][pairIndex])

    if(result === 1){
      megaSum += index + 1
      break
    }

    if(result === -1){
      break
    }

  }
}

// for (let pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
//   findorder(pairs[pairIndex], pairIndex)
// }

// console.log(megaSum)

/////////////////// Part Two ///////////////////// 

function compare(a, b){

  if(a === undefined) return 1
  if(b === undefined) return -1
 
  let result;

  if(typeof a === "number" && typeof b === "number"){
    result = a < b ? 1 : a > b ? -1 : 0
  }

  if(typeof a === "number" && Array.isArray(b)){
    a = [a]
    result = compare(a, b)
  }

  if(Array.isArray(a) && typeof b === "number"){
    b = [b]
    result = compare(a, b)
  }

  if(Array.isArray(a) && Array.isArray(b)){

    let count = 0

    while (count < Math.max(a.length, b.length)) {

     let output = compare(a[count], b[count])

     if(output !== 0) return output

     count++
    }
    return 0
  }
  return result
}

let allPairs = []

function findorder(array) {

  let min = {item: array[0], index: 0}

  for (let i = 1; i < array.length; i++) {
    
    for (let pairIndex = 0; pairIndex < Math.max(min.item.length, array[i].length); pairIndex++) {
  
      let result = compare(min.item[pairIndex], array[i][pairIndex])
  
      if(result === 1){
        break
      }
  
      if(result === -1){
        min = {item: allPairs[i], index: i}
        break
      }
    }
    
  }
  return min
}

for (const pair of pairs) {
  allPairs.push(pair[0])
  allPairs.push(pair[1])
}

allPairs = [...allPairs, [[2]], [[6]]]

let sorted = []

function findMin(array) {

  if(array.length === 1) return sorted.push(array)

   let smallest =  findorder(array)
   sorted.push(smallest.item)
   allPairs.splice(smallest.index, 1)
}

// let allPairsLength = allPairs.length
// for (let allPairsIndex = 0; allPairsIndex < allPairsLength; allPairsIndex++) {
//   findMin(allPairs)
// }

// let dividerIndexArray = []

// for (let i = 0; i < sorted.length; i++) {
//   if(JSON.stringify(sorted[i]) === '[[2]]' || JSON.stringify(sorted[i]) === '[[6]]') dividerIndexArray.push(i + 1)
// }

// console.log(dividerIndexArray[0] * dividerIndexArray[1])