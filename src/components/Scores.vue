<template>
  <div>
    <h2>Scores:</h2>
    <ul>
      <li v-for="(score, index) in orderedScores" v-bind:key="index">Score {{index + 1}}: {{score}} points</li>
    </ul>
  </div>  
</template>

<script>
export default {
  name:'Scores',
  props: {
    scores: Array
  },
  computed: {
    orderedScores: function () {
      return this.scores.sort((a, b) => {return b - a})
    }
  }
}
</script>

<style scoped>
  ul {
    padding-left: 20px;
  }
</style>


