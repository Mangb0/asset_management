import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            account: {
                userno: 0,
                name: "",

            }
        }
    },
    mutations: {
        setAccount(state, payload) {
            state.account = payload;
        }
    }
})

export default store;