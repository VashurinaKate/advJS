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

export default {
    name: 'FilterGoods'
}
