const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class GoodsItem {
  constructor(id_product, product_name = "No title", price = 100, img = "noImage") {
    this.id_product = id_product;
    this.product_name = product_name;
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
      <h3>${this.product_name}</h3>
      <p>${this.price}</p>
      <button type="button" class="addToCart" id="${this.id_product}">В корзину</button>
      ${helpLine}
    </div>
    `
  }
}
class GoodsList {
  constructor() {
    this.goods = [];
  }
  async fetchGoods() {
    const response = await fetch(`${API_URL}/catalogData.json`);
    const catalogItems = await response.json();
    this.goods = catalogItems;
    // this.goods = [
    //   { id_product: 12, product_name: 'kate', price: 123 },
    //   { id_product: 23, product_name: 'vania', price: 234 },
    //   { id_product: 34, product_name: 'alex', price: 345 },
    //   { id_product: 45, product_name: 'mary', price: 456 }
    // ]
  }


  /**
    Метод осуществляет добавление в корзину выбранных товаров из GoodsList 
    Убрать отсюда вызовы методов удаления из корзины и подсчета цены не получилось...
    */
  addToCart() {
    const cartList = new CartList();
    this.goods.forEach(good => {
      let button = document.getElementById(`${good.id_product}`);
      button.addEventListener('click', () => {
        if ( button.innerText === 'В КОРЗИНУ' ) {
          button.innerText = 'Добавлено';
          button.style.background = '#8c5241';
          cartList.cartGoods.push(good);
          cartList.render(cartList.cartGoods);
          cartList.calcTotalPrice(cartList.cartGoods);
          cartList.removeFromCart();
        }
      })
    })
  }

  render() {
    let listHTML = '';
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.id_product, good.product_name, good.price, good.img);
      listHTML += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHTML;
  }
}

class CartItem {
  constructor(id_product, product_name = "No title", price = 100, img = "noImage") {
    this.id_product = id_product;
    this.product_name = product_name;
    this.price = price;
    this.img = img;
  }
  render() {
    return `
    <div class="cart-item">
      <a href="#" class="cart-imgLink"><img src="img/${this.img}.jpeg" class="cart-img" alt="product"></a>
      <h3>${this.product_name}</h3>
      <p>${this.price}</p>
      <button type="button" data-id="${this.id_product}" class="removeFromCart">Удалить</button>
    </div>
    `
  }
}
class CartList {
  constructor() {
    this.cartGoods = [];
  }

  calcTotalPrice(objArr) {
    let totalPrice = 0;
    objArr.forEach((good) => {
      totalPrice += good.price;
    });
    document.querySelector('.totalPrice').innerText = totalPrice;
  }

  removeFromCart() {
    let removeButtons = document.querySelectorAll('.removeFromCart');

    this.cartGoods.forEach((cartGood) => {
      removeButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
          let addButton = document.getElementById(`${cartGood.id_product}`);
          if (cartGood.id_product === +event.target.dataset.id) {
            this.cartGoods.splice(this.cartGoods.indexOf(cartGood), 1);
            addButton.innerText = 'В корзину';
            addButton.style.background = '#cba59a';
          }
        })
      })
    })

    document.getElementById('updateCart').addEventListener('click', () => {
      this.render(this.cartGoods);
      this.calcTotalPrice(this.cartGoods);
    })
  }

  render(objArray) {
    let cartListHTML = '';

    objArray.forEach((good) => {
      const cartItem = new CartItem(good.id_product, good.product_name, good.price, good.img);
      cartListHTML += cartItem.render();
    });
    document.querySelector('.cart-list').innerHTML = cartListHTML;
  }
}

const init = async () => {
  const list = new GoodsList();
  await list.fetchGoods();
  list.render();
  list.addToCart();
};

window.onload = init;
