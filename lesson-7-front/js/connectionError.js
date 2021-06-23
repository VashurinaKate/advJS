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

export default {
    name: 'ConnectionError',
}
