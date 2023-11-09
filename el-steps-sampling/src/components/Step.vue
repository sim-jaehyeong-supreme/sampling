<script setup>
defineProps({
  step: Number,
  title: String,
  status: String,
  isLast: Boolean,
});
</script>

<template>
  <div :class="['step', isLast ? 'is-flex' : null]" style="flex-basis: 50%">
    <div :class="['step__icon', 'is-text', status]">
      <div class="step__icon-inner">{{ step }}</div>
    </div>
    <div :class="['step__main', status]">
      <div class="step__title is-process">{{ title }}</div>
      <div class="step__description is-process"></div>
    </div>
    <div v-if="!isLast" class="step__line">
      <i
        class="step__line-inner"
        style="transition-delay: 0ms; border-width: 0px; width: 0%"
      ></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
.step {
  display: flex;
  flex-shrink: 1;

  &__icon {
    position: relative;
    z-index: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    font-size: 14px;
    box-sizing: border-box;
    transition: 0.15s ease-out;
    background: #0069b9;

    &.wait {
        background: #c6d3dd;
    }

    &.is-text {
        border-radius: 50%;
        border: 2px solid;
        border-color: inherit;
        color: #ffffff;
    }
  }

  &__main {
    text-align: left;
    margin-left: 4px;
    font-weight: 700;
    height: 100%;

    &.proccess,
    &.success {
        color: #666666;
    }

    &.wait {
        color: #c6d3dd;
    }
  }

  &__line {
    flex-grow: 1;
    background-color: #c6d3dd;
    height: 3px;
    align-self: center;
    display: flex;
    margin: 0 8px;
  }
}
.step:last-of-type.is-flex {
  flex-basis: auto !important;
  flex-shrink: 0;
  flex-grow: 0;
}
</style>
