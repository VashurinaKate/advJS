"use strict";

var API_URL = "http://localhost:3000";
Vue.component('filter-goods', {
  data: function data() {
    return {
      searchLine: ''
    };
  },
  methods: {
    filterGoodsItem: function filterGoodsItem() {
      this.$root.filterGoods(this.searchLine);
    }
  },
  template: "\n        <div class=\"searchForm\">\n            <input type=\"text\" class=\"goodsSearch\" v-model=\"searchLine\">\n            <button class=\"searchButton\" v-on:click=\"filterGoodsItem\">\u0418\u0441\u043A\u0430\u0442\u044C</button>\n        </div>\n    "
});
Vue.component('goods-list', {
  props: ['goods'],
  template: "\n        <div class=\"goods-list\">\n            <goods-item v-for=\"goodEntity in goods\" :goodProp=\"goodEntity\"></goods-item>\n            <p v-if=\"goods.length === 0\">\u041F\u043E \u0412\u0430\u0448\u0435\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E</p>\n        </div>\n    "
});
Vue.component('goods-item', {
  props: ['goodProp'],
  methods: {
    addToCart: function addToCart(event) {
      var response, time, responseForStats;
      return regeneratorRuntime.async(function addToCart$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(fetch("".concat(API_URL, "/addToCart"), {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.goodProp)
              }));

            case 2:
              response = _context.sent;

              if (response.ok) {
                event.target.innerText = "Добавлено";
                event.target.style.background = "#b96a4f";
              }
              /*
                  Отправка данных о добавлении товара
              */


              time = Date();
              _context.next = 7;
              return regeneratorRuntime.awrap(fetch("".concat(API_URL, "/addStats"), {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                  action: "добавление в корзину",
                  addedCartItem: this.goodProp.product_name,
                  time: time
                })
              }));

            case 7:
              responseForStats = _context.sent;

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  },
  template: "\n        <div class=\"goods-item\">\n            <a href=\"#\" class=\"goods-imgLink\"><img src=\"img/noImage.jpeg\" class=\"goods-img\" alt=\"product\"></a>\n            <h3>{{goodProp.product_name}}</h3>\n            <p>{{goodProp.price}}</p>\n            <button type=\"button\" class=\"addToCart\" v-on:click=\"addToCart\">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</button>\n\n            <div class=\"holder\">\n                <div class=\"smallLine smallLine1\"></div>\n                <div class=\"smallLine smallLine2\"></div>\n            </div>\n        </div>\n    "
});
Vue.component('cart-goods', {
  props: ['cartGoods'],
  computed: {
    calcTotalPrice: function calcTotalPrice() {
      var totalPrice = 0;
      this.cartGoods.forEach(function (cartGood) {
        totalPrice += cartGood.price;
      });
      return totalPrice;
    }
  },
  template: "\n        <div class=\"cart-list\">\n            <cart-item v-for=\"cartGoodEntity in cartGoods\" :cartGoodProp=\"cartGoodEntity\"></cart-item>\n            <div v-if=\"cartGoods.length === 0\">\u0412\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430</div>\n\n            <div v-else style=\"display: flex;\">\n                <p>\u0418\u0442\u043E\u0433\u043E:</p><p class=\"emphasised\">{{ calcTotalPrice }}</p>\n            </div>\n        </div>\n    "
});
Vue.component('cart-item', {
  props: ['cartGoodProp'],
  methods: {
    removeFromCart: function removeFromCart() {
      var response, time, responseForStats;
      return regeneratorRuntime.async(function removeFromCart$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(fetch("".concat(API_URL, "/removeFromCart"), {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.cartGoodProp)
              }));

            case 2:
              response = _context2.sent;

              /*
                  Отправка данных об удалении товара
              */
              time = Date();
              _context2.next = 6;
              return regeneratorRuntime.awrap(fetch("".concat(API_URL, "/addStats"), {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                  action: "удаление из корзины",
                  removedCartItem: this.cartGoodProp.product_name,
                  time: time
                })
              }));

            case 6:
              responseForStats = _context2.sent;

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  },
  template: "\n        <div class=\"cart-item\">\n            <a href=\"#\" class=\"cart-imgLink\"><img src=\"img/noImage.jpeg\" class=\"cart-img\" alt=\"product\"></a>\n            <h3>{{cartGoodProp.product_name}}</h3>\n            <p>{{cartGoodProp.price}}</p>\n            <button class=\"removeFromCart\" v-on:click=\"removeFromCart\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n        </div>\n    "
});
Vue.component('connection-error', {
  props: ['is-connection-error'],
  template: "\n    <div class=\"error-wrap\" v-show=\"isConnectionError\">\n        <div class=\"error-modal\">\n            <p>\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0438 \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C</p>\n        </div>\n    </div>\n    "
});
var app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    cartGoods: [],
    isConnectionError: false
  },
  methods: {
    getProducts: function getProducts() {
      var response, catalogItems;
      return regeneratorRuntime.async(function getProducts$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(fetch("".concat(API_URL, "/catalogData")));

            case 2:
              response = _context3.sent;

              if (!response.ok) {
                _context3.next = 11;
                break;
              }

              _context3.next = 6;
              return regeneratorRuntime.awrap(response.json());

            case 6:
              catalogItems = _context3.sent;
              this.goods = catalogItems;
              this.filteredGoods = catalogItems;
              _context3.next = 12;
              break;

            case 11:
              this.isConnectionError = true;

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    },
    getCartGoods: function getCartGoods() {
      var response, cartItems;
      return regeneratorRuntime.async(function getCartGoods$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(fetch("".concat(API_URL, "/cartData")));

            case 2:
              response = _context4.sent;

              if (!response.ok) {
                _context4.next = 10;
                break;
              }

              _context4.next = 6;
              return regeneratorRuntime.awrap(response.json());

            case 6:
              cartItems = _context4.sent;
              this.cartGoods = cartItems;
              _context4.next = 11;
              break;

            case 10:
              this.isConnectionError = true;

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    },
    filterGoods: function filterGoods(value) {
      var regExp = new RegExp(value, 'i');
      this.filteredGoods = this.goods.filter(function (good) {
        return regExp.test(good.product_name);
      });
    }
  },
  mounted: function mounted() {
    return regeneratorRuntime.async(function mounted$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(this.getProducts());

          case 2:
            _context5.next = 4;
            return regeneratorRuntime.awrap(this.getCartGoods());

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  }
});