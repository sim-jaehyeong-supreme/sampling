<script setup>
import { ref } from 'vue';
import invariant from 'tiny-invariant'
const data = ref("data");
const handleClick = () => {
  // 1. when data.value.length > 0 false
  // invariant(data.value.length > 0, ()=>{alert("empty")});
  
  // 2. when data.value.length > 0 true
  // invariant(data.value.length > 0, alert("true"));

  // 3. console error message(invariant failed)
  // invariant(data.value.length > 0);

  // 4. invariant error, exception handling
  try {
    invariant(data.value.length > 0);
  } catch (error) {
    console.error("invariant error")
  }


}
</script>

<template>
  <div>
    <input type="text" v-model="data"/>
    <button @click="handleClick">Click</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
