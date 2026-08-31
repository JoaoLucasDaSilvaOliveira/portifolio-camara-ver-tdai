<script setup lang="ts">
withDefaults(defineProps<{ kicker: string; title: string; description?: string; inverse?: boolean }>(), { description: '', inverse: false })
</script>

<template>
  <header class="section-intro" :class="{ 'section-intro--inverse': inverse }">
    <p class="type-kicker">{{ kicker }}</p>
    <h2 class="type-display">{{ title }}</h2>
    <p v-if="description" class="section-intro__description">{{ description }}</p>
  </header>
</template>

<style scoped>
.section-intro { max-width: 43rem; }
.section-intro h2 { max-width: 14ch; margin: 0.9rem 0 0; font-size: clamp(2.35rem, 7vw, 4.8rem); }
.section-intro__description { max-width: 38rem; margin: 1.25rem 0 0; color: var(--ink-soft); font-size: 1rem; line-height: 1.65; }
.section-intro--inverse .section-intro__description { color: rgba(255,255,255,.65); }
</style>
