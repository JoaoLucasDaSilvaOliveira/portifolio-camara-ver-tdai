<script setup lang="ts">
withDefaults(defineProps<{ dark?: boolean; product?: string }>(), { dark: false, product: 'Demonstração' })
</script>

<template>
  <aside class="demo-bar" :class="{ 'demo-bar--dark': dark }" aria-label="Navegação da demonstração">
    <div class="app-container demo-bar__inner">
      <router-link to="/" class="demo-bar__back"><span aria-hidden="true">←</span><span>Portfólio</span></router-link>
      <span class="demo-bar__product">{{ product }}</span>
      <span class="demo-bar__status"><i></i><span class="demo-bar__status-full">Dados fictícios</span><span class="demo-bar__status-short">Demo</span></span>
    </div>
  </aside>
</template>

<style scoped>
.demo-bar { position: relative; z-index: 50; border-bottom: 1px solid #d3cec3; background: #f4f1e9; color: #1b1d1a; }
.demo-bar--dark { border-color: #343733; background: #171916; color: #f5f1e8; }
.demo-bar__inner { min-height: 3.25rem; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 0.75rem; }
.demo-bar__back { min-height: 2.75rem; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.76rem; font-weight: 700; text-decoration: none; }
.demo-bar__back span:first-child { font-size: 1.1rem; }
.demo-bar__product { overflow: hidden; font-size: 0.7rem; opacity: 0.58; text-align: center; text-overflow: ellipsis; white-space: nowrap; }
.demo-bar__status { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.63rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; }
.demo-bar__status i { width: 0.42rem; height: 0.42rem; border-radius: 50%; background: #d65032; }
.demo-bar__status-full { display: none; }
@media (min-width: 36rem) { .demo-bar__status-full { display: inline; } .demo-bar__status-short { display: none; } }
</style>
