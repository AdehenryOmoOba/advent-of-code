const fs = require("fs")

function readFileContent(filePath) {

    fs.readFile(filePath, "utf-8", (error, data) => {
        if (error) {
            console.log(error.message)
            return error.message
        }
       const array = data.split("\n")
      const {resultArray,highest, highestIndex} = sumArray(array)

       const topThree = resultArray.sort((a, b) => b - a).slice(0, 3)
       let topThreeSum = 0
       for (let num of topThree) topThreeSum += num
       
       console.log({highest})
       console.log({highestIndex})
       console.log({topThreeSum})

    })
}

   function sumArray(array) {
    let highest = 0
    let highestIndex = 0
    let resultArray = []
    let accumulator = 0

    for (let i = 0; i < array.length - 1; i++){
      if (array[i] === "\r"){
        resultArray.push(accumulator)
        if(accumulator > highest) highestIndex = resultArray.length - 1
        highest = Math.max(highest, accumulator)
        accumulator = 0
        continue
      }

      let newItem = array[i].slice(0, -1)
      accumulator += Number(newItem)
    }
    return {resultArray,highest, highestIndex}
}

 readFileContent("input.txt")

