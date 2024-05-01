<script setup lang="ts">
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

const {
  setGameTime,
  setMemorizationMaxGrid,
  setSequencesDifficulty,
  setHuntingMaxGrid,
  setHuntingWordsMax,
  setHuntingWordsList
} = store

const saveConfig = () => {
  setGameTime(GameTime.value)
  setMemorizationMaxGrid(MemorizationMaxGrid.value)
  setSequencesDifficulty(SequencesDifficulty.value)
  setHuntingMaxGrid(HuntingMaxGrid.value)
  setHuntingWordsMax(HuntingWordsMax.value)
  try {
    const arr: string = HuntingWordsList.value
    const list = arr.includes(',') ? arr.split(',') : arr.split('\n')
    setHuntingWordsList(list)
  } catch {
    console.log('error on convert', HuntingWordsList.value)
  }
  alert('Configurações salvas com sucesso!')
}
</script>

<template>
  <main>
    <section class="config-view">
      <h1>Configuração:</h1>
      <form @submit.prevent="saveConfig">
        <label for="timer">Tempo de cada jogo em segundos:</label>
        <input type="number" id="timer" v-model="GameTime" />

        <label for="memorizationMaxGrid">Tamanho máximo do grid do jogo de memorização:</label>
        <input type="number" id="memorizationMaxGrid" v-model="MemorizationMaxGrid" />

        <label for="sequencesDifficulty">Dificuldade do jogo se sequências:</label>
        <input type="number" id="sequencesDifficulty" v-model="SequencesDifficulty" />

        <label for="huntingMaxGrid">Tamanho do grid do caça-palavras:</label>
        <input type="number" id="huntingMaxGrid" v-model="HuntingMaxGrid" />

        <label for="huntingWordsMax">Quantidade máxima de palavras no caça-palavras:</label>
        <input type="number" id="huntingWordsMax" v-model="HuntingWordsMax" />

        <label for="huntingWordsList">Lista de palavras para Caça-Palavras:</label>
        <textarea id="huntingWordsList" v-model="HuntingWordsList"></textarea>

        <button type="submit">Salvar</button>
      </form>
    </section>
  </main>
</template>

<style scoped lang="scss">
.config-view {
  padding: 10px;
  background-color: #21005d;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  color: #ffffff;
  padding: 50px;

  h1 {
    margin-bottom: 20px;
  }

  form {
    font-size: 1.2em;
    font-weight: 100;
    display: grid;
    grid-template-columns: repeat(auto-fit);
    grid-gap: 10px;

    input,
    textarea {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #cac4d0;
      resize: none;
    }

    label {
      margin: 10px 0 0 0;
    }

    button {
      padding: 10px 20px;
      background-color: #f0f0f0;
      border-radius: 5px;
      outline: none;
      border: 2px solid #49454f;
      margin: 15px;
      font-weight: bold;
    }
  }
}
</style>
