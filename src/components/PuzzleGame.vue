<template>
  <div class="puzzle-game" :style="{ width: `${100 * columns * rows}px` }">
    <div class="pieces-container">
      <div
        v-for="(piece, index) in pieces"
        :key="index"
        :draggable="true"
        @dragstart="onDragStart(piece)"
        class="puzzle-piece"
        :style="{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: `${piece.bgX}px ${piece.bgY}px`,
          backgroundSize: `${100 * columns}% ${100 * rows}%`,
          left: piece.x + 'px',
          top: piece.y + 'px'
        }"
      ></div>
    </div>
    <div class="slots-container">
      <div
        v-for="(slot, index) in slots"
        :key="index"
        class="puzzle-slot"
        @drop="onDrop(slot)"
        @dragover.prevent
        :style="{ left: slot.x + 'px', top: slot.y + 'px' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rows: {
      type: Number,
      required: true
    },
    columns: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      imageUrls: [
        'https://i0.wp.com/salvadoradesivo.com/wp-content/uploads/2021/03/Poster-homem-aranha4_.jpg',
        'https://a-static.mlcdn.com.br/800x560/poster-cartaz-jogo-super-mario-kart-pop-arte-poster/poparteskins2/15938549118/7260b2038c84512f0e3e8c55d25add9d.jpeg'
      ],
      pieces: [],
      slots: [],
      draggedPiece: null
    }
  },
  created() {
    this.selectRandomImage()
    this.initializePuzzle()
  },
  methods: {
    selectRandomImage() {
      const randomIndex = Math.floor(Math.random() * this.imageUrls.length)
      this.imageUrl = this.imageUrls[randomIndex]
    },
    initializePuzzle() {
      const pieceWidth = 100
      const pieceHeight = 100
      const pieces = []
      this.slots = [] // Reset slots
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.columns; col++) {
          const id = row * this.columns + col + 1
          pieces.push({
            id,
            x: col * pieceWidth,
            y: row * pieceHeight,
            bgX: -col * pieceWidth,
            bgY: -row * pieceHeight
          })
          this.slots.push({
            id,
            x: col * pieceWidth + 200,
            y: row * pieceHeight + 200
          })
        }
      }
      // Shuffle pieces
      this.pieces = pieces.sort(() => Math.random() - 0.5)
      // Place pieces in a line
      this.pieces.forEach((piece, index) => {
        piece.x = index * pieceWidth
        piece.y = 0
      })
    },
    onDragStart(piece) {
      this.draggedPiece = piece
    },
    onDrop(slot) {
      if (this.draggedPiece && this.draggedPiece.id === slot.id) {
        const pieceIndex = this.pieces.findIndex((p) => p.id === this.draggedPiece.id)
        if (pieceIndex !== -1) {
          this.pieces[pieceIndex].x = slot.x
          this.pieces[pieceIndex].y = slot.y
        }
        this.draggedPiece = null
        this.checkCompletion()
      }
    },
    checkCompletion() {
      const isComplete = this.pieces.every((piece) => {
        const slot = this.slots.find((slot) => slot.id === piece.id)
        return slot && piece.x === slot.x && piece.y === slot.y
      })
      if (isComplete) {
        setTimeout(() => {
          this.selectRandomImage()
          this.initializePuzzle()
        }, 2000)
      }
    }
  }
}
</script>

<style scoped>
.puzzle-game {
  position: relative;
  width: calc(100px * columns);
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
}

.pieces-container {
  height: 100px;
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}

.slots-container {
  position: relative;
  height: 500px;
  width: 100%;
}

.puzzle-piece {
  position: absolute;
  width: 100px;
  height: 100px;
  background-size: 100% 100%;
  cursor: grab;
}

.puzzle-slot {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px dashed #000;
  z-index: 10;
  margin-top: -100px;
}
</style>
