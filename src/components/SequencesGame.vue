<script setup lang="ts">
import { reactive, ref } from 'vue'

const props = defineProps<{
  difficulty: number
}>()

const gridSize = (3 + props.difficulty) * (3 + props.difficulty)
let cardList: number[] = reactive([])
let targetList: number[] = reactive([])

const gameData = reactive({ target: 1, activeSelection: true, currentActive: -1, wrong: -1 })

const cardSize = () => {
  return 1 / (3 + props.difficulty)
}

const generateGame = async () => {
  gameData.activeSelection = false
  gameData.wrong = -1
  cardList = []
  while (targetList.length < gameData.target) {
    const randomNumber = Math.floor(Math.random() * gridSize)
    if (targetList.length == 0) {
      targetList = [randomNumber]
    } else if (targetList[targetList.length - 1] != randomNumber) {
      targetList.push(randomNumber)
    }
  }
  targetList.forEach((number, index) => {
    setTimeout(
      () => {
        gameData.currentActive = number
      },
      1000 * (1 + index)
    )
  })
  setTimeout(
    () => {
      gameData.currentActive = -1
      gameData.activeSelection = true
    },
    1000 * (targetList.length + 1)
  )
}
generateGame()

const addLevel = () => {
  gameData.target++
}

const checkAnsw = () => {
  let correct = true
  for (let i = 0; i < cardList.length; i++) {
    correct = correct && cardList[i] == targetList[i]
  }

  if (!correct) {
    gameData.wrong = cardList[cardList.length - 1]
    setTimeout(() => {
      generateGame()
    }, 1000)
  }

  if (correct && cardList.length == targetList.length) {
    if (correct) {
      addLevel()
      generateGame()
    }
  }
}

const selectedClass = (n: number) => {
  if (gameData.wrong == n) {
    return 'card card-wrong'
  } else if (gameData.currentActive == n) {
    return 'card card-selected'
  }

  return 'card'
}

const selectCard = (n: number) => {
  if (gameData.activeSelection && gameData.currentActive != n) {
    cardList.push(n)
    gameData.activeSelection = false
    gameData.currentActive = n
    checkAnsw()
    setTimeout(() => {
      checkAnsw()
      gameData.activeSelection = true
      if (gameData.currentActive == n) {
        gameData.currentActive = -1
      }
    }, 500)
  }
}
</script>

<template>
  <section>
    <div class="container">
      <div
        v-for="n in gridSize"
        :key="n"
        @click="selectCard(n - 1)"
        :class="selectedClass(n - 1)"
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
  }

  .card:hover {
    &:not(.card-selected) {
      opacity: 0.8;
    }
  }

  .card-selected {
    animation-name: clickAnimation;
    animation-duration: 0.7s;
    animation-timing-function: ease-out;
  }

  .card-wrong {
    animation-name: wrongAnimation;
    animation-duration: 0.7s;
    animation-timing-function: ease-out;
  }

  @keyframes clickAnimation {
    50% {
      background-color: #fdd835;
    }
    100% {
      background-color: #21005d;
    }
  }

  @keyframes wrongAnimation {
    50% {
      background-color: red;
    }
    100% {
      background-color: #21005d;
    }
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
