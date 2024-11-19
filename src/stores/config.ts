import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('configuration', () => {
  const HuntingWordsTime = ref(Number(localStorage.getItem('HuntingWordsTime')) || 60)
  const SequencesGameTime = ref(Number(localStorage.getItem('SequencesGameTime')) || 60)
  const MemorizationGameTime = ref(Number(localStorage.getItem('MemorizationGameTime')) || 60)
  const MemorizationMaxGrid = ref(Number(localStorage.getItem('MemorizationMaxGrid')) || 6)
  const SequencesDifficulty = ref(Number(localStorage.getItem('SequencesDifficulty')) || 1)
  const HuntingMaxGrid = ref(Number(localStorage.getItem('HuntingMaxGrid')) || 16)
  const HuntingWordsMax = ref(Number(localStorage.getItem('HuntingWordsMax')) || 0)
  const HuntingWordsList = ref(JSON.parse(localStorage.getItem('HuntingWordsList') || '[""]'))
  const PuzzleGameTime = ref(Number(localStorage.getItem('PuzzleGameTime')) || 60)
  const TangramGameTime = ref(Number(localStorage.getItem('TangramGameTime')) || 60)
  const TrailMakingTestTime = ref(Number(localStorage.getItem('TrailMakingTestTime')) || 60)
  const TangramMaxPieces = ref(Number(localStorage.getItem('TangramMaxPieces')) || 7)
  const TrailMakingMaxDots = ref(Number(localStorage.getItem('TrailMakingMaxDots')) || 25)
  const PuzzleColumns = ref(Number(localStorage.getItem('PuzzleColumns')) || 4)
  const PuzzleRows = ref(Number(localStorage.getItem('PuzzleRows')) || 4)
  const PuzzleImageUrls = ref(JSON.parse(localStorage.getItem('PuzzleImageUrls') || '[]'))

  function setPuzzleColumns(value: number) {
    PuzzleColumns.value = value
    localStorage.setItem('PuzzleColumns', value.toString())
  }

  function setPuzzleRows(value: number) {
    PuzzleRows.value = value
    localStorage.setItem('PuzzleRows', value.toString())
  }

  function setPuzzleImageUrls(value: string[]) {
    PuzzleImageUrls.value = value
    localStorage.setItem('PuzzleImageUrls', JSON.stringify(value))
  }

  function setTangramMaxPieces(value: number) {
    TangramMaxPieces.value = value
    localStorage.setItem('TangramMaxPieces', value.toString())
  }

  function setTrailMakingMaxDots(value: number) {
    TrailMakingMaxDots.value = value
    localStorage.setItem('TrailMakingMaxDots', value.toString())
  }

  function setPuzzleGameTime(value: number) {
    PuzzleGameTime.value = value
    localStorage.setItem('PuzzleGameTime', value.toString())
  }

  function setTangramGameTime(value: number) {
    TangramGameTime.value = value
    localStorage.setItem('TangramGameTime', value.toString())
  }

  function setTrailMakingTestTime(value: number) {
    TrailMakingTestTime.value = value
    localStorage.setItem('TrailMakingTestTime', value.toString())
  }

  function setHuntingWordsTime(value: number) {
    HuntingWordsTime.value = value
    localStorage.setItem('HuntingWordsTime', value.toString())
  }

  function setSequencesGameTime(value: number) {
    SequencesGameTime.value = value
    localStorage.setItem('SequencesGameTime', value.toString())
  }

  function setMemorizationGameTime(value: number) {
    MemorizationGameTime.value = value
    localStorage.setItem('MemorizationGameTime', value.toString())
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
    HuntingWordsTime,
    SequencesGameTime,
    MemorizationMaxGrid,
    MemorizationGameTime,
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
    PuzzleImageUrls,
    setHuntingWordsTime,
    setSequencesGameTime,
    setMemorizationGameTime,
    setMemorizationMaxGrid,
    setSequencesDifficulty,
    setHuntingMaxGrid,
    setHuntingWordsMax,
    setHuntingWordsList,
    setPuzzleGameTime,
    setTangramGameTime,
    setTrailMakingTestTime,
    setTangramMaxPieces,
    setTrailMakingMaxDots,
    setPuzzleColumns,
    setPuzzleRows,
    setPuzzleImageUrls
  }
})
