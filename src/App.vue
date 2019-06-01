<template>
  <div class="app"> 
    <h1>Twisted Snake</h1>
    <h3>Score: {{score}}</h3>
    <div class="div-button">
      <button v-on:click="isPlaying ? stop() : start()" v-bind:class="isPlaying ? 'red' : 'green'">{{isPlaying ? "Stop" : "Play"}}</button>
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
    
    <div class="clear"></div>
    
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
  body {
    background-color: #C4ADF0;
  }
  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #1D33AB;
    width: 100%;
    max-width: 850px;
    margin: 0 auto;    
  }
  .score, .board {
    float: left;
  }
  .score {
    width: 25%;
    text-align: left;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 5px;
    height: 480px;
    background-color: #6D7ECC;
    overflow-y: auto;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(91,109,205,1);
    -moz-box-shadow: 10px 10px 5px 0px rgba(91,109,205,1);
    box-shadow: 10px 10px 5px 0px rgba(91,109,205,1);
  }
  .board {
    width: 75%;   
  }
  .div-button {
    margin-bottom: 20px;
  }

  button {
    font-size: 30px;
    cursor: pointer;
    padding: 5px 20px;
    border-radius: 5px;
    color: #fafafa;
  }

  button.red {
    background-color: #F90C0C;
  }

  button.green {
    background-color:#31D331;
  }
  .clear {
    clear: both;
  }
</style>
