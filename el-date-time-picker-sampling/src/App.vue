<script setup>
import { ElDatePicker, ElTimePicker } from "element-plus";
import { ref } from "vue";

const value1 = ref();
const value2 = ref();
const value3 = ref();
const value4 = ref();
const value5 = ref();
const value6 = ref([]);
const value7 = ref([]);
const value8 = ref([]);

const startDate = ref("");
const endDate = ref();
const startTime = ref();
const endTime = ref();

const handleDisabledDate = (date) => {
  return startDate.value.length === 0 || date.toLocaleDateString('sv-SE') <= startDate.value;
}

"year" |
  "month" |
  "date" |
  "dates" |
  "datetime" |
  "week" |
  "datetimerange" |
  "daterange" |
  "monthrange";
</script>

<template>
  <div>
    <!-- <div>value1: {{ value1 }}</div>
    <div>value2: {{ value2 }}</div>
    <div>value3: {{ value3 }}</div>
    <div>value4: {{ value4 }}</div>
    <div>value5: {{ value5 }}</div>
    <div>value6: {{ value6 }}</div>
    <div>value7: {{ value7 }}</div>
    <div>value8: {{ value8 }}</div> -->

    <div>startDate: {{ startDate }}, endDate: {{ endDate }}</div>
    <div>startTime: {{ startTime }}, endTime: {{ endTime }}</div>
  </div>
  <div>
    <div>
      <el-date-picker v-model="value1" type="year" />
    </div>
    <div>
      <el-date-picker v-model="value2" type="month" />
    </div>
    <div>
      <el-date-picker v-model="value3" type="date" />
    </div>
    <div>
      <el-date-picker v-model="value4" type="datetime" />
    </div>
    <div>
      <el-date-picker v-model="value5" type="week" />
    </div>
    <div>
      <el-date-picker
        v-model="value6"
        type="datetimerange"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        start-placeholder="Start Date"
        end-placeholder="End Date"
      />
    </div>
    <div>
      <el-date-picker
        v-model="value7"
        type="daterange"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        start-placeholder="Start Date"
        end-placeholder="End Date"
      />
    </div>
    <div>
      <el-time-picker
        v-model="value8"
        is-range
        start-placeholder="Start time"
        end-placeholder="End time"
        format="HH:mm:ss"
        value-format="HH:mm:ss"
      />
    </div>

    <div>
      <div>
        <el-date-picker
          v-model="startDate"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          placeholder="StartDate"
        />
        <el-date-picker
          v-model="endDate"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          placeholder="EndDate"
          :disabled-date="handleDisabledDate"
        />
      </div>
      <div>
        <el-time-picker
          v-model="startTime"
          placeholder="StartTime"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
        />
        <el-time-picker
          v-model="endTime"
          placeholder="EndTime"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
