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

export default {
    name: 'CartGoods'
}
