<template>
  <div class="asset">
    <!-- v-if="$store.state.account.userno" -->
    <h2>게시판</h2>
    <p>각종 정보들을 올릴 수 있는 게시판입니다.</p>
    <div class="frame_cont">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">번호</th>
            <th class="text-left">제목</th>
            <th class="text-left">작성자</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in state.data" :key="d.boardno">
            <td>{{ d.boardno }}</td>
            <td>
              <a @click="onClickDetail(`${d.boardno}`)">{{ d.title }}</a>
            </td>
            <td>{{ d.writer }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-btn color="secondary" @click="onClickWrite()">글쓰기</v-btn>
    </div>
  </div>
  <!-- <div v-else>
        <div>로그인 후 확인하실 수 있습니다.</div>
    </div> -->
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import router from "@/router/index";

export default {
  setup() {
    const state = reactive({
      account: {
        userno: null,
        name: "",
        money: null,
      },
      data: [],
    });

    axios.get("/api/board").then((res) => {
      state.data = res.data;
      console.log("get board");
      console.log(res.data);
    });

    axios.get("/api/account").then((res) => {
      state.account = res.data;
      console.log("get account");
    });

    const onClickWrite = () => {
      router.push("/write");
    };

    const onClickDetail = (boardNo) => {
      router.push({
        path: "/board/detail",
        query: state.data[boardNo - 1],
      });
    };

    return { state, onClickWrite, onClickDetail };
  },
};
</script>

<style lang="scss" scoped>
.asset {
  // position: relative;
  // padding: 50px;
  // height: 100px;
  // background: #fff;
  // line-height: 1.2;

  h2 {
    margin: 10px 0 18px 0;
    font-size: 38px;
    color: #171b27;
    font-weight: 700;
    text-align: left;
  }
  .act {
    text-align: right;
    padding: 10px 5px 5px 5px;
  }

  .frame_cont {
    min-height: 460px;
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
      .view {
        min-width: 20;
        display: inline-flex;
        width: 60px;
        align-items: center;
        margin-right: 26px;
        font-size: 15px;
        font-weight: 400;
        line-height: 1.46;
        letter-spacing: -0.05em;
        color: #abb0bb;
      }
      span {
        font-size: 19px;
        display: inline-block;
        padding: 25px 0;
        vertical-align: middle;
        line-height: 1.3;
      }
    }
  }
}
</style>
