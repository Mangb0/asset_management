<template>
  <div class="board-detail">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
    <div class="board-contents">
      <h3>{{ $route.query.title }}</h3>
    </div>
    <div class="board-writer">
      <span>{{ $route.query.writer }}</span>
    </div>
    <div class="board-contents">
      <span>{{ $route.query.content }}</span>
    </div>
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
// import axios from "axios";
import router from "@/router/index";

export default {
    setup() {
        const state = reactive({
            account: {
                userno: null,
                name: "",
                money: null
            },
            data: [],
            board: {
              boardNo: null,
              title: "",
              content: ""
            }

        });

        console.log(router.query)

        return { state };

    }
}
</script>

<style>

</style>