const fileReader = require("../miscelleneous/fileReader")

function findContainer(filePath){

  const linesArray = fileReader(filePath)

  let containerCount = 0

  for (let item of linesArray){

    let cleanItem = item.slice(0, -1).replace(",", "-").split('-')
    
    let newItem = {}

    newItem.first = [Number(cleanItem[0]), Number(cleanItem[1])]
    newItem.second = [Number(cleanItem[2]), Number(cleanItem[3])]

    let min = newItem.first[0] < newItem.second[0] ? "first" : "second"

    let minContainer;
    let maxContainer;

    if (min === "first"){
        minContainer = newItem.first
        maxContainer = newItem.second
    }else{
        minContainer = newItem.second
        maxContainer = newItem.first
    }
    

    if(minContainer[1] >= maxContainer[1] || newItem.first[0] === newItem.second[0]) containerCount++

  }

  console.log(containerCount)
}

findContainer("input.txt")