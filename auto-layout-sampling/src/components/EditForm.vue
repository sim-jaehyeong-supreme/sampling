<template>
  <div class="edit-form-wrap">
    <div class="title"><h4>{{ editCondition.type }}</h4></div>
    <div class="auto-layout" v-for="conditionValue in editCondition.conditionValues">
      <auto-layout-input v-if="conditionValue.inputType === 'input'" :value="conditionValue" @update:value="updateValue"/>
      <auto-layout-range-input v-if="conditionValue.inputType === 'rangeInput'" :value="conditionValue" @update:value="updateValue"/>
    </div>
  </div>

</template>

<script setup lang="ts">
import { EditFormTarget } from '@/composables/use-auto-layout-controller';
import { useEditForm } from '@/composables/use-edit-form';
import AutoLayoutInput from '@/components/AutoLayoutInput.vue';
import AutoLayoutRangeInput from '@/components/AutoLayoutRangeInput.vue';


const props = defineProps<{ 
  target: EditFormTarget
 }>()

const { editCondition, updateValue } = useEditForm(props.target);
</script>

<style scoped>

</style>
