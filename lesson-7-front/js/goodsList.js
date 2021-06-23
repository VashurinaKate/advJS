Vue.component('goods-list', {
    props: ['goods'],
    template: `
        <div class="goods-list">
            <goods-item v-for="goodEntity in goods" :goodProp="goodEntity"></goods-item>
            <p v-if="goods.length === 0">По Вашему запросу ничего не найдено</p>
        </div>
    `
});

export default {
    name: 'GoodsList'
}
