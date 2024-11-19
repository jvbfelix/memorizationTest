<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { storeToRefs } from 'pinia'

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

const {
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

} = store

const saveConfig = () => {
  setHuntingWordsTime(HuntingWordsTime.value)
  setSequencesGameTime(SequencesGameTime.value)
  setMemorizationGameTime(MemorizationGameTime.value)
  setMemorizationMaxGrid(MemorizationMaxGrid.value)
  setSequencesDifficulty(SequencesDifficulty.value)
  setHuntingMaxGrid(HuntingMaxGrid.value)
  setHuntingWordsMax(HuntingWordsMax.value)
  setPuzzleGameTime(PuzzleGameTime.value)
  setTangramGameTime(TangramGameTime.value)
  setTrailMakingTestTime(TrailMakingTestTime.value)
  setTangramMaxPieces(TangramMaxPieces.value)
  setTrailMakingMaxDots(TrailMakingMaxDots.value)
  setPuzzleColumns(PuzzleColumns.value)
  setPuzzleRows(PuzzleRows.value)
  setPuzzleImageUrls(PuzzleImageUrls.value)
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
    <div class="top-right">
      <RouterLink to="/">Voltar</RouterLink>
    </div>
    <section class="config-view">
      <h1>Configuração:</h1>
      <form @submit.prevent="saveConfig">
        <!-- <label for="timerHuntingWords">Tempo de Caça-Palavras:</label>
        <input type="number" id="timerHuntingWords" v-model="HuntingWordsTime" />

        <label for="timerMemorizationGame">Tempo de Jogo da Memória:</label>
        <input type="number" id="timerMemorizationGame" v-model="MemorizationGameTime" />

        <label for="timerSequencesGame">Tempo de jogo de sequências:</label>
        <input type="number" id="timerSequencesGame" v-model="SequencesGameTime" />

        <label for="memorizationMaxGrid">Tamanho máximo do grid do jogo de memorização:</label>
        <input type="number" id="memorizationMaxGrid" v-model="MemorizationMaxGrid" />

        <label for="sequencesDifficulty">Dificuldade do jogo se sequências:</label>
        <input type="number" id="sequencesDifficulty" v-model="SequencesDifficulty" />

        <label for="huntingMaxGrid">Tamanho do grid do caça-palavras:</label>
        <input type="number" id="huntingMaxGrid" v-model="HuntingMaxGrid" />

        <label for="huntingWordsMax">Quantidade máxima de palavras no caça-palavras:</label>
        <input type="number" id="huntingWordsMax" v-model="HuntingWordsMax" />

        <label for="huntingWordsList">Lista de palavras para Caça-Palavras:</label>
        <textarea id="huntingWordsList" v-model="HuntingWordsList"></textarea> -->

        <label for="timerPuzzleGame">Tempo de Jogo de Quebra-Cabeça:</label>
        <input type="number" id="timerPuzzleGame" v-model="PuzzleGameTime" />

        <label for="timerTangramGame">Tempo de Jogo de Tangram:</label>
        <input type="number" id="timerTangramGame" v-model="TangramGameTime" />

        <label for="timerTrailMakingTest">Tempo de Teste de Trilhas:</label>
        <input type="number" id="timerTrailMakingTest" v-model="TrailMakingTestTime" />

        <label for="maxPiecesTangram">Número máximo de peças do Tangram:</label>
        <input type="number" id="maxPiecesTangram" v-model="TangramMaxPieces" />

        <label for="maxDotsTrailMakingTest">Número máximo de pontos do Teste de Trilhas:</label>
        <input type="number" id="maxDotsTrailMakingTest" v-model="TrailMakingMaxDots" />

        <label for="puzzleColumns">Número de colunas do Quebra-Cabeça:</label>
        <input type="number" id="puzzleColumns" v-model="PuzzleColumns" />

        <label for="puzzleRows">Número de linhas do Quebra-Cabeça:</label>
        <input type="number" id="puzzleRows" v-model="PuzzleRows" />

        <label for="puzzleImageUrls">URLs das imagens do Quebra-Cabeça (separadas por vírgula):</label>
        <textarea id="puzzleImageUrls" v-model="PuzzleImageUrls"></textarea>
        <div class="image-preview">
          <h2>Pré-visualização das Imagens do Quebra-Cabeça:</h2>
          <ul>
            <li v-for="url in (PuzzleImageUrls ? PuzzleImageUrls.split(',') : [])" :key="url">
              <img :src="url.trim()" alt="Puzzle Image" class="puzzle-image" />
            </li>
          </ul>
        </div>

        <button type="submit">Salvar</button>
      </form>
    </section>
  </main>
</template>

<style scoped lang="scss">
.top-right {
  position: absolute;
  top: 0;
  left: 0;
}

.config-view {
  padding: 10px;
  background-color: #21005d;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  color: #ffffff;
  padding: 50px;
  width: 70vw;

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

    textarea {
      height: 200px;
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

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      list-style: none;
      padding: 0;
    }
  }

  .puzzle-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin: 10px;
  }
}
</style>
