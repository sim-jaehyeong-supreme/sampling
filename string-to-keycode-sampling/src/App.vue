<script setup lang="ts">
import { ElInput } from "element-plus";
import { computed, ref } from "vue";

const data = ref<string>("");

const charCode = computed(() => {
  return data.value.split("").map((char) => {
    return char.charCodeAt(0)
  });
})
</script>

<template>
  <div>
    <label>input</label>
    <el-input v-model="data" />

  </div>
  <div>
    data: {{ data }}
  </div>
  <div>
    charCode: {{ charCode }}
  </div>

</template>
