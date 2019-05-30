<template>
  <div id="app">
    <h1>Twisted Snake</h1>
    <SnakeCanvas
      :cellSize="cellSize"
      :countCells="countCells"
      :speed="speed"
      :isPlaying="isPlaying"
      :score="score"
    >
    </SnakeCanvas>
    <div class="div-button">
      <button v-on:click="isPlaying ? stop() : start()">{{isPlaying ? "Stop" : "Play"}}</button>
    </div>
    
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
      speed: 10,
      isPlaying: false,
      score: 0
    }
  },
  methods: {
    start () {
      this.isPlaying = true
    },
    stop () {
      this.isPlaying = false
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
