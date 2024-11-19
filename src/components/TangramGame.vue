<template>
  <div class="tangram-game">
    <div class="game-area" ref="gameArea">
      <div
        v-for="(piece, index) in pieces"
        :key="index"
        :class="['piece', piece.shape]"
        :style="{
          top: piece.top + 'px',
          left: piece.left + 'px',
          transform: 'rotate(' + piece.rotation + 'deg)'
        }"
        @mousedown="startDrag($event, index)"
      ></div>
    </div>
    <button @click="resetGame">Restart Game</button>
  </div>
</template>

<script>
export default {
  props: {
    maxPieces: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      pieces: [],
      draggingPiece: null,
      offsetX: 0,
      offsetY: 0,
      maxPieces: 16 // Maximum number of pieces
    }
  },
  mounted() {
    this.resetGame()
  },
  methods: {
    generatePieces() {
      const shapes = [
        'triangle',
        'triangle-rotated',
        'square',
        'parallelogram',
        'parallelogram-rotated'
      ]
      const pieces = []
      for (let i = 0; i < this.maxPieces; i++) {
        const shape = shapes[i % shapes.length]
        const top = -100 // Position pieces above the game area
        const left = Math.floor(Math.random() * 300) // Randomize horizontal position
        const rotation = Math.floor(Math.random() * 4) * 90 // Ensure rotation is a multiple of 90
        pieces.push({ shape, top, left, rotation })
      }
      return pieces
    },
    startDrag(event, index) {
      this.draggingPiece = index
      this.offsetX = event.clientX - this.pieces[index].left
      this.offsetY = event.clientY - this.pieces[index].top
      document.addEventListener('mousemove', this.onDrag)
      document.addEventListener('mouseup', this.stopDrag)
    },
    onDrag(event) {
      if (this.draggingPiece !== null) {
        this.pieces[this.draggingPiece].top = event.clientY - this.offsetY
        this.pieces[this.draggingPiece].left = event.clientX - this.offsetX
      }
    },
    stopDrag() {
      document.removeEventListener('mousemove', this.onDrag)
      document.removeEventListener('mouseup', this.stopDrag)
      this.draggingPiece = null
      this.checkCompletion()
    },
    checkCompletion() {
      const gameArea = this.$refs.gameArea
      const gameAreaRect = gameArea.getBoundingClientRect()
      const allPiecesInside = this.pieces.every((piece) => {
        const pieceRect = {
          top: piece.top,
          left: piece.left,
          bottom: piece.top + 100,
          right: piece.left + 100
        }
        return (
          pieceRect.top >= 0 &&
          pieceRect.left >= 0 &&
          pieceRect.bottom <= gameAreaRect.height &&
          pieceRect.right <= gameAreaRect.width
        )
      })

      const noCollision = this.pieces.every((piece, index) => {
        const pieceRect = this.getPieceRect(piece)
        return this.pieces.every((otherPiece, otherIndex) => {
          if (index === otherIndex) return true
          const otherRect = this.getPieceRect(otherPiece)
          return (
            pieceRect.right <= otherRect.left ||
            pieceRect.left >= otherRect.right ||
            pieceRect.bottom <= otherRect.top ||
            pieceRect.top >= otherRect.bottom
          )
        })
      })

      if (allPiecesInside && noCollision) {
        this.resetGame()
      }
    },
    getPieceRect(piece) {
      switch (piece.shape) {
        case 'triangle':
        case 'triangle-rotated':
          return {
            top: piece.top,
            left: piece.left + 50,
            bottom: piece.top + 100,
            right: piece.left + 50
          }
        case 'square':
          return {
            top: piece.top,
            left: piece.left,
            bottom: piece.top + 100,
            right: piece.left + 100
          }
        case 'parallelogram':
        case 'parallelogram-rotated':
          return {
            top: piece.top,
            left: piece.left + 25,
            bottom: piece.top + 100,
            right: piece.left + 75
          }
        default:
          return {
            top: piece.top,
            left: piece.left,
            bottom: piece.top + 100,
            right: piece.left + 100
          }
      }
    },
    resetGame() {
      this.pieces = this.generatePieces()
    }
  }
}
</script>

<style scoped>
.tangram-game {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-area {
  width: 400px;
  height: 400px;
  border: 2px solid #fff;
  position: relative;
}

.piece {
  width: 100px;
  height: 100px;
  position: absolute;
  cursor: pointer;
}

.triangle {
  background-color: red;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.triangle-rotated {
  background-color: red;
  clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
}

.square {
  background-color: blue;
}

.parallelogram {
  background-color: green;
  clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%);
}

.parallelogram-rotated {
  background-color: green;
  clip-path: polygon(0% 0%, 25% 100%, 75% 100%, 100% 0%);
}
</style>
