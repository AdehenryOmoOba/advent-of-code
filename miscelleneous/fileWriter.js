const fs = require("fs")

 function fileWriter(data, append = false){
    if (append){
        fs.appendFileSync("../output.json", data) 
        console.log('appending...')
    }else{
        fs.writeFileSync("../output.json", data ,null, 4)
        console.log('writing...')
    }
}

module.exports = fileWriter