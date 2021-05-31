class GoodsItem {
  constructor(title = "No title", price = 100, img = "noImage") {
    this.title = title;
    this.price = price;
    this.img = img;
  }
  render() {
    const helpLine = `<div class="holder">
      <div class="smallLine smallLine1"></div>
      <div class="smallLine smallLine2"></div>
    </div>`;
    return `
    <div class="goods-item">
      <a href="#" class="goods-imgLink"><img src="img/${this.img}.jpeg" class="goods-img" alt="product"></a>
      <h3>${this.title}</h3>
      <p>${this.price}</p>
      <button type="button">Add to Cart</button>
      ${helpLine}
    </div>
    `
  }
}
class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150, img: 'Shirt' },
      { title: 'Socks', price: 50, img: 'Socks' },
      { title: 'Jacket', price: 350, img: 'Jacket' },
      { title: 'Shoes', price: 250, img: 'Shoes' },
      { price: 130 },
      // { title: 'Accessories' },
      // {  },
    ];
  }

  /*
   Метод, который считает суммарную стоимость всех товаров
   Тут возник вопрос. Если добавить товар без указания его цены, то метод не будет работать,
   так как цена будет undefined. Но я задавала значение цены по умолчанию = 100,
   почему так происходит? Порядок вызовов методов меняла, не помогло...
  */
  calcTotalPrice() {
    let totalPrice = 0;
    this.goods.forEach((good) => {
      totalPrice += good.price;
      console.log(good.price);
    });
    document.querySelector('.goods-list').insertAdjacentHTML("beforebegin", `<h3>Total Price: ${totalPrice}</h3>`);
  }

  render() {
    let listHTML = '';
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.title, good.price, good.img);
      listHTML += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHTML;
  }
}

// Не совсем поняла, это то, что требуется в 1 задании? 
class CartGoodsList extends GoodsList {}
class CartGoodsItem extends GoodsItem {}

const init = () => {
  const list = new GoodsList();
  list.fetchGoods();
  list.render();
  list.calcTotalPrice();
};

window.onload = init;
