<template>
  <main class="home-page">
    <header class="home-header">
      <RouterLink to="/" class="brand">
        <span class="brand-acorn" aria-hidden="true">🌰</span>
        <span>Ardilla y Bellota</span>
      </RouterLink>

      <span class="game-label">UNA AVENTURA PIXELADA</span>
    </header>

    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">¡EL BOSQUE TE ESPERA!</p>

        <h1>
          Una pequeña ardilla,
          <span>una gran aventura.</span>
        </h1>

        <p class="hero-description">
          Explora el tablero, recoge bellotas y consigue la puntuación más alta.
          ¿Cuántas podrás encontrar?
        </p>

        <div class="hero-actions">
          <RouterLink to="/jugar" class="play-button">
            <span aria-hidden="true">▶</span>
            Jugar ahora
          </RouterLink>

          <button
            class="instructions-button"
            type="button"
            :aria-expanded="showInstructions"
            @click="showInstructions = !showInstructions"
          >
            {{ showInstructions ? "Ocultar instrucciones" : "Cómo jugar" }}
          </button>
        </div>

        <div v-if="showInstructions" class="instructions-panel">
          <h2>¿Cómo jugar?</h2>
          <ul>
            <li>Usa las flechas del teclado para mover a la ardilla.</li>
            <li>Recoge las bellotas para sumar puntos.</li>
            <li>Evita chocar para continuar tu aventura.</li>
          </ul>
          <RouterLink to="/jugar" class="instructions-link">
            ¡Estoy lista para jugar!
          </RouterLink>
        </div>

        <div class="hero-note">
          <span aria-hidden="true">🌱</span>
          Una aventura sencilla para disfrutar
        </div>
      </div>

      <div class="hero-art" aria-label="Personaje del juego">
        <div class="art-sun"></div>
        <div class="art-cloud cloud-one"></div>
        <div class="art-cloud cloud-two"></div>

        <div class="art-hill hill-back"></div>
        <div class="art-hill hill-front"></div>

        <div class="character-card">
          <img
            :src="squirrelSprite"
            alt="Ardilla pixelada del juego"
            class="squirrel-sprite"
          />
          <span class="floating-acorn acorn-one" aria-hidden="true">🌰</span>
          <span class="floating-acorn acorn-two" aria-hidden="true">🌰</span>
        </div>

        <div class="art-caption">
          <span class="caption-dot"></span>
          Tu compañera de aventuras
        </div>
      </div>
    </section>

    <section class="features" aria-label="Características del juego">
      <article class="feature-card">
        <span class="feature-icon green-icon" aria-hidden="true">🌰</span>
        <div>
          <h2>Recoge bellotas</h2>
          <p>Consigue puntos en cada partida.</p>
        </div>
      </article>

      <article class="feature-card">
        <span class="feature-icon yellow-icon" aria-hidden="true">🎮</span>
        <div>
          <h2>Controles sencillos</h2>
          <p>Muévete con las flechas del teclado.</p>
        </div>
      </article>

      <article class="feature-card">
        <span class="feature-icon coral-icon" aria-hidden="true">🏆</span>
        <div>
          <h2>Supera tu récord</h2>
          <p>Intenta mejorar tu puntuación.</p>
        </div>
      </article>
    </section>

    <footer class="home-footer">Hecho con cariño, una bellota a la vez.</footer>
  </main>
</template>

<script>
import { ref } from "vue";
import squirrelSprite from "../assets/zoo.png";

export default {
  name: "HomeView",

  setup() {
    const showInstructions = ref(false);

    return {
      squirrelSprite,
      showInstructions,
    };
  },
};
</script>

<style scoped>
.home-page {
  width: min(1120px, 100%);
  min-height: 100vh;
  margin: 0 auto;
  padding: 24px;
}

.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 36px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-ink);
  font-size: 18px;
  font-weight: 800;
  text-decoration: none;
}

.brand-acorn {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 14px;
  background: #ffe4a8;
  font-size: 24px;
}

.game-label {
  color: #537b40;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.hero {
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  align-items: center;
  gap: 28px;
  padding: 30px 0 48px;
}

.hero-copy {
  position: relative;
  z-index: 1;
}

.eyebrow {
  margin-bottom: 14px;
  color: #4d9235;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.8px;
}

.hero h1 {
  max-width: 580px;
  margin: 0 0 20px;
  color: var(--color-ink);
  font-size: clamp(36px, 5vw, 58px);
  font-weight: 900;
  letter-spacing: -1.8px;
  line-height: 1.1;
}

.hero h1 span {
  display: block;
  color: #4d9b32;
}

