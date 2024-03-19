<template>
  <div class="auto-layout-input">
    <div class="title">{{ value.labels.title }}</div>
    <div class="input">
      <div class="label">{{ value.labels.input }}</div>
      <div class="content"><el-input :model-value="value.value" :placeholder="value.key" @update:model-value="$emit('update:value', value.inputType,value.position, value.key, $event)" /></div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ConditionValueInput } from '@/composables/use-auto-layout-controller';
import { ElInput } from 'element-plus';

defineProps<{ value: ConditionValueInput }>();
defineEmits<{ 
  (e: "update:value", inputType: "input", position: number, key: string, value: string): void;
}>()
</script>
