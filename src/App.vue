<template>
  <div id="app">
    <h1>Twisted Snake</h1>
    <h3>Score: {{score}}</h3>
    <div class="div-button">
      <button v-on:click="isPlaying ? stop() : start()">{{isPlaying ? "Stop" : "Play"}}</button>
    </div>
    <SnakeCanvas
      :cellSize="cellSize"
      :countCells="countCells"
      :speed="speed"
      :isPlaying="isPlaying"
      :score="score"
      :stop="stop"
      :addScore="addScore"
      :points="points"
    >
    </SnakeCanvas>
    
    
  </div>
</template>

<script>
import SnakeCanvas from './components/SnakeCanvas.vue'

export default {
  name: 'app',
  components: {
    SnakeCanvas
  },
  data () {
    return {
      cellSize: 30,
      countCells: 16,
      speed: 5,
      isPlaying: false,
      score: 0,
      points: 1
    }
  },
  methods: {
    start () {
      this.isPlaying = true
      this.score = 0
    },
    stop () {
      this.isPlaying = false
    },
    addScore (score) {
      this.score += score
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    flex: wrap;
    justify-content: center;
    align-items: center;
  }
  .div-button {

  }
</style>
