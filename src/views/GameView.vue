<template>
  <main class="game-app">
    <header class="game-header">
      <RouterLink to="/" class="back-link" aria-label="Volver al inicio">
        <span aria-hidden="true">←</span>
        <span>Inicio</span>
      </RouterLink>
      <p class="game-brand">
        <span aria-hidden="true">🌰</span> Ardilla y Bellota
      </p>
    </header>

    <section class="game-layout">
      <div class="board-card">
        <div class="board-heading">
          <div>
            <p class="eyebrow">AVENTURA EN EL BOSQUE</p>
            <h1>¡A recoger bellotas!</h1>
            <p>Recoge bellotas y evita chocar.</p>
          </div>
          <span class="status-pill" :class="{ 'status-playing': isPlaying }">
            {{
              isPlaying
                ? "En partida"
                : gameOver
                  ? "Partida terminada"
                  : "Preparado"
            }}
          </span>
        </div>

        <div class="game-stats" aria-live="polite">
          <div class="stat-card current-stat">
            <span class="stat-label"
              ><span aria-hidden="true">🌰</span> Puntuación</span
            >
            <strong>{{ score }}</strong>
          </div>
          <div class="stat-card record-stat">
            <span class="stat-label"
              ><span aria-hidden="true">🏆</span> Mejor partida</span
            >
            <strong>{{ bestScore }}</strong>
          </div>
        </div>

        <div class="difficulty-row">
          <label class="difficulty-control">
            <span>Dificultad</span>
            <select v-model.number="speed" :disabled="isPlaying">
              <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </label>
        </div>

        <div class="board">
          <SnakeCanvas
            :cellSize="cellSize"
            :countCells="countCells"
            :speed="speed"
            :isPlaying="isPlaying"
            :score="score"
            :stop="stop"
            :addScore="addScore"
            :points="points"
          />

          <div
            v-if="gameOver"
            class="result-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="result-title"
          >
            <div class="result-card">
              <div class="sad-squirrel" aria-hidden="true">
                <img :src="squirrelSprite" alt="" />
                <span class="sad-tear">💧</span>
              </div>

              <p class="result-eyebrow">FIN DE LA AVENTURA</p>
              <h2 id="result-title">¡Oh, no! ¡Has chocado!</h2>
              <p class="result-description">
                No te preocupes, puedes intentarlo otra vez.
              </p>

              <div class="result-stats">
                <div class="result-stat">
                  <span><span aria-hidden="true">🌰</span> Tu puntuación</span>
                  <strong>{{ score }}</strong>
                </div>
                <div class="result-stat">
                  <span><span aria-hidden="true">🏆</span> Mejor partida</span>
                  <strong>{{ bestScore }}</strong>
                </div>
              </div>

              <div class="result-actions">
                <button class="primary-button" type="button" @click="start">
                  <span aria-hidden="true">↻</span> Jugar de nuevo
                </button>
              </div>
            </div>
          </div>
        </div>

        <p class="keyboard-hint">
          <span aria-hidden="true">🎮</span>
          Usa las flechas o los controles de dirección para moverte.
        </p>
      </div>

      <aside ref="recordsSection" class="scores-card" tabindex="-1">
        <div class="scores-heading">
          <span class="scores-icon" aria-hidden="true">🏆</span>
          <div>
            <h2>Tabla de récords</h2>
            <p>Tus mejores partidas</p>
          </div>
        </div>

        <ScoresBoard :scores="scores" />

        <div class="tip-card">
          <span aria-hidden="true">💡</span>
          <p>¡Recoge las bellotas y supera tu mejor puntuación!</p>
        </div>
      </aside>
    </section>

    <footer class="game-footer">
      Una pequeña aventura, una bellota a la vez.
    </footer>
  </main>
</template>

<script>
import SnakeCanvas from "../components/SnakeCanvas.vue";
import ScoresBoard from "../components/Scores.vue";
import squirrelSprite from "../assets/zoo.png";

const RECORDS_STORAGE_KEY = "ardilla-bellota-records";
const BEST_SCORE_STORAGE_KEY = "ardilla-bellota-best-score";

