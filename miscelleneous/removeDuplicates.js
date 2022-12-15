
function removeDups(arr) {
    let myMap = {}
    let myArr = arr.slice()

    for (let i=0;i<myArr.length;i++){
        myMap[myArr[i]] = myMap[myArr[i]] + 1 || 1
    }
    console.log(myMap)
}

// Generating 2D array
 const grid = new Array(5).fill(Array(5).fill(0))
 console.log(grid)