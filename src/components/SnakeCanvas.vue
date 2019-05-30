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
  data () {
    return {
      directions: [
        {
          direction: 'left',
          keyCode: 37,
          move: {
            x: -1,
            y: 0
          }
        },        
        {
          direction: 'top',
          keyCode: 38,
          move: {
            x: 0,
            y: -1
          }
        },
        {
          direction: 'right',
          keyCode: 39,
          move: {
            x: 1,
            y: 0
          }
        },
        {
          direction: 'bottom',
          keyCode: 40,
          move: {
            x: 0,
            y: 1
          }
        }
      ]
    }
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
      this.snake = [
        {
          x: this.getMiddleCell(), 
          y: this.getMiddleCell()
        }        
      ]
      this.direction = this.directions[0]
    },
    getMiddleCell () {
      return Math.round(this.countCells / 2)
    },
    move () {
      if (!this.isPlaying) {
        return
      }

      this.clear()

      const newHeadCell = {
        x: this.snake[0].x + this.direction.move.x,
        y: this.snake[0].y + this.direction.move.y
      }

      this.snake.unshift(newHeadCell)
      this.snake.pop()

      this.boardContext.beginPath()
      this.snake.forEach(this.drawCell)
      this.boardContext.closePath()

      setTimeout(this.move, this.getMoveDelay())
    },
    clear () {
      this.boardContext.clearRect(0, 0, this.boardSizePx, this.boardSizePx)
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
    },
    getMoveDelay () {
      return (2 / this.speed) * 1000
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
