<template>
  <div class="auto-layout-range-input">
    <div class="title">{{ value.labels.title }}</div>
    <div class="inputs">
      <div class="begin">
        <div class="label">{{ value.labels.begin }}</div>
        <div class="content"><el-input :model-value="value.value.begin" :placeholder="value.key.begin"
            @update:model-value="$emit('update:value', value.inputType, value.position, value.key, {
              begin: $event,
              end: value.value.end,
            })" /></div>
      </div>
      <div class="end">
        <div class="label">{{ value.labels.end }}</div>
        <div class="content"><el-input :model-value="value.value.end" :placeholder="value.key.end" @update:model-value="$emit('update:value', value.inputType, value.position, value.key, {
          begin: value.value.begin,
          end: $event,
        })" /></div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ConditionValueRangeInput } from '@/composables/use-auto-layout-controller';
import { ElInput } from 'element-plus';

defineProps<{ value: ConditionValueRangeInput }>();
defineEmits<{
  (e: "update:value", inputType: "rangeInput", position: number, key: string, value: {
    begin: string;
    end: string;
  }): void;
}>()
</script>

<style scoped lang="scss">
.auto-layout-range-input {
  .inputs {
    display: flex;
  }
}
</style>
