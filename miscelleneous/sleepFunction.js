
// Blocking main thread

async function play() {

    console.log('First log')
    
    async function sleep() {
     return new Promise((resolve, reject) => {
       setTimeout(() => {
         
         //NOTE: The 'resolve' methood below has to be invoked so that function 'play' can continue execution. If 'resolve' method is not called and 'sleep' is invoked with 'await' keyword, the promise will remain in pending state indefinitely and 'play' will NOT continue execution.
         resolve("Now resolved")
        console.log("Second log")
      }, 2000)
     })
    }
    
    //Function execution paused temporarily here 
   await sleep()
   
    
    function syncPlay() {
      console.log('Third log')
    }
    syncPlay()
}
 
  play()

// Non-blocking main thread

// async function playTwo() {

//     console.log('First log')
    
//     async function sleep() {
//      return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("Second log")
//         }, 3000);
//      })
//     }
    
//     const check =  sleep()
//     console.log(check)
    
//     function syncPlay() {
//       console.log('Third log')
//     }
//     syncPlay()
// }

    
// playTwo()