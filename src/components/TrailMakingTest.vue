<template>
  <div class="trail-making-test">
    <svg ref="svg" @mousedown="startDrawing" @mouseup="stopDrawing" @mousemove="draw">
      <circle
        v-for="(dot, index) in dots"
        :key="index"
        :cx="dot.x"
        :cy="dot.y"
        :r="dotRadius"
        :fill="dot.color"
        style="cursor: pointer"
      />
      <text
        v-for="(dot, index) in dots"
        :key="index"
        :x="dot.x"
        :y="dot.y"
        text-anchor="middle"
        dy=".5em"
        font-size="20"
        font-weight="bold"
        fill="#000"
        style="cursor: pointer"
      >
        {{ dot.label }}
      </text>
      <polyline
        :points="linePoints"
        stroke="#fff"
        fill="none"
        stroke-width="4"
        style="z-index: -1"
      />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dots: [],
      dotRadius: 20,
      drawing: false,
      linePoints: '',
      currentDotIndex: 0,
      lines: []
    }
  },
  created() {
    this.generateSolvableDots()
  },
  methods: {
    generateSolvableDots() {
      do {
        this.dots = []
        this.lines = []
        this.generateRandomDots()
      } while (!this.isSolvable())
    },
    generateRandomDots() {
      const numDots = Math.floor(Math.random() * 10) + 10 // Random number of dots between 10 and 20
      const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']
      const svgWidth = 800 // Assuming a fixed width for simplicity
      const svgHeight = 600 // Assuming a fixed height for simplicity
      const margin = 15

      for (let i = 0; i < numDots; i++) {
        let dot
        do {
          dot = {
            x: Math.random() * (svgWidth - 2 * margin) + margin,
            y: Math.random() * (svgHeight - 2 * margin) + margin,
            color: colors[Math.floor(Math.random() * colors.length)],
            label: this.getLabel(i)
          }
        } while (this.isOverlapping(dot))

        this.dots.push(dot)
      }
    },
    getLabel(index) {
      const isEven = index % 2 === 0
      return isEven ? Math.floor(index / 2) + 1 : String.fromCharCode(97 + Math.floor(index / 2))
    },
    isOverlapping(newDot) {
      return this.dots.some((dot) => {
        const distance = Math.sqrt((dot.x - newDot.x) ** 2 + (dot.y - newDot.y) ** 2)
        return distance < this.dotRadius * 2
      })
    },
    isSolvable() {
      for (let i = 1; i < this.dots.length; i++) {
        const newLine = {
          x1: this.dots[i - 1].x,
          y1: this.dots[i - 1].y,
          x2: this.dots[i].x,
          y2: this.dots[i].y
        }
        if (this.isIntersecting(newLine)) {
          return false
        }
        this.lines.push(newLine)
      }
      this.lines = [] // Clear lines after checking
      return true
    },
    startDrawing(event) {
      this.drawing = true
      this.addPoint(event)
    },
    stopDrawing() {
      this.drawing = false
    },
    draw(event) {
      if (this.drawing) {
        this.addPoint(event)
      }
    },
    addPoint(event) {
      const svg = this.$refs.svg
      const point = svg.createSVGPoint()
      point.x = event.clientX
      point.y = event.clientY
      const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse())

      const nextDot = this.dots[this.currentDotIndex]
      const distance = Math.sqrt((svgPoint.x - nextDot.x) ** 2 + (svgPoint.y - nextDot.y) ** 2)

      if (distance < this.dotRadius) {
        const newLine = {
          x1: this.dots[this.currentDotIndex - 1]?.x,
          y1: this.dots[this.currentDotIndex - 1]?.y,
          x2: nextDot.x,
          y2: nextDot.y
        }
        if (this.currentDotIndex === 0 || !this.isIntersecting(newLine)) {
          this.linePoints += `${nextDot.x},${nextDot.y} `
          if (this.currentDotIndex > 0) {
            this.lines.push(newLine)
          }
          this.currentDotIndex++
          if (this.currentDotIndex >= this.dots.length) {
            setTimeout(this.restartGame, 2000)
          }
        }
      }
    },
    isIntersecting(newLine) {
      for (const line of this.lines) {
        if (this.doLinesIntersect(line, newLine)) {
          return true
        }
      }
      return false
    },
    doLinesIntersect(line1, line2) {
      const { x1, y1, x2, y2 } = line1
      const { x1: x3, y1: y3, x2: x4, y2: y4 } = line2

      const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
      if (denominator === 0) return false

      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator
      const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator

      return t > 0 && t < 1 && u > 0 && u < 1
    },
    restartGame() {
      this.dots = []
      this.linePoints = ''
      this.currentDotIndex = 0
      this.lines = []
      this.generateSolvableDots()
    }
  }
}
</script>

<style scoped>
.trail-making-test {
  width: calc(100vw - 4rem);
  height: calc(100vh - 4rem);
}
svg {
  width: 100%;
  height: 100%;
  border: 4px solid #fff;
}
</style>
