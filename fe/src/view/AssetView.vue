<template>
    <div class="asset" v-if="$store.state.account.userno">
        <div class="act">
            <button class="btn btn-primary" @click="TogglePopup('buttonTrigger')">+ 추가</button>
            <popupVue v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')">
              <h2>popup</h2>
            </popupVue>

        </div>
        <div>
            현재 자산 : {{ state.account.money }}
        </div>
        <ul>
            <li v-for="d in state.data" :key="d.changeno" @click="edit(d.changeno)">{{ d.money }}</li>
        </ul>
        
      <popupVue v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')">
        <h2>popup</h2>
      </popupVue>
    </div>
    <div v-else>
        <div>로그인 후 확인하실 수 있습니다.</div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { ref } from 'vue';
import axios from "axios";
import popupVue from './PopView.vue';

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
            if(content) {
              axios.put("/api/assets/" + changeno, { content, userno: state.account.userno }).then((res) => {
                state.data = res.data;
              });
            }else console.log("not changed");

        };

        axios.get("/api/assets").then((res) => {
            state.data = res.data;
            console.log("get assets");
        });

        axios.get("/api/account").then((res) => {
            state.account = res.data;
            console.log("get account");
        })

            
        const popupTriggers = ref({
          buttonTrigger: false,
        });
        
        const TogglePopup = (trigger) => {
          popupTriggers.value[trigger] = !popupTriggers.value[trigger];

        }
        
        return { state, add, edit, popupTriggers, TogglePopup };

    },

    components: { popupVue }

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