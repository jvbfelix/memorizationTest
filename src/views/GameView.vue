<script setup lang="ts">
import MemorizationGame from '@/components/MemorizationGame.vue'
import SequencesGame from '@/components/SequencesGame.vue'
import HuntingWords from '@/components/HuntingWords.vue'
import PresentationSection from '@/components/PresentationSection.vue'
import { reactive } from 'vue'
import TimerTile from '@/components/TimerTile.vue'
import { useConfigStore } from '@/stores/config'
import { storeToRefs } from 'pinia'

const store = useConfigStore()

const {
  GameTime,
  MemorizationMaxGrid,
  SequencesDifficulty,
  HuntingMaxGrid,
  HuntingWordsMax,
  HuntingWordsList
} = storeToRefs(store)

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
    <div class="top-right">
      <RouterLink to="/config">Configuração</RouterLink>
    </div>
    <PresentationSection v-if="!game.active" :game="game.presentation" :startGame="nextGame" />
    <TimerTile v-if="game.active" :limit="GameTime" :endGame="finishGame" />
    <MemorizationGame v-if="game.active && game.presentation == 2" :maxGrid="MemorizationMaxGrid" />
    <SequencesGame v-if="game.active && game.presentation == 3" :difficulty="SequencesDifficulty" />
    <HuntingWords
      v-if="game.active && game.presentation == 4"
      :maxGrid="HuntingMaxGrid"
      :words="HuntingWordsList"
      :wordsMax="HuntingWordsMax"
    />
  </main>
</template>

<style>
.top-right {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
