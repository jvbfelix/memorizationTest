<script setup lang="ts">
import { reactive, computed, ref } from 'vue'

let cardList: boolean[] = reactive([])
let targetList: boolean[] = reactive([])
const props = defineProps<{
  maxGrid: number
}>()

const gameData = reactive({ step: 0, target: 3, activeSelection: true })

for (let i = 0; i < 9; i++) {
  cardList[i] = false
  targetList[i] = false
}

const cleanSelected = (timeout: number = 500, clean: boolean = false) => {
  setTimeout(() => {
    for (let i = 0; i < cardList.length; i++) {
      cardList[i] = false
    }
    gameData.activeSelection = clean
  }, timeout)
}

const cards = computed(() => {
  return cardList.length
})

const isSelected = (n: number) => {
  return cardList[n]
}

const cardSize = () => {
  return 1 / Math.min(3 + getLevel(), props.maxGrid)
}

const getLevel = () => {
  return Math.floor(gameData.step / 3)
}

const getSelectCount = () => {
  return cardList.filter((card) => card).length
}

const generateGame = () => {
  gameData.activeSelection = false
  const randomNumbers: number[] = []
  while (randomNumbers.length < gameData.target) {
    const randomNumber = Math.floor(Math.random() * cardList.length)
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber)
    }
  }
  for (let i = 0; i < targetList.length; i++) {
    if (randomNumbers.includes(i)) {
      targetList[i] = true
    } else {
      targetList[i] = false
    }
  }
  randomNumbers.forEach((number) => {
    targetList[number] = true
  })
  setTimeout(() => {
    randomNumbers.forEach((number) => {
      cardList[number] = true
    })
    cleanSelected(1500, true)
  }, 1000)
}
generateGame()

const addLevel = () => {
  if (gameData.target < cardList.length / 2) {
    gameData.target++
  }
  setTimeout(() => {
    gameData.step++
    const cards = Math.min(3 + getLevel(), props.maxGrid)
    for (let i = 0; i < cards * cards; i++) {
      cardList[i] = false
    }
  }, 1000)
}

const checkAnsw = () => {
  let correct = true
  for (let i = 0; i < targetList.length; i++) {
    correct = correct && cardList[i] == targetList[i]
  }

  if (correct) {
    addLevel()
  }
  cleanSelected()
  generateGame()
}

const selectCard = (n: number) => {
  if (gameData.activeSelection) {
    cardList[n] = true
    if (getSelectCount() === gameData.target) {
      gameData.activeSelection = false
      checkAnsw()
    }
  }
}
</script>

<template>
  <section>
    <div class="container">
      <div
        v-for="n in cards"
        :key="n"
        @click="selectCard(n - 1)"
        :class="isSelected(n - 1) ? 'card card-selected' : 'card'"
      ></div>
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

.container {
  width: 800px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  .card {
    aspect-ratio: 1;
    width: calc(600px * v-bind(cardSize()) - 10px - 1px);
    margin: 1%;
    background-color: #21005d;
    border-radius: 5px;
    border: 3px solid #cac4d0;
    -webkit-user-select: none;
    user-select: none;
    transform: rotate3d(0);
    transition: transform 0.5s;
  }

  .card:hover {
    opacity: v-bind('gameData.activeSelection? 0.5: 1');
  }

  .card-selected {
    background-color: #fdd835;
    transform: rotate3d(1, 0, 0, 180deg);
    transition: transform 0.5s;
  }
}

@media screen and (max-width: 1400px) {
  .container {
    width: 700px;
    .card {
      width: calc(600px * v-bind(cardSize()) - 10px - 1px);
    }
  }
}
</style>
