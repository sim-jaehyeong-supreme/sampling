<template>
  <div style="width: 400px">
    <bar-line :chart-data="data" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart,
  ChartDataset,
  registerables,
} from "chart.js";
import { defineChartComponent } from "vue-chart-3";


Chart.register(...registerables);

const BarLine = defineChartComponent<"bar" | "line">("BarLine", "bar");
BarLine.id = "bar-line";

const target = 0.3;
const rest = 0.3;
const targetValue = 0.55;


const data: {
  labels: string[];
  datasets: ChartDataset<"line" | "bar">[]
} = {
  labels: ["Red"],
  datasets: [
    {
      label: "Target",
      order: 2,
      type: "bar",
      stack: "bar",
      indexAxis: "y",
      data: [target],
      barPercentage: 1,
      borderRadius: 12,
    },
    {
      label: "Rest",
      order: 2,
      type: "bar",
      stack: "bar",
      indexAxis: "y",
      data: [rest],
      backgroundColor: "black",
      borderRadius: 12,
    },
    {
      label: "Target Value",
      order: 1,
      type: "line",
      data: [targetValue],
      indexAxis: "y",
      backgroundColor: "#ff0000",
      pointStyle: "rect",
      pointRotation: 45,
      pointBorderWidth: 12,
      pointBackgroundColor: "red",
      pointBorderColor: "red",
    }
  ],
}


</script>
