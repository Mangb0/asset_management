<template>
    <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <h1>Asset_Management</h1>
        </a>

        <div class="text-end col-12" v-if="!$store.state.account.userno">
          <button type="button" class="btn btn-outline-light me-2" @click="moveTo()">Login</button>
          <button type="button" class="btn btn-warning">Sign-up</button>
        </div>
        <div class="text-end col-12" v-else>
          <button type="button" class="btn btn-outline-light me-2" @click="logout()">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import store from "@/store/store";
import router from "@/router/index";
import axios from "axios";

export default ({
    setup() {
        const logout = () => {
            axios.delete("/api/account").then(() => {
                alert("로그아웃되었습니다.");
                store.commit('setAccount', 0);
            });
            router.push('/');
        }

        const moveTo = () => {
            router.push('/login');
        }
        
        axios.get("/api/account").then((res) => {
        store.commit('setAccount', res.data); 
        console.log(res.data);
        });

        return { logout, moveTo };
    },
})
</script>


<style lang="scss" scoped>
header {

    h1 {
        font-size: 3vw;
        margin: 0;
        padding-top: 0.2rem;
        letter-spacing: 0.3rem;
        color: #03dac6;
    }

    li {
        text-align: right;
        padding-right: 0.5rem;
        color: #575757;

    }

    ul {
        padding-left: 2rem;
    }
}
</style>