export default {
  name: "GameView",

  components: {
    SnakeCanvas,
    ScoresBoard,
  },

  data() {
    return {
      cellSize: 30,
      countCells: 16,
      speed: 8,
      isPlaying: false,
      gameOver: false,
      score: 0,
      points: 1,
      bestScore: 0,
      scores: [],
      squirrelSprite,
      options: [
        { text: "Fácil", value: 4 },
        { text: "Normal", value: 8 },
        { text: "Difícil", value: 12 },
      ],
    };
  },

  mounted() {
    this.loadRecords();
    // Entrar a /jugar inicia directamente una nueva partida.
    this.start();
  },

  methods: {
    loadRecords() {
      try {
        const savedScores = JSON.parse(
          localStorage.getItem(RECORDS_STORAGE_KEY) || "[]",
        );

        this.scores = Array.isArray(savedScores)
          ? savedScores.filter((value) => Number.isFinite(value) && value >= 0)
          : [];

        const savedBest = Number(
          localStorage.getItem(BEST_SCORE_STORAGE_KEY) || 0,
        );

        this.bestScore = Math.max(
          0,
          Number.isFinite(savedBest) ? savedBest : 0,
          ...this.scores,
        );
      } catch {
        this.scores = [];
        this.bestScore = 0;
      }
    },

    saveRecords() {
      try {
        localStorage.setItem(RECORDS_STORAGE_KEY, JSON.stringify(this.scores));
        localStorage.setItem(BEST_SCORE_STORAGE_KEY, String(this.bestScore));
      } catch {
        // El juego sigue funcionando aunque el navegador no permita guardar.
      }
    },

    start() {
      this.score = 0;
      this.gameOver = false;
      this.isPlaying = false;

      // Reiniciar en el siguiente ciclo permite que SnakeCanvas
      // observe el nuevo inicio.
      this.$nextTick(() => {
        this.isPlaying = true;
      });
    },

    stop() {
      if (!this.isPlaying || this.gameOver) return;

      this.isPlaying = false;
      this.gameOver = true;

      this.scores.push(this.score);
      this.scores.sort((a, b) => b - a);
      this.scores = this.scores.slice(0, 10);

      this.bestScore = Math.max(this.bestScore, this.score);
      this.saveRecords();
    },

    addScore(points) {
      if (this.isPlaying) {
        this.score += points;
      }
    },
  },
};
</script>

<style scoped>
/* Aprovechar mejor la altura de la pantalla */
.game-app {
  width: min(1200px, 100%);
  min-height: 100vh;
  margin: 0 auto;
  padding: 12px 20px;
}

.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.game-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 250px;
  align-items: start;
  gap: 18px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-ink);
  font-weight: 700;
  text-decoration: none;
}

.back-link:hover {
  color: #397b25;
}

.back-link:focus-visible,
button:focus-visible,
select:focus-visible {
  outline: 3px solid var(--color-turquoise);
  outline-offset: 3px;
}

.game-brand {
  margin: 0;
  font-weight: 800;
}

.game-brand span {
  margin-right: 5px;
}

.game-layout {
  grid-template-columns: minmax(0, 1fr) 250px;
  align-items: start;
  gap: 18px;
}

.board-card,
.scores-card {
  min-width: 0;
  padding: 16px;
  border-radius: var(--radius-card);
  background: var(--color-white);
  box-shadow: var(--shadow-card);
}

.board-heading,
.scores-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.board-heading h1,
.scores-heading h2 {
  margin: 0 0 6px;
  font-size: 20px;
}

.board-heading p,
.scores-heading p {
  margin: 0;
  color: #667780;
  font-size: 14px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #537b40;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.4px;
}

.status-pill {
  flex-shrink: 0;
  padding: 7px 10px;
  border-radius: 999px;
  background: #fff0c9;
  color: #805b13;
  font-size: 12px;
  font-weight: 700;
}

.status-playing {
  background: #e6f6df;
  color: #397b25;
}

/* Reducir el espacio entre los elementos superiores */
.game-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.stat-card {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 14px;
  background: #f2f8ed;
}

.stat-card strong {
  font-size: 22px;
}

.record-stat {
  background: #fff6dc;
}

.stat-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 700;
}

.stat-label span {
  font-size: 19px;
}

.stat-card strong {
  color: #315c38;
  font-size: 25px;
}

.record-stat strong {
  color: #805b13;
}

