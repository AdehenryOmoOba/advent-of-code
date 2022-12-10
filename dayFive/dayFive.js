const fileReader = require("../miscelleneous/fileReader");

const stacks = [
                ["G", "F", "V", "H", "P", "S"],
                ["G", "J", "F", "B", "V", "D", "Z", "M"],
                ["G", "M", "L", "J", "N"],
                ["N", "G", "Z", "V", "D", "W", "P"],
                ["V", "R", "C", "B"],
                ["V", "R", "S", "M", "P", "W", "L", "Z"],
                ["T", "H", "P"],
                ["Q", "R", "S", "N", "C", "H", "Z", "V"],
                ["F", "L", "G", "P", "V", "Q", "J"]
            ]

function extractNumbers(string) {
    const numbers = string.match(/\d+/g);
    return numbers.map(num => parseInt(num, 10));
}

function shuffle(filePath) {

    let result = ""

    const lines = fileReader(filePath)

    for (let line of lines) {

        const numbers = extractNumbers(line.slice(0, -1))
        
        let numberOfMoves = numbers[0]
        let fromIndex = numbers[1] - 1
        let toIndex = numbers[2] - 1

        for (let i=0; i<numberOfMoves; i++){

            let item = stacks[fromIndex].pop()
            stacks[toIndex].push(item)
        }
    }

    for (let stack of stacks){
        result += stack.at(-1)
    }

    console.log(result)
}

// shuffle("input.txt")

///////////////////

// Part two 
