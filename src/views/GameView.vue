<script setup lang="ts">
import MemorizationGame from '@/components/MemorizationGame.vue'
import SequencesGame from '@/components/SequencesGame.vue'
import HuntingWords from '@/components/HuntingWords.vue'
import PresentationSection from '@/components/PresentationSection.vue'
import { reactive } from 'vue'
import TimerTile from '@/components/TimerTile.vue'

let game = reactive({ presentation: 0, active: false })
const nextGame = () => {
  if (game.presentation == 0) {
    game.presentation++
  } else if (game.presentation < 4) {
    game.presentation++
    game.active = true
  } else {
    game.presentation = 0
    game.active = false
  }
}

const finishGame = () => {
  game.active = false
}
</script>

<template>
  <main>
    <PresentationSection v-if="!game.active" :game="game.presentation" :startGame="nextGame" />
    <TimerTile v-if="game.active" :limit="2" :endGame="finishGame" />
    <MemorizationGame v-if="game.active && game.presentation == 2" />
    <SequencesGame v-if="game.active && game.presentation == 3" />
    <HuntingWords v-if="game.active && game.presentation == 4" />
  </main>
</template>
