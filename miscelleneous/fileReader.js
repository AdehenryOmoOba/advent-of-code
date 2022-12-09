const fs = require("fs")

 function fileReader(filePath){
    const lines = fs.readFileSync(filePath, "utf-8").split("\n").slice(0, -1)
    return lines
}

module.exports = fileReader