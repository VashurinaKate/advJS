const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        cartGoods: [],
    },

    computed: {
        totalPrice() {
            let totalPrice = 0;
            this.cartGoods.forEach((cartGood) => {
              totalPrice += cartGood.price;
            });
            return totalPrice;
        }
    },

    methods: {
        async getProducts() {
            const response = await fetch(`${API_URL}/catalogData.json`);
            if (response.ok) {
              const catalogItems = await response.json();
              this.goods = catalogItems;
              this.filteredGoods = catalogItems;
            } else {
                alert('Ошибка при соединении с сервером');
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

        changeButton(text) {
            if (text == 'В корзину') {
                text = 'Добавлено';
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
