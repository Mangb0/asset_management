<template>
  <v-app>
    <v-main>
      <header-view/>
      <router-view/>
      <footer-view/>
    </v-main>
  </v-app>
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
  name: 'App',

  components: { HeaderView, FooterView }
}
</script>
