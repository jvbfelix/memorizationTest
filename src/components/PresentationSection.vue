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
      return 'Quebra-Cabeça'
    case 2:
      return 'Tangram'
    // case 3:
    //   return 'Sequências'
    // case 4:
    //   return 'Fim!'
    default:
      return 'Fim!'
  }
}

const getContent = () => {
  switch (props.game) {
    case 0:
      return 'Olá, esta é uma sequência de jogos para testar a sua memória e atenção, vamos começar!?'
    case 1:
      return 'Este é o Quebra-Cabeça, um jogo que irá testar a sua memória. A cada rodada, um novo quebra-cabeça será exibido, e você deverá ser capaz de montá-lo corretamente para pontuar!'
    case 2:
      return 'Este é o tangram, um jogo que irá testar a sua habilidade de montagem. A cada rodada, uma séria de peças serão exibidas, e você deverá ser capaz de encaixa-las corretamente para pontuar!'
    // case 3:
    //   return 'Este é o Sequências, um jogo que irá testar a sua memória. A cada rodada, uma sequência de peças serão viradas, e ao finalizar a exibição da sequência, você deverá ser capaz de selecionar as mesmas peças na mesma ordem exibida para pontuar, mas cuidado, a cada fase, o jogo ficará mais difícil!'
    // case 4:
    //   return 'Suas atividades foram finalizadas, obrigado por participar! Clique abaixo para reiniciar o jogo.'
    default:
      return 'Suas atividades foram finalizadas, obrigado por participar! Clique abaixo para reiniciar o jogo.'
  }
}

const getButtonLabel = () => {
  return props.game === 3 ? 'Reiniciar' : 'Começar'
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
  background-color: #49454f;
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
  color: #ffffff;

  button {
    padding: 10px 20px;
    margin-top: 40px;
    background-color: #f0f0f0;
    border: 1px solid #cac4d0;
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
