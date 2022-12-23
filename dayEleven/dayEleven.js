// const fs = require('fs')

// function fileReader(filePath){
//   return fs.readFileSync(filePath,{encoding:"utf-8"}).replace(/\r/g, "").trim().split("\n\n").map((line) => line.split('\n'))
// }

// let lines = fileReader("./input.txt") 

// let monkeyMap = new Map()

// lines.forEach((monkey, index) => {
//     let monkeyName = index
//     let items = monkey[1].split("Starting items: ")[1].split(',').map(Number)
//     let operation = monkey[2].split("Operation: new = old ")[1].split(" ")
//     let testFactor = Number(monkey[3].split("Test: divisible by ")[1])
//     let trueDestination = Number(monkey[4].split("If true: throw to monkey ")[1])
//     let falseDestination = Number(monkey[5].split("If false: throw to monkey ")[1])
//     let businessCount = items.length
//     monkeyMap.set(monkeyName, {items, operation, testFactor, trueDestination, falseDestination, businessCount})
// })

// let monkeyKeys = Array.from(monkeyMap.keys())

// function mokeyBusiness(monkeyMap) {

//     function testWorry(num, testFactor){
//         return num % testFactor === 0 ? true : false
//     }
    
//     for (let monkeyIndex = 0; monkeyIndex < monkeyKeys.length; monkeyIndex++) {
    
//         let currentMonkey = monkeyMap.get(monkeyIndex)
    
//         while (currentMonkey.items.length > 0) {
    
//          let currentItem = currentMonkey.items.shift()

//          let secondOperand = currentMonkey.operation[1] === "old" ? currentItem : currentMonkey.operation[1]
    
//          let worryItem = eval(`${currentItem} ${currentMonkey.operation[0]} ${secondOperand}`)
    
//          worryItem = Math.floor(worryItem / 3)
    
//          if(testWorry(worryItem, currentMonkey.testFactor)){
    
//           let destinationMonkey = monkeyMap.get(currentMonkey.trueDestination)
    
//           destinationMonkey.items.push(worryItem)

//           destinationMonkey.businessCount++
    
//          }else{
    
//             let destinationMonkey = monkeyMap.get(currentMonkey.falseDestination)
    
//             destinationMonkey.items.push(worryItem)

//             destinationMonkey.businessCount++

//          }
    
//         }
//     }
   
// }

// for (let index = 0; index < 20; index++) {
//         mokeyBusiness(monkeyMap)
// }

// let monkeyBusinessArray = []

// for (const key of monkeyKeys) {
//     let currentMonkey = monkeyMap.get(key)
//     currentMonkey.businessCount -= currentMonkey.items.length
//     monkeyBusinessArray.push(currentMonkey.businessCount)
// }

// let topTwo = monkeyBusinessArray.sort((a, b) => b -a).slice(0,2)

// console.log(topTwo[0] * topTwo[1])

////////////////////////////////////////////////////////////////////

const fs = require('fs')

function fileReader(filePath){
  return fs.readFileSync(filePath,{encoding:"utf-8"}).replace(/\r/g, "").trim().split("\n\n").map((line) => line.split('\n'))
}

let lines = fileReader("./input.txt") 

let monkeyMap = new Map()

lines.forEach((monkey, index) => {
    let monkeyName = index
    let items = monkey[1].split("Starting items: ")[1].split(',').map(Number)
    let operation = monkey[2].split("Operation: new = old ")[1].split(" ")
    let testFactor = Number(monkey[3].split("Test: divisible by ")[1])
    let trueDestination = Number(monkey[4].split("If true: throw to monkey ")[1])
    let falseDestination = Number(monkey[5].split("If false: throw to monkey ")[1])
    let businessCount = items.length
    monkeyMap.set(monkeyName, {items, operation, testFactor, trueDestination, falseDestination, businessCount})
})

let monkeyKeys = Array.from(monkeyMap.keys())

function mokeyBusiness(monkeyMap) {

    // Manage stress level here...
    let maxStressLevel = 1 // 9_699_690
    for (let key of monkeyKeys) {
        let monkey = monkeyMap.get(key)
        maxStressLevel *= monkey.testFactor
    }

    function testWorry(num, testFactor){
        return num % testFactor === 0 ? true : false
    }
    
    for (let monkeyIndex = 0; monkeyIndex < monkeyKeys.length; monkeyIndex++) {
    
        let currentMonkey = monkeyMap.get(monkeyIndex)
    
        while (currentMonkey.items.length > 0) {
    
         let currentItem = currentMonkey.items.shift()

         let secondOperand = currentMonkey.operation[1] === "old" ? currentItem : currentMonkey.operation[1]
    
         let worryItem = eval(`${currentItem} ${currentMonkey.operation[0]} ${secondOperand}`)
    
         //  take modulus of the stress level
         worryItem = worryItem % maxStressLevel
         console.log({worryItem})
    
         if(testWorry(worryItem, currentMonkey.testFactor)){
    
          let destinationMonkey = monkeyMap.get(currentMonkey.trueDestination)
    
          destinationMonkey.items.push(worryItem)

          destinationMonkey.businessCount++
    
         }else{
    
            let destinationMonkey = monkeyMap.get(currentMonkey.falseDestination)
    
            destinationMonkey.items.push(worryItem)

            destinationMonkey.businessCount++

         }
    
        }
    }
   
}

for (let index = 0; index < 10000; index++) {
        mokeyBusiness(monkeyMap)
}

let monkeyBusinessArray = []

for (const key of monkeyKeys) {
    let currentMonkey = monkeyMap.get(key)
    currentMonkey.businessCount -= currentMonkey.items.length
    monkeyBusinessArray.push(currentMonkey.businessCount)
}

let topTwo = monkeyBusinessArray.sort((a, b) => b - a).slice(0,2)

console.log(topTwo[0] * topTwo[1])