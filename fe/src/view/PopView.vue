<template>
    <div class="popup">
        <div class="popup-inner">
            <slot />
            <Datepicker
                v-model = "picked"
                :format="yyyy-mm-dd"
            />
            <button type="button" @click="getCalValue()" ref="inputs.dp1">Get Value</button>
            <button class="popup-close" @click="TogglePopup()">
                Close Popup
            </button>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import { ref, reactive } from 'vue'

export default({
    setup() {
        
        const picked = ref(new Date());
        const locale = reactive('date-fns/locale');

        const format = (date) => {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return `Selected date is ${day}/${month}/${year}`;
        }
        

        const getCalValue = () => {
            const date = picked.value.getDate();
            const month = picked.value.getMonth() + 1;
            const year = picked.value.getFullYear();
            console.log(date, month, year);
            alert(`${year} ${month} ${date}`);
        }

        return {
            picked,
            locale,
            format,
            getCalValue
        }
    },
    props: ['TogglePopup'],
    components: { Datepicker }
})
</script>

<style lang="scss" scoped>
.popup{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner {
        background: #FFF;
        padding: 32px;
    }
}
</style>