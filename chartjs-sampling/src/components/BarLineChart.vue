<template>
  <div style="width: 400px">
    <bar-line :chart-data="data" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart,
  ChartData,
  ChartDataset,
  ChartTypeRegistry,
  DefaultDataPoint,
  registerables,
} from "chart.js";
import { BarChart, defineChartComponent } from "vue-chart-3";


Chart.register(...registerables);

const BarLine = defineChartComponent<"bar" | "line">("BarLine", "bar");
BarLine.id = "bar-line";

const data: {
  labels: string[];
  datasets: ChartDataset<"line" | "bar">[]
} = {
  labels: ["Red"],
  datasets: [
    {
      label: "My First dataset",
      order: 1,
      type: "bar",
      data: [10]
    },
    {
      label: "My second one",
      order: 2,
      type: "line",
      data: [15],
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
