const  fileReader = require("../miscelleneous/fileReader")

function getSubroutine(filePath) {
  

    const subroutine =  fileReader(filePath)[0].slice(0, -1)

    let subroutineCount = 0
    let subroutineStr = ""
    
    for (let char of subroutine) {
    
        subroutineStr += char
        subroutineCount++
    
        if (subroutineCount >= 4 ){
    
           if([...new Set([...subroutineStr]).keys()].length === 4){
               break
           }
           subroutineStr = subroutineStr.slice(1)
           continue
        }
    }
      console.log({subroutineCount, subroutineStr})
}

// getSubroutine("input.txt")

// Part Two 

function getSubroutineMessage(filePath) {
  

    const subroutine =  fileReader(filePath)[0].slice(0, -1)

    let subroutineCount = 0
    let subroutineStr = ""
    
    for (let char of subroutine) {
    
        subroutineStr += char
        subroutineCount++
    
        if (subroutineCount >= 14 ){
    
           if([...new Set([...subroutineStr]).keys()].length === 14){
               break
           }
           subroutineStr = subroutineStr.slice(1)
           continue
        }
    }
      console.log({subroutineCount, subroutineStr})
}

getSubroutineMessage("input.txt")