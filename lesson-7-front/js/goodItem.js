import { API_URL } from './app';

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

export default {
    name: 'GoodsItem'
}
