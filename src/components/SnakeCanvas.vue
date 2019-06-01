<template>
  <canvas ref="board" class="snake-canvas" :width="boardSizePx" :height="boardSizePx"></canvas>
</template>

<script>

import foodImage from '../assets/food.png'
import headImage from '../assets/zoo.png'

export default {
  name: 'SnakeCanvas',
  props: {
    cellSize: Number,
    countCells: Number,
    speed: Number,
    isPlaying: Boolean,
    score: Number,
    stop: Function,
    addScore: Function,
    points: Number
  },
  data () {
    return {
      head: null,
      food: null,
      directions: [
        {
          direction: 'left',
          keyCode: 39,
          move: {
            x: -1,
            y: 0
          }
        },        
        {
          direction: 'top',
          keyCode: 40,
          move: {
            x: 0,
            y: -1
          }
        },
        {
          direction: 'right',
          keyCode: 37,
          move: {
            x: 1,
            y: 0
          }
        },
        {
          direction: 'bottom',
          keyCode: 38,
          move: {
            x: 0,
            y: 1
          }
        }
      ]
    }
  },
  created () {
    const food = new window.Image()
    food.src = foodImage
    food.onload = () => {
      this.food = food
    }

    const head = new window.Image()
    head.src = headImage
    head.onload = () => {
      this.head = head
    }

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
    window.addEventListener('keydown', this.onKeyPress) 
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.onKeyPress) 
  },
  computed: {
    boardSizePx () {
      return this.cellSize * this.countCells;
    }
  },
  methods: {
    resetSnake () {
      
      // const randomDirection = Math.floor(Math.random() * 4)
      // this.direction = this.directions[randomDirection]
      //Comienza en dirección fija para poder controlar la dirección del cuerpo
      this.direction = this.directions[0] 

      const posX = this.getInitCell()
      const posY = this.getInitCell()
      this.snake = [
        {
          x: posX, 
          y: posY
        },
        {
          x: posX + 1, 
          y: posY
        },
        {
          x: posX + 2, 
          y: posY
        } 
      ]
    },
    getInitCell () {
      return Math.floor(Math.random() * ((this.countCells - 3) - 3)) + 3
    },
    move () {
      if (!this.isPlaying) {
        return
      }

      this.clear()

      this.setTargetCell()

      const newHeadCell = {
        x: this.snake[0].x + this.direction.move.x,
        y: this.snake[0].y + this.direction.move.y
      }

      if (this.isCellOutOfBoard(newHeadCell) || this.amountCellsInSnake(this.snake[0]) > 1) {
        this.stop()
        this.drawMessage()
        return 
      }

      if (this.isTargetNewHead()) {
        this.snake.unshift(this.targetCell)
        this.targetCell = null
        this.addScore(this.points)
      } else {
        this.snake.unshift(newHeadCell)
        this.snake.pop()
      }      

      this.boardContext.beginPath()
      //this.snake.forEach(this.drawCell)
      this.snake.forEach((item, index) => {
        if (index === 0) {
          this.drawHead(item)
        } else {
          this.drawCell(item)
        }
      });
      this.boardContext.closePath()

      setTimeout(this.move, this.getMoveDelay())
    },
    clear () {
      this.boardContext.clearRect(0, 0, this.boardSizePx, this.boardSizePx)
    },
    drawCell ({x, y}) {  

      let centerX = (x * this.cellSize) + Math.round(this.cellSize / 2)
      let centerY = (y * this.cellSize) + Math.round(this.cellSize / 2)
      let radius = Math.round(this.cellSize / 2)

      //Colocar nuevamente beginPath para evitar el bug de los círculos mal dibujados
      this.boardContext.beginPath()
      
      this.boardContext.arc(
        centerX,
        centerY,
        radius,
        0,
        (Math.PI / 180) * 360,
        true
      )
      this.boardContext.fillStyle = '#9F7267'
      this.boardContext.fill()
    },
    drawHead ({x, y}) {

      this.boardContext.drawImage(
        this.head, 
        x * this.cellSize,
        y * this.cellSize,
        this.cellSize,
        this.cellSize
      )   
    },
    getMoveDelay () {
      return (2 / this.speed) * 1000
    },
    isCellOutOfBoard ({x, y}) {
      //Si la serpiente se sale del tablero retorna true
      return x < 0 || y < 0 || x >= this.countCells || y >= this.countCells
    },
    onKeyPress (event) {      
      const newDirection = this.directions.find(item => item.keyCode === event.keyCode)

      if (!newDirection) {
        return 
      }

      //Validando que la serpiente no pueda girar hacia el lado opuesto
      if (Math.abs(newDirection.keyCode - this.direction.keyCode) !== 2) {
        this.direction = newDirection
      }
    },
    setTargetCell () {
      if (!this.targetCell) {
        let targetCell = this.getRandomCell()
        //Si en la posición de la fruta hay serpiente, asigna nueva posición
        while (this.amountCellsInSnake(targetCell) > 0) {
          targetCell = this.getRandomCell()
        }
        this.targetCell = targetCell
      }

      //Dibujar la fruta en la posición obtenda al azar
      this.boardContext.beginPath()
      this.boardContext.drawImage(
        this.food, 
        this.targetCell.x * this.cellSize,
        this.targetCell.y * this.cellSize,
        this.cellSize,
        this.cellSize
      )     
      
      this.boardContext.closePath()
    },
    getRandomCell () {
      return {
        x: Math.floor(Math.random() * this.countCells),
        y: Math.floor(Math.random() * this.countCells)
      }
    },
    //Verifica si en la celda que recibe hay o no serpiente (0:No hay, > 0: Si hay)
    amountCellsInSnake (cell) {
      let snakeCell = this.snake.filter(({x, y}) => x === cell.x && y === cell.y)
      return snakeCell.length
    },
    isTargetNewHead () {
      return (
        this.snake[0].x + this.direction.move.x === this.targetCell.x &&
        this.snake[0].y + this.direction.move.y === this.targetCell.y
      )
    },
    drawMessage (message) {
      const centerBoard = Math.floor(this.boardSizePx / 2)

      this.boardContext.beginPath()
      this.boardContext.fillStyle = '#AFB9F0'
      this.boardContext.rect(
        60,
        180,
        360,
        90
      )
      this.boardContext.fill()

      this.boardContext.beginPath()
      this.boardContext.font = '30px Helvetica'
      this.boardContext.textAlign = 'center'
      this.boardContext.fillStyle = '#fafafa'
      this.boardContext.fillText('Game over!', centerBoard, (centerBoard - 15))
      this.boardContext.fillText(`You have scored ${this.score} points`, centerBoard, (centerBoard + 15))
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .snake-canvas {
    border: 5px solid #5B6DCD;
    border-radius: 5px;
    background-image: url('../assets/tablero.jpg')
  }
</style>
