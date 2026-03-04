<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>Equips F1 2026</h1>
      <p class="subtitle">
        Explora tots els equips que competiran a la temporada 2026 de Fórmula 1.
      </p>
    </header>

    <section class="description">
      <p>
        Aquest projecte permet consultar informació detallada sobre cada equip de la F1 2026:
        nom, país, títols de constructors i logotips oficials.
      </p>
      <p>
        Fes clic al botó de sota per veure la llista completa d'equips i les seves estadístiques.
      </p>
    </section>

    <section class="cta">
      <RouterLink to="/equips" class="btn">Veure equips</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  text-align: center;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.description {
  font-size: 1.1rem;
  color: #333;
  text-align: left;
  margin-bottom: 3rem;
}

.cta {
  margin-top: 2rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  background-color: #e10600;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s;
  font-weight: bold;
}

.btn:hover {
  background-color: #a80000;
}
</style>
