const fs = require("fs")

 function fileWriter(data, append = false){
    if (append){
        fs.appendFileSync("../output.txt", data) 
        console.log('appending...')
    }else{
        fs.writeFileSync("../output.txt", data)
        console.log('writing...')
    }
}

module.exports = fileWriter