<template>
  <div class="form-signin w-100 m-auto">
    <div>
      <form>
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            v-model="state.form.id"
          />
          <label for="floatingInput">Email address</label>
          <button class="aa" @click="check()">Check</button>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="state.form.pw"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="state.form.pw"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingName"
            placeholder="name"
            v-model="state.form.name"
          />
          <label for="floatingPassword">Name</label>
        </div>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" @click="submit()">
          Sign up
        </button>
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
        money: null,
      },
      form: {
        id: "",
        pw: "",
        name: "",
      },
    });
    const check = () => {
      axios
        .post("/api/checkId", state.form)
        .then((res) => {
          alert("사용할 수 있는 아이디입니다");
          state.account = res.data;
        })
        .catch(() => {
          alert("중복되는 아이디가 존재합니다");
        });
    };
    const submit = () => {
      axios
        .post("/api/signup", state.form)
        .then((res) => {
          alert("회원가입 성공");
          state.account = res.data;
          store.commit("setAccount", res.data);
          router.push({ path: "/login" });
        })
        .catch(() => {
          alert("회원가입 실패");
        });
    };

    axios.get("/api/account").then((res) => {
      store.commit("setAccount", res.data);
    });

    return { state, submit, check };
  },
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

.form-signin {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="text"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
