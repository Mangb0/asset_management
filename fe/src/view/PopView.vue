<template>
    <div class="popup-wrap" id="popup">
        <div class="popup">
            <div class="popup-header">
                <span class="head-title">add asset</span>
            </div>
            <button type="button" class="btn-close" aria-label="Close" @click="TogglePopup()"></button>
            <div class="popup-inner">
               
                <slot />
                <select v-model="data.add.selected">
                    <option
                        v-for="(item, index) in data.selectList"
                            :key="index"
                            :value="item.value">{{ item.name }}
                    </option>
                </select>
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput" placeholder="How much Money" v-model="data.add.money">
                    <label for="floatingInput">Money</label>
                </div>
                <Datepicker v-model = "data.add.date" class="datepicker"/>
                <button type="button" @click="getCalValue()">Get Value</button>
                <button class="popup-close" @click="TogglePopup()">
                    Close Popup
                </button>
                <button class="btn btn-primary" @click="[add(), TogglePopup()]">+ 추가</button>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import { ref, reactive } from 'vue'
import axios from "axios";
import store from '@/store/store';

export default({
    setup() {
        const data = reactive({
            add: {
                userno: null,
                selected: "",
                money: null,
                date: new Date(),
            },
            selectList: [{ name: "선택해주세요.", value: "" }, { name: "입금", value: 0 }, { name: "출금", value: 1 }],
            data: []

        });
        const picked = ref(new Date());
        const locale = reactive('date-fns/locale');
        data.add.userno = store.state.account.userno;
        console.log(data.add.userno);

        const format = (date) => {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return `${year}-${month}-${day}`;
        }
        

        const getCalValue = () => {
            alert(data.add.selected);
            format(data.add.date);
        }

        const add = () => {
            console.log(data.add.selected);
            console.log(data.add.money);
            console.log(format(data.add.date));
            console.log(data.add);

            
            axios.post("/api/asseets", data.add).then((res) => {
                data.data = res.data;
            });
        }

        return {
            picked,
            locale,
            data,
            format,
            getCalValue,
            add
        }
    },
    props: ['TogglePopup'],
    components: { Datepicker }
})
</script>

<style lang="scss" scoped>
.popup-wrap {
    background-color:rgba(0,0,0,.3); 
  //배경색과 투명도로 살짝 어둡지만 투명한 배경
  //허공에 붕 떠있는 느낌을 주고 싶으면 안넣어도 무방
  justify-content:center; //수평 중앙정렬
  align-items:center;     //수직 중앙정렬
  position:fixed;         // 포지션 픽스, 화면이 스크롤되더라도 고정되기 위함
  top:0;
  left:0;
  right:0;
  bottom:0;               //모든 방향에 0을 주면 화면에 꽉차게 됩니다.
  overflow:hidden;          //각을 없앴을 때 내부 영역이 튀어나오는걸 방지
  //이벤트가 발생할 때 띄우기 위해 숨김
  //처음부터 보이게 하는 상황이라면 display:flex;
  padding:15px; 
  display: flex;
}
.popup{
    width:100%;               //반응형 이기 때문에 가로값은 100%
    max-width:400px;          //팝업의 최대 크기지정
    border-radius:10px;       //둥글둥글한 디자인을 위해 각을 없앱니다.
    background-color:#264db5; //배경색
    //팝업이 허공에 떠있는 듯한 느낌을 주기 위한 그림자 효과.
    box-shadow: 5px 10px 10px 1px rgba(0,0,0,.3); 

    .popup-header {
        
        width:100%;
        //부모요소를 따라가기 때문에 굳이 가로값을 주지 않아도 되지만 일부 ie에서 인식 못하는 문제가 있음
        height:50px;  //헤드 영역 높이
        display:flex; //로고 이미지나 텍스트를 중앙 정렬하기 위한 flex 및 정렬
        align-items:center;
        justify-content:center;
        
    }
    .btn-close {
        
        display:flex;
        justify-content:center; //수평 중앙정렬
        align-items:center;  
        position: fixed;
    }
    .popup-inner {
        width:100%;
        overflow:visible;
        border-end-end-radius: 10px;
        border-end-start-radius: 10px;
        background: #FFF;
        padding: 32px;

        .datepicker {
            overflow:visible;
        }

    }
    
    
}
</style>