<script setup>
import SpSteps from "./components/SpSteps.vue";
import SpStep from "./components/SpStep.vue";
import { ref } from "vue";

const active = ref(1);
</script>

<template>
  <sp-steps :active="active" space="300px">
    <sp-step title="first" />
    <sp-step title="second" />
    <sp-step title="thrid" />
  </sp-steps>

  <sp-steps :active="active" space="300px" type="solid" finishColor="#FF0000" processColor="#000000" waitColor="#a8abb2" iconSize="36px">
    <sp-step title="first" />
    <sp-step title="second" />
    <sp-step title="thrid" />
  </sp-steps>

  <sp-steps :active="active" space="300px" type="outline" finishColor="#FF0000" processColor="#000000" waitColor="#a8abb2" iconSize="36px">
    <sp-step title="first" />
    <sp-step title="second" />
    <sp-step title="thrid" />
  </sp-steps>

  <sp-steps :active="active" direction="vertical" space="300px">
    <sp-step title="first" />
    <sp-step title="second" />
    <sp-step title="thrid" />
  </sp-steps>

  <sp-steps :active="active" direction="vertical"  space="300px" type="outline" finishColor="#FF0000" processColor="#000000" waitColor="#a8abb2" iconSize="36px">
    <sp-step title="first" />
    <sp-step title="second" />
    <sp-step title="thrid" />
  </sp-steps>
  
</template>
