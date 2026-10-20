<template>
  <div class="snake-game">
    <canvas
      ref="board"
      class="snake-canvas"
      :width="boardSizePx"
      :height="boardSizePx"
      aria-label="Tablero de juego de Ardilla y Bellota"
    ></canvas>

    <div class="touch-controls" aria-label="Controles de movimiento">
      <p class="controls-label">Controles de movimiento</p>

      <div class="direction-pad">
        <button
          class="direction-button direction-up"
          type="button"
          aria-label="Mover hacia arriba"
          :disabled="!isPlaying"
          @pointerdown.prevent="changeDirection('up')"
        >
          <span aria-hidden="true">▲</span>
        </button>

        <button
          class="direction-button direction-left"
          type="button"
          aria-label="Mover hacia la izquierda"
          :disabled="!isPlaying"
          @pointerdown.prevent="changeDirection('left')"
        >
          <span aria-hidden="true">◀</span>
        </button>

        <button
          class="direction-button direction-down"
          type="button"
          aria-label="Mover hacia abajo"
          :disabled="!isPlaying"
          @pointerdown.prevent="changeDirection('down')"
        >
          <span aria-hidden="true">▼</span>
        </button>

        <button
          class="direction-button direction-right"
          type="button"
          aria-label="Mover hacia la derecha"
          :disabled="!isPlaying"
          @pointerdown.prevent="changeDirection('right')"
        >
          <span aria-hidden="true">▶</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import foodImage from "../assets/food.png";
import headImage from "../assets/zoo.png";

export default {
  name: "SnakeCanvas",

  props: {
    cellSize: Number,
    countCells: Number,
    speed: Number,
    isPlaying: Boolean,
    score: Number,
    stop: Function,
    addScore: Function,
    points: Number,
  },

  data() {
    return {
      head: null,
      food: null,

      directions: [
        {
          direction: "left",
          key: "ArrowLeft",
          move: { x: -1, y: 0 },
        },
        {
          direction: "up",
          key: "ArrowUp",
          move: { x: 0, y: -1 },
        },
        {
          direction: "right",
          key: "ArrowRight",
          move: { x: 1, y: 0 },
        },
        {
          direction: "down",
          key: "ArrowDown",
          move: { x: 0, y: 1 },
        },
      ],
    };
  },

  created() {
    const food = new window.Image();
    food.src = foodImage;
    food.onload = () => {
      this.food = food;
    };

    const head = new window.Image();
    head.src = headImage;
    head.onload = () => {
      this.head = head;
    };

    this.resetSnake();
  },

  watch: {
    isPlaying(value) {
      if (value) {
        this.clearMoveTimeout();
        this.resetSnake();
        this.drawInitialFrame();
        this.move();
      } else {
        this.clearMoveTimeout();
      }
    },
  },

  mounted() {
    this.boardContext = this.$refs.board.getContext("2d");
    window.addEventListener("keydown", this.onKeyPress);
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.onKeyPress);
    this.clearMoveTimeout();
  },

  computed: {
    boardSizePx() {
      return this.cellSize * this.countCells;
    },
  },

  methods: {
    resetSnake() {
      this.targetCell = null;
      this.direction = this.directions[2];

      const posX = Math.max(
        3,
        Math.min(this.countCells - 4, this.getInitCell()),
      );
      const posY = this.getInitCell();

      this.snake = [
        { x: posX, y: posY },
        { x: posX - 1, y: posY },
        { x: posX - 2, y: posY },
      ];
    },

    clearMoveTimeout() {
      if (this.moveTimeout) {
        clearTimeout(this.moveTimeout);
        this.moveTimeout = null;
      }
    },

    drawInitialFrame() {
      if (!this.boardContext) return;

      this.clear();
      this.drawSnake();
    },

    drawSnake() {
      if (!this.boardContext || !this.snake) return;

      this.snake.forEach((cell, index) => {
        if (index === 0) {
          this.drawHead(cell);
        } else {
          this.drawCell(cell);
        }
      });
    },

    getInitCell() {
      return Math.floor(Math.random() * (this.countCells - 3 - 3)) + 3;
    },

    move() {
      if (!this.isPlaying) return;
      if (!this.boardContext || !this.snake) return;

      const newHeadCell = {
        x: this.snake[0].x + this.direction.move.x,
        y: this.snake[0].y + this.direction.move.y,
      };

      const willEat =
        this.targetCell &&
        newHeadCell.x === this.targetCell.x &&
        newHeadCell.y === this.targetCell.y;

      // Si no come, la cola se mueve y esa celda queda libre.
      const bodyToCheck = willEat ? this.snake : this.snake.slice(0, -1);

      const willHitBody = bodyToCheck.some(
        (cell) => cell.x === newHeadCell.x && cell.y === newHeadCell.y,
      );

      if (this.isCellOutOfBoard(newHeadCell) || willHitBody) {
        this.clear();
        this.stop();
        return;
      }

      if (willEat) {
        this.snake.unshift(newHeadCell);
        this.targetCell = null;
        this.addScore(this.points);
      } else {
        this.snake.unshift(newHeadCell);
        this.snake.pop();
      }

      this.clear();
      this.setTargetCell();
      this.drawSnake();

      this.moveTimeout = setTimeout(() => this.move(), this.getMoveDelay());
    },

    clear() {
      this.boardContext.clearRect(0, 0, this.boardSizePx, this.boardSizePx);
    },

    drawCell({ x, y }) {
      const centerX = x * this.cellSize + Math.round(this.cellSize / 2);
      const centerY = y * this.cellSize + Math.round(this.cellSize / 2);
      const radius = Math.round(this.cellSize / 2);

      this.boardContext.beginPath();
      this.boardContext.arc(
        centerX,
        centerY,
        radius,
        0,
        (Math.PI / 180) * 360,
        true,
      );
      this.boardContext.fillStyle = "#9F7267";
      this.boardContext.fill();
    },

    drawHead({ x, y }) {
      if (this.head && this.head.complete) {
        this.boardContext.drawImage(
          this.head,
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize,
        );
      } else {
        this.drawCell({ x, y });
      }
    },

    getMoveDelay() {
      return (2 / this.speed) * 1000;
    },

    isCellOutOfBoard({ x, y }) {
      return x < 0 || y < 0 || x >= this.countCells || y >= this.countCells;
    },

    onKeyPress(event) {
      const newDirection = this.directions.find(
        (item) => item.key === event.key,
      );

      if (!newDirection || !this.isPlaying) return;

      event.preventDefault();
      this.changeDirection(newDirection.direction);
    },

    changeDirection(direction) {
      const newDirection = this.directions.find(
        (item) => item.direction === direction,
      );

      if (!newDirection || !this.direction) return;

      const isOppositeDirection =
        newDirection.move.x === -this.direction.move.x &&
        newDirection.move.y === -this.direction.move.y;

      if (isOppositeDirection) return;

      this.direction = newDirection;
    },

    setTargetCell() {
      if (!this.targetCell) {
        let targetCell = this.getRandomCell();

        while (this.amountCellsInSnake(targetCell) > 0) {
          targetCell = this.getRandomCell();
        }

        this.targetCell = targetCell;
      }

      const { x, y } = this.getCellPosition(this.targetCell);

      if (this.food && this.food.complete) {
        this.boardContext.drawImage(
          this.food,
          x,
          y,
          this.cellSize,
          this.cellSize,
        );
      } else {
        this.boardContext.font = `${this.cellSize - 4}px serif`;
        this.boardContext.fillText("🌰", x + 1, y + this.cellSize - 3);
      }
    },

    getCellPosition({ x, y }) {
      return {
        x: x * this.cellSize,
        y: y * this.cellSize,
      };
    },

    getRandomCell() {
      return {
        x: Math.floor(Math.random() * this.countCells),
        y: Math.floor(Math.random() * this.countCells),
      };
    },

    amountCellsInSnake(cell) {
      const snakeCell = this.snake.filter(
        ({ x, y }) => x === cell.x && y === cell.y,
      );

      return snakeCell.length;
    },

    isTargetNewHead() {
      return (
        this.snake[0].x + this.direction.move.x === this.targetCell.x &&
        this.snake[0].y + this.direction.move.y === this.targetCell.y
      );
    },
  },
};
</script>

