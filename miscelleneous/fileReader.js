const fs = require("fs")

function fileReader(filePath){
    const lines = fs.readFileSync(filePath,{encoding:"utf-8"}).replace(/\r/g, "").trim().split("\n")
    return lines
}

module.exports = fileReader