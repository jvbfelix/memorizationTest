import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('configuration', () => {
  const GameTime = ref(Number(localStorage.getItem('GameTime')) || 60)
  const MemorizationMaxGrid = ref(Number(localStorage.getItem('MemorizationMaxGrid')) || 6)
  const SequencesDifficulty = ref(Number(localStorage.getItem('SequencesDifficulty')) || 1)
  const HuntingMaxGrid = ref(Number(localStorage.getItem('HuntingMaxGrid')) || 16)
  const HuntingWordsMax = ref(Number(localStorage.getItem('HuntingWordsMax')) || 0)
  const HuntingWordsList = ref(JSON.parse(localStorage.getItem('HuntingWordsList') || '[""]'))

  function setGameTime(value: number) {
    GameTime.value = value
    localStorage.setItem('GameTime', value.toString())
  }

  function setMemorizationMaxGrid(value: number) {
    MemorizationMaxGrid.value = value
    localStorage.setItem('MemorizationMaxGrid', value.toString())
  }

  function setSequencesDifficulty(value: number) {
    SequencesDifficulty.value = value
    localStorage.setItem('SequencesDifficulty', value.toString())
  }

  function setHuntingMaxGrid(value: number) {
    HuntingMaxGrid.value = value
    localStorage.setItem('HuntingMaxGrid', value.toString())
  }

  function setHuntingWordsMax(value: number) {
    HuntingWordsMax.value = value
    localStorage.setItem('HuntingWordsMax', value.toString())
  }

  function setHuntingWordsList(value: string[]) {
    HuntingWordsList.value = value
    localStorage.setItem('HuntingWordsList', JSON.stringify(value))
  }

  return {
    GameTime,
    MemorizationMaxGrid,
    SequencesDifficulty,
    HuntingMaxGrid,
    HuntingWordsMax,
    HuntingWordsList,
    setGameTime,
    setMemorizationMaxGrid,
    setSequencesDifficulty,
    setHuntingMaxGrid,
    setHuntingWordsMax,
    setHuntingWordsList
  }
})
