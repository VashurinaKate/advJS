const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
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
        addToCartItem: function() {
            this.$root.addToCart(this.goodProp.id_product);
        }
    },
    template: `
        <div class="goods-item">
            <a href="#" class="goods-imgLink"><img src="img/noImage.jpeg" class="goods-img" alt="product"></a>
            <h3>{{goodProp.product_name}}</h3>
            <p>{{goodProp.price}}</p>
            <button type="button" class="addToCart" v-on:click="addToCartItem">В корзину</button>

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
        removeCartItem: function() {
            this.$root.removeFromCart(this.cartGoodProp.id_product);
        }
    },
    template: `
        <div class="cart-item">
            <a href="#" class="cart-imgLink"><img src="img/noImage.jpeg" class="cart-img" alt="product"></a>
            <h3>{{cartGoodProp.product_name}}</h3>
            <p>{{cartGoodProp.price}}</p>
            <button class="removeFromCart" v-on:click="removeCartItem">Удалить</button>
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
            const response = await fetch(`${API_URL}/catalogData.json`);
            if (response.ok) {
              const catalogItems = await response.json();
              this.goods = catalogItems;
              this.filteredGoods = catalogItems;
            } else {
                this.isConnectionError = true;
            }
        },

        filterGoods(value) {
            const regExp = new RegExp(value, 'i');
            this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name));
        },

        addToCart(id) {
            let checkGoods = this.cartGoods.find(cartGood => cartGood.id_product === id );
            if (checkGoods === undefined) {
                this.cartGoods.push(this.goods.find(good => good.id_product === id));
            }
        },

        removeFromCart(id) {
            let removedGood = this.cartGoods.findIndex(cartGood => cartGood.id_product === id );
            this.cartGoods.splice(removedGood, 1);
        },
    },

    async mounted() {
        await this.getProducts()
    }
});
