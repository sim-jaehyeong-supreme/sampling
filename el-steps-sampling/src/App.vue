<script setup>
import { ref } from "vue";
import { ElSteps, ElStep } from "element-plus";
import Steps from "./components/Steps.vue";

const active = ref(0);
const titles = ref([
  "基本情報の設定",
  "接続元の設定",
  "取り込みの設定",
  "カラムの設定",
  "オプション設定"
]);

const next = () => {
  if (titles.value.length - 1 === active.value) {
    active.value = 0;
  } else {
    active.value++;
  }
}
</script>

<template>  
  <Steps :titles="titles" :active="active"/>
  <button @click="next">Next</button>
</template>

<style scoped lang="scss">
</style>
