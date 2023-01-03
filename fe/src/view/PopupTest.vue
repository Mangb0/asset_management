<template>
  <div style="border: 1px solid">
    <h1>Popup Example</h1>
    <button @click="TogglePopup('buttonTrigger')"> open popup </button>
    <popupVue v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')">
      <h2>popup</h2>
    </popupVue>
  </div>
</template>

<script>
import { ref } from 'vue';
import popupVue from './PopView.vue';
export default {
  setup() {
    const popupTriggers = ref({
      buttonTrigger: false,
    });
    
    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];

    }
    return { popupTriggers, TogglePopup };
  },
  
  components: { popupVue }
};
</script>
