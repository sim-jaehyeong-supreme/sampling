<script setup>
import { Codemirror } from "vue-codemirror";
import { sql, SQLDialect } from "@codemirror/lang-sql";
import { ref } from "vue";

const modelValue = ref("");

const extensions = [
  sql({
    dialect: SQLDialect.define({
      keywords: completionWords,
      charSetCasts: true,
      doubleDollarQuotedStrings: true,
      operatorChars: "+-*/<>=~!@#%^&|`?",
      specialVar: "",
      types: completionTypes,
    }),
  }),
];

const handleUpdateModelValue = (value) => {
    console.log(value);
    modelValue.value = value;
};

const completionWords =
  "select from where as like in with and or case when cast asc desc else limit order by";
const completionTypes =
  "boolean char date decimal double int integer numeric object timestamp varchar";
</script>

<template>
 <div class="area">
    <Codemirror
      :model-value="modelValue"
      :extensions="extensions"
      :tab-size="2"
      :tabindex="false"
      :style="{ height: '100%' }"
      @update:model-value="handleUpdateModelValue($event)"
    ></Codemirror>
 </div>
</template>

<style scoped>
.area {
  background-color: var(--white);
  height: 300px;
  width: 100%;
}
</style>
