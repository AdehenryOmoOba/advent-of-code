const fs = require("fs")

function readFileContent(filePath) {
    let result
    fs.readFile(filePath, "utf-8", (error, data) => {
        if (error) {
            console.log(error.message)
            return error.message
        }
       const array = data.split("\n")
      const {highest, highestIndex} = sumArray(array)
       console.log({highest})
       console.log({highestIndex})
    })
}

   function sumArray(array) {
    let highest = 0
    let highestIndex = 0
    let result = []
    let accumulator = 0

    for (let i = 0; i < array.length - 1; i++){
      if (array[i] === "\r"){
        result.push(accumulator)
        if(accumulator > highest) highestIndex = result.length - 1
        highest = Math.max(highest, accumulator)
        accumulator = 0
        continue
      }

      let newItem = array[i].slice(0, -1)
      accumulator += Number(newItem)
    }
    return {highest, highestIndex}
}

 readFileContent("input.txt")
