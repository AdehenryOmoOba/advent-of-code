function drawTreeRecursive(currentDirectory, instructionArray){

    let parentDirectoryTracker = currentDirectory

    if(!instructionArray.length) return currentDirectory
   
    let instruction = instructionArray.splice(0, 1)

    if (instruction[0].startsWith("$ cd")){
      let instructionParts = instruction[0].split(" ")

      if(instructionParts[2] === "..") {
        return
      } else{
        currentDirectory = currentDirectory['📁folder-' + instructionParts[2]]
        drawTreeRecursive(currentDirectory, instructionArray.slice())           // RECURSIVE CALL
      }
    }
// f (instruction[0].startsWith("$ ls")){

//         while (instructionArray[0].startsWith("dir") || /^\d/.test(instructionArray[0]) ) {

//             let newInstruction = instructionArray.splice(0, 1)
//             let instructionParts = newInstruction[0].split(" ")
   
//             if (instructionParts[0] === "dir") {
//                 currentDirectory["📁folder-" + instructionParts[1]] = {}
//             }else{
//               currentDirectory["⬜file-" + instructionParts[1]] = instructionParts[0]
//             }

//         }
        
//     }

//     drawTreeRecursive(currentDirectory, instructionArray.slice())
    i
}
//////////////////////////////
// instruction : ['$ cd a']
// currentDirectory : {}

