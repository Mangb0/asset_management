<template>
  <div class="asset" v-if="$store.state.account.userno">
      <div class="act">
        <div>Ranking</div>

      </div>
      <div>
          현재 자산 : {{ state.account.money }}
      </div>
      <ul>
          <li v-for="d in state.data" :key="d.changeno" @click="edit(d.changeno)">{{ d.name }}</li>
      </ul>
      
  </div>
  <div v-else>
      <div>로그인 후 확인하실 수 있습니다.</div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import axios from "axios";

export default {
  setup() {
      const state = reactive({
          account: {
              userno: null,
              name: "",
              money: null
          },
          data: []
      });

      axios.get("/api/ranking").then((res) => {
        state.data = res.data;
        console.log("get ranking");
      });

      return { state };

  }

}
</script>

<style lang="scss" scoped>
.asset {
  .act{
      text-align: right;
      padding: 10px 5px 5px 5px;
  }
  ul {
      border-top: 1px solid #eee;
      list-style: none;
      padding: 15px 0;
      margin: 0;
      li {
          padding: 15px;
          margin: 5px;
          border: 1px solid #eee;
      }
  }
}
</style>