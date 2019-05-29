<template>
  <div id="app">
    <h1>Twisted Snake</h1>
    <SnakeCanvas></SnakeCanvas>
    <div class="div-button">
      <button>Play</button>
    </div>
    
  </div>
</template>

<script>
import SnakeCanvas from './components/SnakeCanvas.vue'

export default {
  name: 'app',
  components: {
    SnakeCanvas
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
