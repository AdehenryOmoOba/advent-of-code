const arr = [2, 58, 53, 6 ,84 ,24 ,6 ,72 ,10 ,78,21 ,1 ,3]

function getTopThree(arr) {

  const myArr = arr.slice()

    let first = 0
    let second = 0
    let third = 0

for (let num of myArr){

  if (num > first) {
    third = second
    second = first
    first = num
  }
  if (num > second && num < first){
    third = second
    second = num
  }
  if (num > third && num < second){
    third = num
  }
}

 return {first, second, third}
}



const {first, second, third} = getTopThree(arr)

console.log({first, second, third})