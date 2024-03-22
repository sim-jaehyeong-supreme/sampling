<script setup lang="ts">
import { useFormData, typeValues, activeMonthValues, isStringArray } from "./composables/use-form-data";
import { ElInput, ElSelect, ElOption, ElCheckbox, ElCheckboxGroup } from "element-plus";
const { formData, updateFormData } = useFormData();
</script>

<template>
  <div>
    <div>title: {{ formData.title }}
      <el-input :model-value="formData.title" @update:model-value="updateFormData('title', $event)" />
    </div>
    <div>count: {{ formData.count }}
      <el-input :model-value="formData.count" type="number"
        @update:model-value="updateFormData('count', Number($event))" />
    </div>
    <div> type check: {{ formData.type }}
      <el-select :model-value="formData.type" @update:model-value="updateFormData('type', typeValues.check($event))">
        <el-option label="Inner Join" value="inner" />
        <el-option label="Louter Join" value="louter" />
        <el-option label="Router Join" value="router" />
        <el-option label="wrong" value="wrong" />
      </el-select>
    </div>
    <div> type guard: {{ formData.type }}
      <el-select :model-value="formData.type"
        @update:model-value="typeValues.guard($event) && updateFormData('type', $event)">
        <el-option label="Inner Join" value="inner" />
        <el-option label="Louter Join" value="louter" />
        <el-option label="Router Join" value="router" />
        <el-option label="wrong" value="wrong" />
      </el-select>
    </div>
    <div> active month list check: {{ formData.activeMonth }}
      <el-checkbox-group :model-value="formData.activeMonth" @update:model-value="
        Array.isArray($event)
        && isStringArray($event)
        && updateFormData('activeMonth', activeMonthValues.checkArr($event))">
        <el-checkbox label="1月" value="1" />
        <el-checkbox label="2月" value="2" />
        <el-checkbox label="3月" value="3" />
        <el-checkbox label="4月" value="4" />
        <el-checkbox label="5月" value="5" />
        <el-checkbox label="6月" value="6" />
        <el-checkbox label="7月" value="7" />
        <el-checkbox label="8月" value="8" />
        <el-checkbox label="9月" value="9" />
        <el-checkbox label="10月" value="10" />
        <el-checkbox label="11月" value="11" />
        <el-checkbox label="12月" value="12" />
        <el-checkbox label="13月" value="13" />
      </el-checkbox-group>
    </div>
    <div> active month list guard: {{ formData.activeMonth }}
      <el-checkbox-group :model-value="formData.activeMonth" @update:model-value="
        Array.isArray($event)
        && isStringArray($event)
        && activeMonthValues.guardArr($event)
        && updateFormData('activeMonth', $event)">
        <el-checkbox label="1月" value="1" />
        <el-checkbox label="2月" value="2" />
        <el-checkbox label="3月" value="3" />
        <el-checkbox label="4月" value="4" />
        <el-checkbox label="5月" value="5" />
        <el-checkbox label="6月" value="6" />
        <el-checkbox label="7月" value="7" />
        <el-checkbox label="8月" value="8" />
        <el-checkbox label="9月" value="9" />
        <el-checkbox label="10月" value="10" />
        <el-checkbox label="11月" value="11" />
        <el-checkbox label="12月" value="12" />
        <el-checkbox label="13月" value="13" />
      </el-checkbox-group>
    </div>
  </div>
</template>

<style scoped></style>
