const PizzaShop = require("./pizza");

let pizza = new PizzaShop()

pizza.on("order", (size, toppings) => console.log(`Pizza of size ${size} and ${toppings} toppings ordered`))

pizza.order("large", "almonds")
pizza.order("medium", "mushrooms")
pizza.order("small", "beacon")