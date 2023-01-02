<template>
    <div class="asset" v-if="$store.state.account.userno">
        <div class="act">
            <button class="btn btn-primary" @click="add()">+ 추가</button>
            <button class="btn btn-primary" @click="pagelink()">+ 이동</button>

        </div>
        <div>
            현재 자산 : {{ state.account.money }}
        </div>
        <ul>
            <li v-for="d in state.data" :key="d.changeno" @click="edit(d.changeno)">{{ d.money }}</li>
        </ul>
    </div>
    <div v-else>
        <div>로그인 후 확인하실 수 있습니다.</div>
    </div>
</template>

<script>
import { reactive } from "vue";
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

        const pagelink = () => {
            this.$router.push('/login');
        }

        const add = () => {
            const content = prompt("내용을 입력해주세요.");
            if(!content) {
                alert("내용을 입력해주세요.");
                return add();
            }
            axios.post("/api/assets", { content }).then((res) => {
                state.data = res.data;
            });
        };

        const edit = (changeno) => {
            const content = prompt("내용을 입력해주세요", state.data.find(d=>d.changeno === changeno).money);
            axios.put("/api/assets/" + changeno, { content }).then((res) => {
                state.data = res.data;
            });
        };

        axios.get("/api/assets").then((res) => {
            state.data = res.data;
        });

        axios.get("/api/account").then((res) => {
            state.account = res.data;
        })

        return { state, add, edit, pagelink };
    },
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