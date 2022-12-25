const EventEmmiter = require("events")

class PizzaShop extends EventEmmiter{
    constructor(){
     super()
     this.orderNumber = 0
    }

    order(size, toppings){
        this.orderNumber++
        console.log(`Pizza order number: ${this.orderNumber}`)
        this.emit("order", size, toppings)
    }
}


module.exports = PizzaShop