.hero-description {
  max-width: 470px;
  margin-bottom: 26px;
  color: #61736a;
  font-size: 16px;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.play-button,
.instructions-button {
  display: inline-flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 13px 22px;
  border: 0;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  transition: transform 160ms ease;
}

.play-button {
  background: var(--color-forest);
  color: #17351a;
  box-shadow: 0 7px 0 #54a936;
}

.instructions-button {
  border: 1px solid #dce7d6;
  background: var(--color-white);
  color: var(--color-ink);
}

.play-button:hover,
.instructions-button:hover {
  transform: translateY(-2px);
}

.instructions-panel {
  max-width: 470px;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #dcebd5;
  border-radius: 16px;
  background: var(--color-white);
}

.instructions-panel h2 {
  margin: 0 0 12px;
  font-size: 18px;
}

.instructions-panel ul {
  display: grid;
  gap: 10px;
  padding-left: 20px;
  color: #61736a;
  font-size: 14px;
  line-height: 1.6;
}

.instructions-link {
  display: inline-block;
  margin-top: 4px;
  color: #397b25;
  font-size: 14px;
  font-weight: 800;
}

.hero-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 26px;
  color: #667780;
  font-size: 13px;
}

.hero-art {
  position: relative;
  display: grid;
  min-height: 390px;
  overflow: hidden;
  place-items: center;
  border: 1px solid rgb(77 155 50 / 12%);
  border-radius: 34px;
  background: #e8f4dc;
  isolation: isolate;
}

.art-sun {
  position: absolute;
  top: 34px;
  right: 45px;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: #ffcf6a;
}

.art-cloud {
  position: absolute;
  width: 66px;
  height: 20px;
  border-radius: 20px;
  background: rgb(255 255 255 / 85%);
}

.art-cloud::before,
.art-cloud::after {
  position: absolute;
  bottom: 5px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: inherit;
  content: "";
}

.art-cloud::before {
  left: 10px;
}

.art-cloud::after {
  right: 8px;
  width: 22px;
  height: 22px;
}

.cloud-one {
  top: 76px;
  left: 34px;
}

.cloud-two {
  top: 126px;
  right: 34px;
  transform: scale(0.7);
}

.art-hill {
  position: absolute;
  right: -10%;
  bottom: -60px;
  left: -10%;
  height: 190px;
  border-radius: 50% 50% 0 0;
}

.hill-back {
  bottom: -88px;
  background: #b7dc92;
  transform: rotate(-9deg);
}

.hill-front {
  bottom: -115px;
  background: #83c76b;
  transform: rotate(8deg);
}

.character-card {
  position: relative;
  z-index: 1;
  display: grid;
  width: min(260px, 70%);
  aspect-ratio: 1;
  place-items: center;
  border: 3px solid rgb(255 255 255 / 80%);
  border-radius: 32px;
  background: #fff8e7;
  box-shadow: 0 18px 0 rgb(49 99 38 / 12%);
  transform: rotate(-3deg);
}

.squirrel-sprite {
  display: block;
  width: 72%;
  height: 72%;
  object-fit: contain;
  image-rendering: pixelated;
}

.floating-acorn {
  position: absolute;
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 2px solid white;
  border-radius: 16px;
  background: #fff0c9;
  font-size: 25px;
}

.acorn-one {
  top: 20px;
  right: -22px;
  transform: rotate(12deg);
}

.acorn-two {
  bottom: 22px;
  left: -20px;
  transform: rotate(-12deg);
}

.art-caption {
  position: absolute;
  z-index: 2;
  right: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 13px;
  border-radius: 999px;
  background: white;
  color: var(--color-ink);
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgb(40 62 74 / 8%);
}

.caption-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #64b94b;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.feature-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  border: 1px solid #e8eadc;
  border-radius: 20px;
  background: rgb(255 255 255 / 80%);
}

.feature-icon {
  display: grid;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  place-items: center;
  border-radius: 15px;
  font-size: 22px;
}

.green-icon {
  background: #e2f4d8;
}

.yellow-icon {
  background: #fff0c9;
}

.coral-icon {
  background: #ffe5d8;
}

.feature-card h2 {
  margin: 0 0 5px;
  font-size: 14px;
}

.feature-card p {
  margin: 0;
  color: #667780;
  font-size: 12px;
  line-height: 1.5;
}

.home-footer {
  padding: 32px 0 8px;
  color: #667780;
  font-size: 13px;
  text-align: center;
}

@media (max-width: 760px) {
  .home-page {
    padding: 18px 14px;
  }

  .home-header {
    margin-bottom: 18px;
  }

  .game-label {
    max-width: 110px;
    font-size: 9px;
    text-align: right;
  }

  .hero {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 22px 0 32px;
  }

  .hero h1 {
    font-size: clamp(36px, 9vw, 50px);
  }

  .hero-art {
    min-height: 330px;
  }

  .features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 420px) {
  .brand {
    font-size: 15px;
  }

  .hero-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .play-button,
  .instructions-button {
    width: 100%;
  }

  .hero-art {
    min-height: 290px;
  }

  .feature-card {
    padding: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .play-button,
  .instructions-button {
    transition: none;
  }
}
</style>
