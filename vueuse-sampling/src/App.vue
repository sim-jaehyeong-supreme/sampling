<script setup>
import { ref, computed } from 'vue'
import { useLocalStorage, useMouse, usePreferredDark, formatDate, useManualRefHistory, useTransition, TransitionPresets } from '@vueuse/core'
import { useCounter, rand } from '@vueuse/shared'


// tracks mouse position
const { x, y } = useMouse()

// is user prefers dark theme
const isDark = usePreferredDark()

// persist state in localStorage
const store = useLocalStorage(
  'my-storage',
  {
    name: 'Apple',
    color: 'red',
  },
)

const format = (ts) => {
  return formatDate(new Date(ts), 'YYYY-MM-DD HH:mm:ss')
}

const { inc, dec, count } = useCounter()
const { canUndo, canRedo, history, commit, undo, redo } = useManualRefHistory(count, { capacity: 10 })


const source = ref([0, 0, 0])

const duration = 1000;
const output = useTransition(source, {
  duration: duration,
  transition: [0.75, 0, 0.25, 1],
})

const color = computed(() => {
  const [r, g, b] = output.value
  return `rgb(${r}, ${g}, ${b})`
})

const toggle = () => {
  source.value = [rand(0, 255), rand(0, 255), rand(0, 255)]
}
</script>

<template>
  <div><h3>useMouse</h3> x: {{ x }}, y: {{ y }}</div>
  <div><h3>isDark</h3> {{ isDark }}</div>
  
  <div>
    <h3>useManualRefHistory</h3>
    <div>
      <div>Count: {{ count }}</div>
      <button @click="inc()">
        Increment
      </button>
      <button @click="dec()">
        Decrement
      </button>
      <span class="ml-2">/</span>
      <button @click="commit()">
        Commit
      </button>
      <button :disabled="!canUndo" @click="undo()">
        Undo
      </button>
      <button :disabled="!canRedo" @click="redo()">
        Redo
      </button>
      <br/>
      <br/>
      <div v-for="i in history" :key="i.timestamp">
        <span class="opacity-50 mr-2 font-mono">{{ format(i.timestamp) }}</span>
        <span class="font-mono">{ value: {{ i.snapshot }} }</span>
      </div>
    </div>
  </div>


  <div>
    <h3>MaybeRef</h3>
    <div></div>
  </div>
  <div>
    <h3>MaybeRefOrGetter</h3>
    <div></div>
  </div>
  <div>
    <h3>TransitionPresets, useTransition</h3>
    <div>source : {{ source }}</div>
    <div>duration : {{ duration }}</div>
    <div>color : {{ color }}</div>
    <div :style="{'color': color}"><b>Result</b></div>
    <button @click="toggle">toggle</button>
  </div>
  <div>useUrlSearchParams</div>
  <div>useDraggable</div>
  <div>toValue</div>
</template>

<style scoped>

</style>
