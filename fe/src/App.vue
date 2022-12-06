<template>
    <div class="app">
        <HeaderView/>
        <!-- <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link> -->
        <router-view/>
        <FooterView/>
    </div>
    
</template>

<script>

import FooterView from './components/FooterView.vue';
import HeaderView from './components/HeaderView.vue';
import store from "@/store/store";

export default {
  setup() {
    const userno = sessionStorage.getItem("userno");

    if(userno) {
      store.commit("setAccount", JSON.parse(userno));
    }
  },

  components: { HeaderView, FooterView }
}
</script>
