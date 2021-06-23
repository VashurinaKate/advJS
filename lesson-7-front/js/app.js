export const API_URL = "http://localhost:3000";

import GoodsList from './goodsList';
import GoodsItem from './goodItem';
import FilterGoods from './filterGoods';
import CartGoods from './cartGoods';
import CartItem from './cartItem';
import ConnectionError from './connectionError';

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
