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
export default {
  components: { HeaderView, FooterView }
}
</script>
