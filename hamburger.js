class Burger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
    }
    /**
     Совсем не поняла, как реализовать функцию, и даже что в нее передавать при вызове :(
     */
    addTopping(topping) {
        this.stuffing = []; // превратила объект в массив, знаю, что нельзя...
        this.stuffing.push(topping);
    }
    /* Здесь вообще ничего не получилось
    removeTopping(topping) {
    }*/
    getToppings(topping) {
        return this.stuffing;
    }
    getSize() { 
        return this.size.name;
    }
    getStuffing() {
        return this.stuffing.name;
    }
    calculatePrice() {
        return this.size.price + this.stuffing.price;
    }
    calculateCalories() {
        return this.size.calories + this.stuffing.calories;
    }
}

const toppings = [
    {
        name: 'cheese',
        price: 10,
        calories: 20
    },
    {
        name: 'salad',
        price: 20,
        calories: 5
    },
    {
        name: 'potato',
        price: 15,
        calories: 10
    }
]
const ingredients = [
    {
        name: 'spacies',
        price: 15,
        calories: 0
    },
    {
        name: 'mayo',
        price: 20,
        calories: 5
    }
]
const burgerSize = {
    small: {
        name: 'Small burger',
        price: 50,
        calories: 20
    },
    big: {
        name: 'Big burger',
        price: 100,
        calories: 40
    }
}

const smallBurger = new Burger(burgerSize.small, toppings[0]); // здесь я попыталась передать начинку с сыром
console.log(smallBurger.addTopping(toppings[1])); /* здесь попыталась изменить начинку с сыром на начинку с салатом
В задании  сказано, что бургер должен быть с ОДНОЙ ИЗ нескольких начинок, это ввело в ступор
*/
console.log(smallBurger.getToppings(toppings)); /* Соответственно, тут вообще не поняла, что выводить:
список всех имеющихся начинок, или тут про добавки идет речь?
*/

/* Дальше суть более менее ясна, но подсчет я вела без ingredients,
 потому что не поняла, в каком месте их надо было впихнуть */
console.log(smallBurger.getSize());
console.log(smallBurger.getStuffing());
console.log(smallBurger.calculatePrice());
console.log(smallBurger.calculateCalories());
