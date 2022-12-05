import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            account: {
                userno: 0
            }
        }
    },
    mutations: {
        setAccount(state, payload) {
            state.account.userno = payload;
        }
    }
})

export default store;