<template>
  <div style="border: 1px solid">
    <h1>Teleport Example</h1>
    <!-- disabled false이면 텔레포트, div로 true면 import된 컴포넌트로 들어감 -->
    <teleport to="#destination" :disabled="disableTeleport">
      <p>
        텔레포트가 disabled되면 텔레포트를 정의한 컴포넌트에 텔레포트 컴포넌트가
        삽입됩니다
      </p>
    </teleport>
    <button @click="disableTeleport = !disableTeleport">Toggle Teleport</button>

    <teleport to="#destination">
      <!-- 자식 엘리먼트 접근 -->
      <VModal ref="modal">
        modal content
      </VModal>
    </teleport>
    <button @click="showModal">Show Modal</button>
    <popupVue>
      <h2>popup</h2>
    </popupVue>
  </div>
</template>

<script>
import popupVue from './PopView.vue';
export default {
  setup() {
  },
  components: { popupVue }
};
</script>
