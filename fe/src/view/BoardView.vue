<template>
    <div class="asset" v-if="$store.state.account.userno">
      <h2>게시판</h2>
      <p>각종 정보들을 올릴 수 있는 게시판입니다.</p>
      <div class="frame_cont">
        <ul>
            <li v-for="d in state.data" :key="d.boardno">
              <span class="num"> {{ d.boardno }}</span>
              <span class="title">
                <a href="" @click="s">{{ d.title }}</a>
              </span> 
              <div class="info">
                <span class="view">
                  <i class="ri-eye-line"></i>
                  <span>{{ d.hits }}</span>
                </span>
                <span class="writer">{{ d.writer }}</span>
              </div>
            </li> <!-- @click="edit(d.changeno)" -->
            
        </ul>
      </div>
        
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

        axios.get("/api/board").then((res) => {
            state.data = res.data;
            console.log("get board");
            console.log(res.data);
        });

        axios.get("/api/account").then((res) => {
            state.account = res.data;
            console.log("get account");
        })

        
        return { state };

    }
}
</script>

<style lang="scss" scoped>

.asset {
  // position: relative;
  // padding: 50px;
  // height: 100px;
  // background: #fff;
  // line-height: 1.2;
  
  h2{
    margin: 10px 0 18px 0;
    font-size: 38px;
    color: #171B27;
    font-weight: 700;
    text-align: left;
  }
    .act{
        text-align: right;
        padding: 10px 5px 5px 5px;
    }
    
    .frame_cont{
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
        }
    }
}
</style>