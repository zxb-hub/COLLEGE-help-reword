import Vue from 'vue';
import Vuex from 'vuex';
 
Vue.use(Vuex);
 

const store = new Vuex.Store({
    state:{
        user:{}
    },
    mutations:{
        set(state,payload){
            state.user = payload;
            for (let x in payload) {
                sessionStorage.setItem(x,payload[x])
            }
        },
        delete(state){
            state.user = {};
            sessionStorage.clear();
        }


    },
    getters:{
        get(state){
            return state.user
        }
    }
})

export default store