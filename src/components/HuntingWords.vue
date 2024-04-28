<script setup lang="ts">
import { reactive, onMounted } from 'vue'

const maxGrid = 16
let gameTable: string[][] = reactive(Array.from(new Array(maxGrid).fill('')))
let gameTableMark: boolean[][] = reactive(Array.from(new Array(maxGrid).fill(false)))
let gameTableSelected: boolean[][] = reactive(
  new Array(maxGrid).fill(new Array(maxGrid).fill(false))
)
const words = ['teste', 'computação', 'árvore']
let wordsMark: { word: string; indexes: [number, number][] }[] = []
const gameData = reactive({ step: 0, target: 3, activeSelection: true })

const generateBlankTable = () => {
  const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < maxGrid; i++) {
    let line: string[] = new Array(maxGrid).fill('')
    let lineMark: boolean[] = new Array(maxGrid).fill(false)
    for (let j = 0; j < maxGrid; j++) {
      line[j] = chars[Math.floor(Math.random() * chars.length)]
    }
    gameTable[i] = line
    gameTableMark[i] = lineMark
  }
}

const insertWord = (word: string) => {
  const charsArr = word.toUpperCase().split('')
  let inserted = false
  let indexes: [number, number][] = []
  while (!inserted) {
    const way = Math.floor(Math.random() * 4)
    const randomIndexX = Math.floor(Math.random() * maxGrid)
    const randomIndexY = Math.floor(Math.random() * maxGrid)
    if (way != 1 && randomIndexX + word.length > maxGrid) {
      continue
    }
    if ((way == 1 || way == 2) && randomIndexY + word.length > maxGrid) {
      continue
    }
    if (way == 3 && randomIndexY - word.length < 0) {
      continue
    }
    let used = false
    for (let i = 0; i < word.length; i++) {
      if (way == 0) {
        used = used || gameTableMark[randomIndexX + i][randomIndexY]
      }
      if (way == 1) {
        used = used || gameTableMark[randomIndexX][randomIndexY + i]
      }
      if (way == 2) {
        used = used || gameTableMark[randomIndexX + i][randomIndexY + i]
      }
      if (way >= 3) {
        used = used || gameTableMark[randomIndexX + i][randomIndexY - i]
      }
    }
    if (used) {
      continue
    }
    for (let i = 0; i < word.length; i++) {
      if (way == 0) {
        let tempLine = Array.from(gameTable[randomIndexX + i])
        tempLine[randomIndexY] = charsArr[i]
        let tempMark = Array.from(gameTableMark[randomIndexX + i])
        tempMark[randomIndexY] = true

        indexes.push([randomIndexX + i, randomIndexY])
        gameTableMark[randomIndexX + i] = tempMark
        gameTable[randomIndexX + i] = tempLine
      }
      if (way == 1) {
        let tempLine = Array.from(gameTable[randomIndexX])
        tempLine[randomIndexY + i] = charsArr[i]
        let tempMark = Array.from(gameTableMark[randomIndexX])
        tempMark[randomIndexY + i] = true

        indexes.push([randomIndexX, randomIndexY + i])
        gameTableMark[randomIndexX] = tempMark
        gameTable[randomIndexX] = tempLine
      }
      if (way == 2) {
        let tempLine = Array.from(gameTable[randomIndexX + i])
        tempLine[randomIndexY + i] = charsArr[i]
        let tempMark = Array.from(gameTableMark[randomIndexX + i])
        tempMark[randomIndexY + i] = true

        indexes.push([randomIndexX + i, randomIndexY + i])
        gameTableMark[randomIndexX + i] = tempMark
        gameTable[randomIndexX + i] = tempLine
      }
      if (way >= 3) {
        let tempLine = Array.from(gameTable[randomIndexX + i])
        tempLine[randomIndexY - i] = charsArr[i]
        let tempMark = Array.from(gameTableMark[randomIndexX + i])
        tempMark[randomIndexY - i] = true

        indexes.push([randomIndexX + i, randomIndexY - i])
        gameTableMark[randomIndexX + i] = tempMark
        gameTable[randomIndexX + i] = tempLine
      }
    }
    inserted = true
    wordsMark.push({ word, indexes })
  }
}

const generateGame = () => {
  generateBlankTable()
  for (let word of words) {
    insertWord(word)
  }
}

const isSelected = (x: number, y: number) => {
  return gameTableSelected[x][y]
}

const isSelectedWord = (word: string) => {
  return wordsMark.find((w) => w.word == word)?.indexes.every(([x, y]) => gameTableSelected[x][y])
}

const selectCard = (x: number, y: number) => {
  if (gameData.activeSelection && gameTableMark[x][y]) {
    let tempSelect = Array.from(gameTableSelected[x])
    tempSelect[y] = gameTableMark[x][y]
    gameTableSelected[x] = tempSelect
  }
}

onMounted(() => {
  generateGame()
})
</script>

<template>
  <section>
    <div class="wordsList">
      <h4>Palavras em jogo:</h4>
      <ul>
        <li v-for="(word, i) in words" :key="i" :class="isSelectedWord(word) ? 'selectedWord' : ''">
          {{ word }}
        </li>
      </ul>
    </div>
    <div class="container">
      <div v-for="(n, indexx) in maxGrid" :key="n">
        <p
          v-for="(m, indexy) in gameTable[n]"
          :key="indexx * maxGrid + indexy"
          @click="selectCard(indexx + 1, indexy)"
          :class="isSelected(indexx + 1, indexy) ? 'card card-selected' : 'card'"
        >
          {{ m }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  display: flex;
  padding: 5%;
  width: 100%;
  background-color: #49454f;
}

.wordsList {
  background-color: #1D192B;
  padding: 15px;
  margin-left: 10px;
  color: #FFFFFF;

  ul {
    padding-left: 1.2em;

    li {
      text-transform: uppercase;
      font-weight: bold;
    }

    .selectedWord {
      text-decoration: line-through;
      font-weight: lighter;
    }
  }
}

.container {
  width: 800px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  .card {
    background-color: #21005d;
    -webkit-user-select: none;
    user-select: none;
    padding: 5px;
    border: 1px solid #cac4d0;
    aspect-ratio: 1;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    color: #ffffff;
  }

  .card:hover {
    opacity: v-bind('gameData.activeSelection? 0.5: 1');
  }

  .card-selected {
    background-color: #FDD835;
  }
}

@media screen and (max-width: 1400px) {
  .container {
    width: 700px;
  }
}
</style>
