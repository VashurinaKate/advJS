const goods = [
    { title: 'Shirt', price: 150, img: 'Shirt' },
    { title: 'Socks', price: 50, img: 'Socks' },
    { title: 'Jacket', price: 350, img: 'Jacket' },
    { title: 'Shoes', price: 250, img: 'Shoes' },
    { price: 130 },
    { title: 'Accessories' },
    {  },
  ]

// Не смогла придумать, как избавиться от вспомогательной разметки в коде
  const helpLine = `<div class="holder">
    <div class="smallLine smallLine1"></div>
    <div class="smallLine smallLine2"></div>
  </div>`;

  // Задала значения по умолчанию для title, price, img
  const renderGoodsItem = ({title = 'No title', price = 100, img = 'noImage' }) => {
    return `<div class="goods-item">
              <a href="#" class="goods-imgLink"><img src="img/${img}.jpeg" class="goods-img" alt="product"></a>
              <h3>${title}</h3>
              <p>${price}</p>
              <button type="button">Add to Cart</button>
              ${helpLine}
            </div>`
  }
  
  const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item))
    document.querySelector('.goods-list').innerHTML = goodsList.join(''); // убрала запятые
  }
  
  const init = () => {
    renderGoodsList(goods)
  }
  
  window.onload = init
  