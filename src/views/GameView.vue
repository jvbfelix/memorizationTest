<script setup lang="ts">
import MemorizationGame from '@/components/MemorizationGame.vue'
import SequencesGame from '@/components/SequencesGame.vue'
import HuntingWords from '@/components/HuntingWords.vue'
import PresentationSection from '@/components/PresentationSection.vue'
import { reactive } from 'vue'
import TimerTile from '@/components/TimerTile.vue'
import { useConfigStore } from '@/stores/config'
import { storeToRefs } from 'pinia'
import PuzzleGame from '@/components/PuzzleGame.vue'
import TangramGame from '@/components/TangramGame.vue'
import TrailMakingTest from '@/components/TrailMakingTest.vue'

const store = useConfigStore()

const {
  HuntingWordsTime,
  SequencesGameTime,
  MemorizationGameTime,
  MemorizationMaxGrid,
  SequencesDifficulty,
  HuntingMaxGrid,
  HuntingWordsMax,
  HuntingWordsList,
  PuzzleGameTime,
  TangramGameTime,
  TrailMakingTestTime,
  TangramMaxPieces,
  TrailMakingMaxDots,
  PuzzleColumns,
  PuzzleRows,
  PuzzleImageUrls
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

const GameTime = () => {
  switch (game.presentation) {
    case 2:
      return PuzzleGameTime.value
    case 3:
      return TangramGameTime.value
    case 4:
      return TrailMakingTestTime.value
    default:
      return 10
  }
}
</script>

<template>
  <main>
    <div class="top-right">
      <RouterLink to="/config">Configuração</RouterLink>
    </div>
    <PresentationSection v-if="!game.active" :game="game.presentation" :startGame="nextGame" />
    <TimerTile v-if="game.active" :limit="GameTime()" :endGame="finishGame" />
    <!-- <HuntingWords
      v-if="game.active && game.presentation == 2"
      :maxGrid="HuntingMaxGrid"
      :words="HuntingWordsList"
      :wordsMax="HuntingWordsMax"
    /> -->
    <PuzzleGame v-if="game.active && game.presentation == 2" :columns="PuzzleColumns" :rows="PuzzleRows" :imageUrls="PuzzleImageUrls"/>
    <!-- <MemorizationGame v-if="game.active && game.presentation == 3" :maxGrid="MemorizationMaxGrid" />
    <SequencesGame v-if="game.active && game.presentation == 4" :difficulty="SequencesDifficulty" /> -->
    <TangramGame v-if="game.active && game.presentation == 3" :maxPieces="TangramMaxPieces" />
    <TrailMakingTest v-if="game.active && game.presentation == 4" :maxDots="TrailMakingMaxDots" />
  </main>
</template>

<style>
.top-right {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
