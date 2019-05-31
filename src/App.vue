<template>
  <div id="app"> 
    <h1>Twisted Snake</h1>
    <h3>Score: {{score}}</h3>
    <div class="div-button">
      <button v-on:click="isPlaying ? stop() : start()">{{isPlaying ? "Stop" : "Play"}}</button>
    </div>

    <div class="score">
      <ScoresBoard
        :scores="scores"
      >
      </ScoresBoard>
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
      >
      </SnakeCanvas>
    </div>
    
    
    
  </div>
</template>

<script>
import SnakeCanvas from './components/SnakeCanvas.vue'
import ScoresBoard from './components/Scores.vue'

export default {
  name: 'app',
  components: {
    SnakeCanvas,
    ScoresBoard
  },
  data () {
    return {
      cellSize: 30,
      countCells: 16,
      speed: 5,
      isPlaying: false,
      score: 0,
      points: 1,
      scores: []
    }
  },
  methods: {
    start () {
      this.isPlaying = true
      this.score = 0
    },
    stop () {
      this.isPlaying = false
      this.scores.push(this.score)
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
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  .score, .board {
    float: left;
  }
  .score {
    width: 20%;
    text-align: left;
  }
  .board {
    width: 80%;
  }
  .div-button {
    margin-bottom: 20px;
  }

  button {
    font-size: 30px;
    cursor: pointer;
    padding: 5px 20px;
    border-radius: 5px;
  }
</style>
