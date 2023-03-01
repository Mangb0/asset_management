<template>
  <v-form>
    <v-text-field
    v-model="data.board.title" label="제목"></v-text-field>
    <v-textarea
    v-model="data.board.content" label="내용"></v-textarea>
    <v-btn color="secondary" @click="onClickWrite()">글쓰기</v-btn>
  </v-form>
</template>

<script>
import { reactive } from 'vue';
import axios from "axios";
import store from '@/store/store';
import router from "@/router/index";

export default {
  setup() {
    const data = reactive({
      board: {
        title: "",
        content: "",
        writer: "",
        userno: null,
      },
      data: []

    });
    data.board.writer = store.state.account.name;
    data.board.userno = store.state.account.userno;

    const onClickWrite = () => {
      console.log(data.board.title+"제목")
      console.log(data.board.content+"내용")
      console.log(data.board.writer+"작성자")
      console.log(data.board.userno+"번호")
      axios.post("/api/board", data.board).then((res) => {
        data.data = res.data;
      });

      router.push('/board');

    }

    return {
      data,
      onClickWrite,
    }

  },
}
</script>
