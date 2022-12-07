
function removeDups(arr) {
    let myMap = {}
    let myArr = arr.slice()

    for (let i=0;i<myArr.length;i++){
        myMap[myArr[i]] = myMap[myArr[i]] + 1 || 1
    }

    console.log(myMap)

}