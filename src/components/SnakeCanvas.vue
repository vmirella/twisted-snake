<template>
  <canvas ref="board" class="snake-canvas" :width="`${boardSizePx}`" :height="`${boardSizePx}`">

  </canvas>
</template>

<script>
export default {
  name: 'SnakeCanvas',
  data () {
    return {
      cellSize: 30,
      countCells: 16,
      speed: 10,
      isPlaying: false,
      score: 0
    }
  },
  mounted () {
    
  },
  computed: {
    boardSizePx () {
      return this.cellSize * this.countCells;
    }
  },
  methods: {
    resetSnake () {
      this.snake = [{x: this.getMiddleCell(), y: this.getMiddleCell()}]

    },
    getMiddleCell () {
      return Math.round(this.countCells / 2)
    },
    move () {

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
