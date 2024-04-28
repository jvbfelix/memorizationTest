<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  limit: number
  endGame: Function
}>()

const count = ref(0)

const formatedTime = computed(() => {
  const time = props.limit - count.value
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (time % 60).toString().padStart(2, '0')
  return minutes + ':' + seconds
})

const timer = () => {
  if (count.value >= props.limit) {
    clearInterval(cron)
    props.endGame()
  } else {
    count.value++
  }
}

const cron = setInterval(timer, 1000)
</script>

<template>
  <section class="timer">Tempo restante: {{ formatedTime }}</section>
</template>

<style scoped lang="scss">
.timer {
  padding: 10px;
  background-color: blue;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
