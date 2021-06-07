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
      <button type="button" class="addToCart" data-id="${this.id_product}">В корзину</button>
      ${helpLine}
    </div>
    `
  }
}
class GoodsList {
  constructor() {
    this.goods = [];
    this.addedToCart = [];
    this.filteredGoods = [];
  }
  async fetchGoods() {
    const response = await fetch(`${API_URL}/catalogData.json`);
    if (response.ok) {
      const catalogItems = await response.json();
      this.goods = catalogItems;
      this.filteredGoods = catalogItems;
    }
    // this.goods = [
    //   { id_product: 12, product_name: 'kate', price: 123 },
    //   { id_product: 23, product_name: 'vania', price: 234 },
    //   { id_product: 34, product_name: 'alex', price: 345 },
    //   { id_product: 45, product_name: 'mary', price: 456 }
    // ]
  }

  filterGoods(value) {
    console.log(value);
    const regExp = new RegExp(value, 'i');
    this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name));
    console.log(this.filteredGoods);
    this.render(this.filteredGoods);
  }

  addToCart(id, cartList) {
    cartList.cartGoods = this.addedToCart;
    let checkGoods = cartList.cartGoods.find(cartGood => cartGood.id_product === id );
    if (checkGoods === undefined) {
      this.addedToCart.push(this.goods.find(good => good.id_product === id));
    }
  }

  render(props) {
    let listHTML = '';
    props.forEach((good) => {
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

  calcTotalPrice() {
    let totalPrice = 0;
    this.cartGoods.forEach((good) => {
      totalPrice += good.price;
    });
    document.querySelector('.totalPrice').innerText = totalPrice;
  }

  removeFromCart(id) {
    let removedGood = this.cartGoods.findIndex(cartGood => cartGood.id_product === id );
    this.cartGoods.splice(removedGood, 1);
    return this.cartGoods;
  }

  render() {
    let cartListHTML = '';

    this.cartGoods.forEach((good) => {
      const cartItem = new CartItem(good.id_product, good.product_name, good.price, good.img);
      cartListHTML += cartItem.render();
    });
    document.querySelector('.cart-list').innerHTML = cartListHTML;
  }
}

const init = async () => {
  const list = new GoodsList();
  const cartList = new CartList();

  await list.fetchGoods();
  list.render(list.goods);

  const searchButton = document.querySelector('.searchButton');
  const searchInput = document.querySelector('.goodsSearch');

  searchButton.addEventListener('click', () => {
    list.filterGoods(searchInput.value);
  })

  const updateCart = document.getElementById('updateCart');
  updateCart.addEventListener('click', () => {
    cartList.render();

    cartList.calcTotalPrice();

    const removeButtons = document.querySelectorAll('.removeFromCart');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', (event) => {
        cartList.removeFromCart(+event.target.dataset.id);
      })
    })
  })

  const addToCartButtons = document.querySelectorAll('.addToCart');
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
      list.addToCart(+event.target.dataset.id, cartList);
      if ( btn.innerText === 'В КОРЗИНУ' ) {
        btn.innerText = 'Добавлено';
        btn.style.background = '#8c5241';
      }
    })
  })
};

window.onload = init;
