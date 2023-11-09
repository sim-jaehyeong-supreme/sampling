<script setup>
import { ref } from "vue";
import { ElSteps, ElStep } from "element-plus";
import Steps from "./components/Steps.vue";

const active = ref(0);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};

const items = [
    {
        title: "基本情報の設定",
        status: "process",
    },
    {
        title: "接続元の設定",
        status: "wait",
    },
    {
        title: "取り込みの設定",
        status: "wait",
    },
    {
        title: "カラムの設定",
        status: "wait",
    },
    {
        title: "オプション設定",
        status: "wait",
    },
];

const titles = ref([
"基本情報の設定",
"接続元の設定",
"取り込みの設定",
"カラムの設定",
"オプション設定"
]);

const currentIndex = ref(0);
</script>

<template>
  <el-steps :active="active" finish-status="success">
    <el-step title="Step 1" />
    <el-step title="Step 2" />
    <el-step title="Step 3" />
  </el-steps>

  <el-button style="margin-top: 12px" @click="next">Next step</el-button>

  <div class="steps steps--horizontal" style="">
    <div class="step is-horizontal" style="flex-basis: 50%">
      <div class="step__icon is-text">
        <div class="step__icon-inner">1</div>
      </div>
      <div class="step__main">
        <div class="step__title is-process">接続元・取り込みの設定</div>
        <div class="step__description is-process"></div>
      </div>
      <div class="step__line">
          <i
            class="step__line-inner"
            style="transition-delay: 0ms; border-width: 0px; width: 0%"
          ></i>
      </div>
    </div>
    <div class="step is-horizontal" style="flex-basis: 50%">
      <div class="step__icon is-text">
        <div class="step__icon-inner">1</div>
      </div>
      <div class="step__main">
        <div class="step__title is-process">接続元・取り込みの設定</div>
        <div class="step__description is-process"></div>
      </div>
      <div class="step__line">
          <i
            class="step__line-inner"
            style="transition-delay: 0ms; border-width: 0px; width: 0%"
          ></i>
      </div>
    </div>
    <div class="step is-horizontal" style="flex-basis: 50%">
      <div class="step__icon is-text">
        <div class="step__icon-inner">1</div>
      </div>
      <div class="step__main">
        <div class="step__title is-process">接続元・取り込みの設定</div>
        <div class="step__description is-process"></div>
      </div>
      <div class="step__line">
          <i
            class="step__line-inner"
            style="transition-delay: 0ms; border-width: 0px; width: 0%"
          ></i>
      </div>
    </div>
  </div>
  
  <Steps :items="items" />
</template>

<style scoped lang="scss">
.steps {
    display: flex;
    flex-direction: row;
}

.steps--horizontal {
    white-space: nowrap;
}

.step.is-horizontal {
    display: flex;
}
.step {
    position: relative;
    flex-shrink: 1;
}

.step__icon.is-text {
    border-radius: 50%;
    border: 2px solid;
    border-color: inherit;
    color: #ffffff;
}

.step__icon {
    position: relative;
    z-index: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    font-size: 14px;
    box-sizing: border-box;
    background: #0069B9;
    transition: .15s ease-out;
}

.step__main {
  white-space: normal;
  text-align: left;
  margin-left: 4px;
  font-weight: 700;
  height: 100%;
  color: #666666;
}

.step__line {
    flex-grow: 1;
    background-color: #C6D3DD;
    height: 3px;
    align-self: center;
    display: flex;
    margin: 0 8px;
}
</style>
