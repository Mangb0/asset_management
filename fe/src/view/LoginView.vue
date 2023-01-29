<template>
  <div class="form-signin w-100 m-auto">  
    <div>
      <div v-if="$store.state.account.userno">{{ $store.state.account.userno }} {{ $store.state.account.name }}님 안녕하세요 {{ $store.state.account.money }}</div>
      <div v-else>
        <form>
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

          <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="아이디" v-model="state.form.loginId">
            <label for="floatingInput">아이디</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="비밀번호" v-model="state.form.loginPw">
            <label for="floatingPassword">비밀번호</label>
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
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import store from "@/store/store"; // store 기능
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
        // state.account = res.data; 필요 없어짐
        // router.push("/");
        // store기능/
        store.commit('setAccount', res.data);
        sessionStorage.setItem("userno", JSON.stringify(res.data));
        // console.log(state.account);
        console.log(store.state.account.userno);
        
        router.push('/');
      }).catch(() => {
        alert("로그인 실패");
      });


    };
    
    axios.get("/api/account").then((res) => {
      state.account = res.data;
      console.log(res.data);
      
    });

    return { submit, state };
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