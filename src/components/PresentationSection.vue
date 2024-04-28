<script setup lang="ts">
const props = defineProps<{
  game: number
  startGame: Function
}>()

const getHeader = () => {
  switch (props.game) {
    case 0:
      return 'Bem-vindo!'
    case 1:
      return 'Memorização'
    case 2:
      return 'Sequências'
    case 3:
      return 'Caça-Palavras'
    case 4:
      return 'Fim!'
    default:
      return ''
  }
}

const getContent = () => {
  switch (props.game) {
    case 0:
      return 'Olá, esta é uma sequência de jogos para testar a sua memória e atenção, vamos começar!?'
    case 1:
      return 'Este é o Memorização, um jogo que irá testar a sua memória. A cada rodada, uma quantidade de peças serão viradas, e ao desvirar, você deverá ser capaz de selecionar as mesmas peças para pontuar, mas cuidado, a cada fase, o jogo ficará mais difícil!'
    case 2:
      return 'Este é o Sequências, um jogo que irá testar a sua memória. A cada rodada, uma sequência de peças serão viradas, e ao finalizar a exibição da sequência, você deverá ser capaz de selecionar as mesmas peças na mesma ordem exibida para pontuar, mas cuidado, a cada fase, o jogo ficará mais difícil!'
    case 3:
      return 'Este é o Caça-Palavras, um jogo que irá testar a sua habilidade com o tabuleiro de palavras. Uma quantidade de palavras serão dispostas no tabuleiro, e você deverá ser capaz de encontrar todas as palavras para pontuar!'
    case 4:
      return 'Suas atividades foram finalizadas, obrigado por participar! Clique abaixo para reiniciar o jogo.'
    default:
      return ''
  }
}

const getButtonLabel = () => {
  return props.game === 4 ? 'Reiniciar' : 'Começar'
}
</script>

<template>
  <section>
    <div class="container">
      <h1>{{ getHeader() }}</h1>
      <p>{{ getContent() }}</p>
      <button @click="props.startGame">{{ getButtonLabel() }}</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  display: flex;
  padding: 5%;
  width: 100%;
  background-color: red;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container {
  width: 800px;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px 20px;

  button {
    padding: 10px 20px;
    margin-top: 40px;
    background-color: #f0f0f0;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
  }

  p {
    margin: 10px;
  }
}

@media screen and (max-width: 1400px) {
  .container {
    width: 700px;
  }
}
</style>