<style scoped>
.snake-game {
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
  align-items: center;
}

.snake-canvas {
  display: block;
  width: 100%;
  max-width: 480px;
  height: auto;
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
  margin: 0 auto;
  border: 5px solid #5b6dcd;
  border-radius: 5px;
  background-image: url("../assets/tablero.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  image-rendering: pixelated;
}

.touch-controls {
  display: grid;
  justify-items: center;
  gap: 10px;
  margin: 14px auto 0;
}

.controls-label {
  margin: 0;
  color: #667780;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
}

.direction-pad {
  display: grid;
  grid-template-columns: repeat(3, 64px);
  grid-template-rows: repeat(2, 56px);
  gap: 8px;
  justify-content: center;
}

.direction-button {
  display: grid;
  min-width: 0;
  min-height: 0;
  place-items: center;
  border: 2px solid #d4e4cc;
  border-radius: 15px;
  background: #fff;
  color: #315e2b;
  box-shadow: 0 3px 0 #d4e4cc;
  font-size: 22px;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color 150ms ease,
    transform 150ms ease,
    box-shadow 150ms ease;
}

.direction-up {
  grid-column: 2;
  grid-row: 1;
}

.direction-left {
  grid-column: 1;
  grid-row: 2;
}

.direction-down {
  grid-column: 2;
  grid-row: 2;
}

.direction-right {
  grid-column: 3;
  grid-row: 2;
}

.direction-button:not(:disabled):active {
  transform: translateY(3px);
  box-shadow: none;
  background: #e9f8e2;
}

.direction-button:focus-visible {
  outline: 3px solid #25b8b0;
  outline-offset: 3px;
}

.direction-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
}

/* Solo ocultar los controles táctiles en pantallas amplias */
@media (min-width: 901px) {
  .touch-controls {
    display: none;
  }
}

@media (max-width: 360px) {
  .direction-pad {
    grid-template-columns: repeat(3, 58px);
    grid-template-rows: repeat(2, 52px);
    gap: 7px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .direction-button {
    transition: none;
  }
}
</style>
