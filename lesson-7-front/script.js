const API_URL = "http://localhost:3000";

Vue.component('filter-goods', {
    data() {
        return { searchLine: '', }
    },
    methods: {
        filterGoodsItem: function() {
            this.$root.filterGoods(this.searchLine);
        }
    },
    template: `
        <div class="searchForm">
            <input type="text" class="goodsSearch" v-model="searchLine">
            <button class="searchButton" v-on:click="filterGoodsItem">Искать</button>
        </div>
    `
});

Vue.component('goods-list', {
    props: ['goods'],
    template: `
        <div class="goods-list">
            <goods-item v-for="goodEntity in goods" :goodProp="goodEntity"></goods-item>
            <p v-if="goods.length === 0">По Вашему запросу ничего не найдено</p>
        </div>
    `
});

Vue.component('goods-item', {
    props: ['goodProp'],
    methods: {
        async addToCart(event) {
            const response = await fetch(`${API_URL}/addToCart`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.goodProp)
            });
            if (response.ok) {
                event.target.innerText = "Добавлено";
                event.target.style.background = "#b96a4f";
            }

            /*
                Отправка данных о добавлении товара
            */
            const time = Date();

            const responseForStats = await fetch(`${API_URL}/addStats`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    action: "добавление в корзину",
                    addedCartItem: this.goodProp.product_name,
                    time: time,
                })
            });
        },
    },
    
    template: `
        <div class="goods-item">
            <a href="#" class="goods-imgLink"><img src="img/noImage.jpeg" class="goods-img" alt="product"></a>
            <h3>{{goodProp.product_name}}</h3>
            <p>{{goodProp.price}}</p>
            <button type="button" class="addToCart" v-on:click="addToCart">В корзину</button>

            <div class="holder">
                <div class="smallLine smallLine1"></div>
                <div class="smallLine smallLine2"></div>
            </div>
        </div>
    `
});

Vue.component('cart-goods', {
    props: ['cartGoods'],
    computed: {
        calcTotalPrice: function() {
            let totalPrice = 0;
            this.cartGoods.forEach((cartGood) => {
              totalPrice += cartGood.price;
            });
            return totalPrice;
        }
    },

    template: `
        <div class="cart-list">
            <cart-item v-for="cartGoodEntity in cartGoods" :cartGoodProp="cartGoodEntity"></cart-item>
            <div v-if="cartGoods.length === 0">Ваша корзина пуста</div>

            <div v-else style="display: flex;">
                <p>Итого:</p><p class="emphasised">{{ calcTotalPrice }}</p>
            </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartGoodProp'],
    
    methods: {
        async removeFromCart() {
            /*
                Удаление товара из корзины
            */
            const response = await fetch(`${API_URL}/removeFromCart`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.cartGoodProp)
            });

            /*
                Отправка данных об удалении товара
            */
            const time = Date();

            const responseForStats = await fetch(`${API_URL}/addStats`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    action: "удаление из корзины",
                    removedCartItem: this.cartGoodProp.product_name,
                    time: time,
                })
            });
        },
    },

    template: `
        <div class="cart-item">
            <a href="#" class="cart-imgLink"><img src="img/noImage.jpeg" class="cart-img" alt="product"></a>
            <h3>{{cartGoodProp.product_name}}</h3>
            <p>{{cartGoodProp.price}}</p>
            <button class="removeFromCart" v-on:click="removeFromCart">Удалить</button>
        </div>
    `
});

Vue.component('connection-error', {
    props: ['is-connection-error'],
    template: `
    <div class="error-wrap" v-show="isConnectionError">
        <div class="error-modal">
            <p>Ошибка при соединении с сервером</p>
        </div>
    </div>
    `
});

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        cartGoods: [],
        isConnectionError: false,
    },

    methods: {
        async getProducts() {
            const response = await fetch(`${API_URL}/catalogData`);
            if (response.ok) {
              const catalogItems = await response.json();
              this.goods = catalogItems;
              this.filteredGoods = catalogItems;
            } else {
                this.isConnectionError = true;
            }
        },

        async getCartGoods() {
            const response = await fetch(`${API_URL}/cartData`);
            if (response.ok) {
                const cartItems = await response.json();
                this.cartGoods = cartItems;
            } else {
                this.isConnectionError = true;
            }
        },

        filterGoods(value) {
            const regExp = new RegExp(value, 'i');
            this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name));
        },
    },

    async mounted() {
        await this.getProducts();
        await this.getCartGoods();
    }
});
