<template>
  <div class="scores-table">
    <p v-if="!orderedScores.length" class="empty-state">
      Todavía no hay partidas registradas. ¡Sé la primera en conseguir un
      récord!
    </p>

    <ol v-else class="scores-list">
      <li
        v-for="(score, index) in orderedScores"
        :key="`${score}-${index}`"
        class="score-row"
      >
        <span class="score-rank" :class="{ 'top-rank': index === 0 }">
          <span v-if="index === 0" aria-label="Primer lugar">🏆</span>
          <span v-else>{{ index + 1 }}</span>
        </span>

        <span class="score-name">
          {{ index === 0 ? "Mejor partida" : `Partida ${index + 1}` }}
        </span>

        <strong>{{ score }}</strong>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "Scores",

  props: {
    scores: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    orderedScores() {
      return [...this.scores].sort((a, b) => b - a).slice(0, 10);
    },
  },
};
</script>

<style scoped>
.scores-list {
  display: grid;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.score-row {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 1px solid #edf0e6;
  border-radius: 12px;
  background: #fffdf7;
  color: #315c38;
}

.score-rank {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 9px;
  background: #eef4e8;
  font-size: 12px;
  font-weight: 800;
}

.top-rank {
  background: #fff0c9;
  font-size: 17px;
}

.score-name {
  overflow-wrap: anywhere;
  font-size: 12px;
  font-weight: 700;
}

.score-row strong {
  font-size: 17px;
}

.empty-state {
  margin: 0;
  padding: 14px;
  border-radius: 12px;
  background: #f6f8f1;
  color: #667780;
  font-size: 13px;
  line-height: 1.5;
}
</style>
