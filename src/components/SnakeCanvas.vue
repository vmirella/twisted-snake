<template>
  <canvas ref="board" class="snake-canvas" :width="boardSizePx" :height="boardSizePx">

  </canvas>
</template>

<script>
export default {
  name: 'SnakeCanvas',
  props: {
    cellSize: Number,
    countCells: Number,
    speed: Number,
    isPlaying: Boolean,
    score: Number
  },
  created () {
    this.resetSnake()
  },
  watch: {
    isPlaying(value) {
      console.log(value)
      if (value) {
        this.resetSnake()
        this.move()
      }
    }
  },
  mounted () {
    this.boardContext = this.$refs.board.getContext('2d')
  },
  computed: {
    boardSizePx () {
      return this.cellSize * this.countCells;
    }
  },
  methods: {
    resetSnake () {
      // this.snake = [{x: this.getMiddleCell(), y: this.getMiddleCell()}]

    },
    getMiddleCell () {
      return Math.round(this.countCells / 2)
    },
    move () {
      
    },
    drawCell ({x, y}) {
      this.boardContext.rect(
        x * this.cellSize,
        y * this.cellSize,
        this.cellSize,
        this.cellSize
      )
      this.boardContext.fillStyle = '#000'
      this.boardContext.fill()
    }


  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .snake-canvas {
    border: 1px solid #000;
  }
</style>
