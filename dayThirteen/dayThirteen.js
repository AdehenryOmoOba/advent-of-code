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

// for (const pair of pairs) {
//   allPairs.push(pair[0])
//   allPairs.push(pair[1])
// }

// allPairs = [...allPairs, [[2]], [[6]]]

// let sorted = allPairs.sort((a, b) => compare(a, b)).reverse()

// let dividersIndex = []

// for (const arr of sorted) {
//   if(JSON.stringify(arr) === '[[2]]' || JSON.stringify(arr) === '[[6]]') dividersIndex.push(sorted.indexOf(arr) + 1)
// }

// console.log(dividersIndex[0] * dividersIndex[1])