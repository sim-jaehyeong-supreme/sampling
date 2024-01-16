<template>
  <div style="border: solid 1px black">
    <div>
      {{ value }}
      <el-time-select
        v-model="value"
        start="08:30"
        step="00:15"
        end="18:30"
        placeholder="Select time"
      />
    </div>
    <div>
      {{ hours }}時{{ minutes }}分

      <el-time-select
        v-model="hours"
        start="00:00"
        step="01:00"
        end="23:00"
        placeholder="Select hours"
        format="HH"
      />
      <el-time-select
        v-model="minutes"
        start="00:00"
        step="00:01"
        end="00:59"
        placeholder="Select minutes"
        format="mm"
      />
    </div>
  </div>
  <div style="border: solid 1px black">
    <div>実行曜日:{{ executeDaysOfWeek }}</div>
    <el-select-v2
      :model-value="executeDaysOfWeek"
      :options="executeDaysOfWeekOptions"
      placeholder="複数選択"
      style="width: 240px"
      multiple
      :readonly="true"
      @update:model-value="executeDaysOfWeek = $event"
    />
  </div>
  <div style="border: solid 1px black">
    <div>実行曜日:{{ executeDaysOfWeek }}</div>
    <el-select-v2
      :model-value="executeDaysOfWeek"
      :options="executeDaysOfWeekOptionsCopy"
      placeholder="複数選択"
      style="width: 240px"
      multiple
      :readonly="true"
      @update:model-value="executeDaysOfWeek = $event"
    >
  </el-select-v2>
  </div>
  <div style="border: solid 1px black">
    <div>実行日:{{ executeDates }}</div>
    <el-select-v2
      :model-value="executeDates"
      :options="executeDatesOptions"
      placeholder="複数選択"
      style="width: 240px"
      multiple
      @update:model-value="executeDates = $event"
    />
  </div>
  <div style="border: solid 1px black">
    <div>実行時:{{ executeHours }}</div>
    <el-select-v2
      :model-value="executeHours"
      :options="executeHoursOptions"
      placeholder="複数選択"
      style="width: 240px"
      multiple
      @update:model-value="executeHours = $event"
    />
  </div>
  <div style="border: solid 1px black">
    <div>実行分:{{ executeMinutes }}</div>
    <el-select-v2
      :model-value="executeMinutes"
      :options="executeMinutesOptions"
      placeholder="複数選択"
      style="width: 240px"
      multiple
      @update:model-value="executeMinutes = $event"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { ElTimeSelect, ElSelectV2 } from "element-plus";

const value = ref();
const hours = ref();
const minutes = ref();

const executeDaysOfWeek = ref([]);
const executeDaysOfWeekOptions = [
  {value: "0", label: "月"},
  {value: "1", label: "火"},
  {value: "2", label: "水"},
  {value: "3", label: "木"},
  {value: "4", label: "金"},
  {value: "5", label: "土"},
  {value: "6", label: "日"},
];

const executeDaysOfWeekOptionsCopy = computed(() => {
  const options = [];
  executeDaysOfWeek.value.map((v) => {
    options.push({
      value: v,
      label: executeDaysOfWeekOptions.find((sub) => sub.value === v).label,
    });
  });
  return options;
})

const executeDates = ref([]);
const executeDatesOptions = Array.from({ length: 31 }).map((_, idx) => ({
    value: `${idx + 1}`.padStart(2, "0"),
    label: `${idx + 1}日`,
  }));

const executeHours = ref([]);
const executeHoursOptions = Array.from({ length: 24 }).map((_, idx) => ({
    value: `${idx}`.padStart(2, "0"),
    label: `${idx}`.padStart(2, "0")+"時"
  }));

const executeMinutes = ref([]);
const executeMinutesOptions = Array.from({ length: 60 }).map((_, idx) => ({
    value: `${idx}`.padStart(2, "0"),
    label: `${idx}`.padStart(2, "0")+"分"
  }));

const handleUpdate = (value) => {
  executeDates.value = value;
}

// 0~23」「0~59
</script>