.difficulty-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.difficulty-control {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.difficulty-control select {
  min-height: 40px;
  padding: 7px 12px;
  border: 1px solid #d9e3d5;
  border-radius: 10px;
  background: var(--color-cream);
  color: var(--color-ink);
  font: inherit;
}

/* Evitar que el tablero ocupe más altura de la disponible */
.board {
  position: relative;
  display: flex;
  width: 100%;
  min-width: 0;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 8px;
  border-radius: 16px;
  background: #edf5e7;
}

.keyboard-hint {
  margin: 16px 0 0;
  color: #667780;
  font-size: 13px;
  line-height: 1.5;
  text-align: center;
}

.scores-heading {
  justify-content: flex-start;
  margin-bottom: 20px;
}

.scores-icon {
  display: grid;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  place-items: center;
  border-radius: 14px;
  background: #fff0c9;
  font-size: 23px;
}

.tip-card {
  display: flex;
  gap: 10px;
  margin-top: 24px;
  padding: 14px;
  border-radius: 14px;
  background: #e9f8f5;
}

.tip-card p {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
}

.game-footer {
  padding: 24px 0 8px;
  color: #667780;
  font-size: 13px;
  text-align: center;
}

/* Pantalla de fin de partida */
.result-overlay {
  position: absolute;
  z-index: 5;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: auto;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 12px;
  background: rgb(28 47 32 / 70%);
  backdrop-filter: blur(4px);
}

.result-card {
  width: min(100%, 370px);
  max-height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 16px;
  border: 2px solid #e2edda;
  border-radius: 22px;
  background: #fffdf6;
  text-align: center;
  box-shadow: 0 18px 48px rgb(0 0 0 / 20%);
}

.sad-squirrel {
  position: relative;
  display: grid;
  width: 92px;
  height: 92px;
  place-items: center;
  margin: 0 auto 8px;
  border-radius: 50%;
  background: #e9f5df;
}

.sad-squirrel img {
  width: 76px;
  height: 76px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: saturate(0.72);
}

.sad-tear {
  position: absolute;
  top: 28px;
  right: 9px;
  font-size: 19px;
}

.result-eyebrow {
  margin: 4px 0 7px;
  color: #537b40;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.4px;
}

.result-card h2 {
  margin: 0;
  color: #283e4a;
  font-size: 21px;
}

.result-description {
  margin: 8px 0 16px;
  color: #667780;
  font-size: 13px;
  line-height: 1.5;
}

.result-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
  margin-bottom: 16px;
}

.result-stat {
  display: grid;
  gap: 7px;
  padding: 12px 8px;
  border-radius: 13px;
  background: #f2f8ed;
}

.result-stat:last-child {
  background: #fff3d6;
}

.result-stat span {
  font-size: 11px;
  font-weight: 700;
}

.result-stat strong {
  font-size: 24px;
}

.result-actions {
  display: grid;
  gap: 9px;
}

.primary-button,
.secondary-button {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 15px;
  border: 0;
  border-radius: 12px;
  font: inherit;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 160ms ease;
}

.primary-button {
  background: var(--color-forest);
  color: #17351a;
}

.secondary-button {
  border: 1px solid #dce7d6;
  background: white;
  color: var(--color-ink);
}

.primary-button:hover,
.secondary-button:hover {
  transform: translateY(-2px);
}
/* En escritorio se juega con las flechas del teclado */
@media (min-width: 761px) {
  .touch-controls {
    display: none;
  }

  .snake-canvas {
    width: auto;
    max-width: min(480px, calc(100vh - 340px));
    max-height: calc(100vh - 340px);
  }
}
@media (max-width: 900px) {
  .game-app {
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
  }

  .game-layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .game-header {
    margin-bottom: 14px;
  }

  .board-card,
  .scores-card {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding: 14px;
  }

  .board {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding: 8px;
  }

  .board-heading h1 {
    font-size: 19px;
  }

  .keyboard-hint {
    margin-top: 12px;
  }

  .scores-card {
    padding: 18px;
  }

  .result-card {
    padding: 18px;
  }

  .snake-canvas {
    width: 100%;
    max-width: 480px;
    height: auto;
  }
}

@media (max-width: 420px) {
  .game-app {
    padding: 8px;
  }

  .board-card,
  .scores-card {
    padding: 10px;
  }

  .game-brand {
    font-size: 13px;
  }
  .board-card {
    padding: 10px;
  }
  .board-heading {
    align-items: flex-start;
  }

  .status-pill {
    padding: 6px 8px;
    font-size: 10px;
  }

  .game-stats {
    gap: 7px;
  }

  .stat-card {
    padding: 8px;
  }

  .stat-label {
    font-size: 11px;
  }

  .difficulty-control {
    width: 100%;
    justify-content: space-between;
  }

  .result-card h2 {
    font-size: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .primary-button,
  .secondary-button {
    transition: none;
  }
}
</style>
