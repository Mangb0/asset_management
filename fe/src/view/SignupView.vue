<template>
  <div class="form-signin w-100 m-auto">  
    <div>
      <form>
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="state.form.loginId">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="state.form.loginPw">
          <label for="floatingPassword">Password</label>
        </div>

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" @click="submit()">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import store from "@/store/store";
import router from "@/router/index";
export default {
  setup() {
    const state = reactive({
      account: {
        userno: null,
        name: "",
        money: null
      },
      form: {
        loginId: "",
        loginPw: ""
      }
    });

    const submit = () => {

      axios.post("/api/account", state.form).then((res) => {
        alert("로그인 성공");
        state.account = res.data;
        store.commit('setAccount', res.data);
        router.push({path: "/"});
      }).catch(() => {
        alert("로그인 실패");
      });
    };

    axios.get("/api/account").then((res) => {
      store.commit('setAccount', res.data); 
    });

    return { state, submit };
  }
};
</script>

<style scoped>
  .form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>