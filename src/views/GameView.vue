<template>
  <main class="game-app">
    <header class="game-header">
      <RouterLink to="/" class="back-link" aria-label="Volver al inicio">
        <span class="back-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </span>
        <span>Inicio</span>
      </RouterLink>

      <div class="game-title">
        <span class="eyebrow">AVENTURA EN EL BOSQUE</span>
        <h1>¡A recoger bellotas!</h1>
        <p>Muévete por el tablero y evita chocar.</p>
      </div>

      <div class="header-info">
        <span class="status-pill">
          {{ isPlaying ? "En partida" : "Preparado" }}
        </span>

        <div class="score-badge" aria-live="polite">
          <span>Puntuación</span>
          <strong>{{ score }}</strong>
        </div>
      </div>
    </header>

    <section class="game-layout">
      <div class="board-card">
        <div class="game-actions">
          <button
            class="primary-button"
            :class="{ 'stop-button': isPlaying }"
            @click="isPlaying ? stop() : start()"
          >
            <span aria-hidden="true">{{ isPlaying ? "■" : "🎮" }}</span>
            {{ isPlaying ? "Terminar partida" : "¡A jugar!" }}
          </button>

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
        </div>

        <p class="keyboard-hint">Usa las flechas del teclado para moverte.</p>
      </div>

      <aside class="scores-card">
        <div class="scores-heading">
          <span class="scores-icon" aria-hidden="true">🏆</span>
          <div>
            <h2>Mejores partidas</h2>
            <p>Tu progreso en el bosque</p>
          </div>
        </div>

        <ScoresBoard :scores="scores" />

        <div class="tip-card">
          <span aria-hidden="true">💡</span>
          <p>¡Recoge las bellotas y consigue la puntuación más alta!</p>
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
      score: 0,
      points: 1,
      scores: [],
      options: [
        { text: "Fácil", value: 4 },
        { text: "Normal", value: 8 },
        { text: "Difícil", value: 12 },
      ],
    };
  },

  methods: {
    start() {
      this.score = 0;
      this.isPlaying = true;
    },

    stop() {
      this.isPlaying = false;
      this.scores.push(this.score);
    },

    addScore(score) {
      this.score += score;
    },
  },
};
</script>

<style scoped>
.game-app {
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 12px 20px;
}

.game-header {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 20px;
  margin-bottom: 14px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  width: fit-content;
  padding: 8px 12px 8px 8px;
  border-radius: 12px;
  color: var(--color-ink);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background-color 150ms ease,
    color 150ms ease,
    transform 150ms ease;
}

.back-icon {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 10px;
  background: #e6f6df;
  color: #397b25;
}

.back-link:hover {
  background: #e6f6df;
  color: #397b25;
}

.back-link:hover .back-icon {
  background: #d6edcb;
}

.back-link:active {
  transform: scale(0.98);
}

.back-link:focus-visible {
  outline: 3px solid var(--color-turquoise);
  outline-offset: 3px;
}

.game-title {
  min-width: 0;
}

.game-title .eyebrow {
  display: block;
  margin: 0 0 3px;
  color: #537b40;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.2px;
}

.game-title h1 {
  margin: 0;
  font-size: clamp(20px, 2vw, 27px);
  line-height: 1.2;
}

.game-title p {
  margin: 4px 0 0;
  color: #667780;
  font-size: 13px;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-pill {
  flex-shrink: 0;
  padding: 8px 11px;
  border-radius: 999px;
  background: #e6f6df;
  color: #397b25;
  font-size: 12px;
  font-weight: 700;
}

.score-badge {
  display: grid;
  gap: 2px;
  min-width: 88px;
  padding: 7px 12px;
  border-radius: 12px;
  background: var(--color-white);
  box-shadow: var(--shadow-card);
}

.score-badge span {
  font-size: 11px;
}

.score-badge strong {
  color: #4d9b32;
  font-size: 22px;
  line-height: 1.1;
}

.game-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  align-items: start;
  gap: 16px;
}

.board-card,
.scores-card {
  min-width: 0;
  padding: 14px;
  border-radius: var(--radius-card);
  background: var(--color-white);
  box-shadow: var(--shadow-card);
}

.game-actions {
  display: flex;
  align-items: end;
  gap: 10px;
  margin: 0;
}

.primary-button {
  flex: 1;
  min-width: 0;
  min-height: 44px;
  padding: 10px 16px;
  border: 0;
  border-radius: var(--radius-button);
  background: var(--color-forest);
  color: #17351a;
  font-weight: 800;
  cursor: pointer;
  transition: transform 150ms ease;
}

.primary-button:hover {
  transform: translateY(-1px);
}

.stop-button {
  background: var(--color-coral);
  color: white;
}

.difficulty-control {
  display: grid;
  flex: 0 0 150px;
  gap: 4px;
}

.difficulty-control span {
  font-size: 12px;
}

.difficulty-control select {
  width: 100%;
  min-height: 44px;
  padding: 8px 10px;
  border: 1px solid #d9e3d5;
  border-radius: 10px;
  background: var(--color-cream);
  color: var(--color-ink);
}

.board {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0 0;
  padding: 8px;
  border-radius: 14px;
  background: #edf5e7;
}

.keyboard-hint {
  margin: 8px 0 0;
  color: #667780;
  font-size: 12px;
  text-align: center;
}

.game-footer {
  padding: 10px 0 0;
  color: #667780;
  font-size: 12px;
  text-align: center;
}

@media (max-width: 900px) {
  .game-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .scores-card {
    margin-top: 0;
  }
}

@media (max-width: 600px) {
  .game-app {
    padding: 12px;
  }

  .game-header {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 10px;
  }

  .game-title {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  .header-info {
    justify-content: flex-end;
    gap: 6px;
  }

  .score-badge {
    min-width: 68px;
    padding: 6px 9px;
  }

  .status-pill {
    padding: 7px 8px;
    font-size: 11px;
  }

  .board-card,
  .scores-card {
    padding: 10px;
  }

  .game-actions {
    gap: 8px;
  }

  .difficulty-control {
    flex-basis: 125px;
  }

  .board {
    padding: 5px;
    margin-top: 10px;
  }

  .game-footer {
    padding-top: 8px;
  }
}

@media (max-width: 380px) {
  .game-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .difficulty-control {
    flex-basis: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .primary-button {
    transition: none;
  }
}
</style>
