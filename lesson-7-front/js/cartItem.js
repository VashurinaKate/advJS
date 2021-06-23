import { API_URL } from './app';

Vue.component('cart-item', {
    props: ['cartGoodProp'],
    
    methods: {
        async removeFromCart() {
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

export default {
    name: 'CartItem'
}
