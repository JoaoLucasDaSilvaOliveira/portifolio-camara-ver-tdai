<script setup lang="ts">
import { computed, ref } from 'vue'
import DemoTopbar from '../components/DemoTopbar.vue'

const period = ref('Últimos 30 dias')
const district = ref('Todos os bairros')
const selectedMetric = ref('Atendimentos')
const noteOpen = ref(false)
const multiplier = computed(() => period.value === 'Esta semana' ? .31 : period.value === 'Este trimestre' ? 2.7 : 1)
const fmt = (value: number) => Math.round(value * multiplier.value).toLocaleString('pt-BR')

const metrics = computed(() => [
  { value: fmt(1284), label: 'Atendimentos', change: '+18%' },
  { value: fmt(186), label: 'Demandas recebidas', change: '+12%' },
  { value: fmt(87), label: 'Resolvidas', change: '+24%' },
  { value: fmt(340), label: 'Participações', change: '+31%' },
])
const neighborhoods = [
  { name: 'Centro', value: 92, demand: 48 }, { name: 'Zona Nova', value: 78, demand: 39 },
  { name: 'São Francisco', value: 68, demand: 32 }, { name: 'Indianópolis', value: 54, demand: 27 },
  { name: 'Nova Tramandaí', value: 43, demand: 21 },
]
const activities = [
  ['Demanda de iluminação concluída','Zona Nova · há 18 min','Concluído'],
  ['12 novos contatos voluntários','Mobiliza Litoral · há 46 min','Novo'],
  ['Encontro confirmado','São Francisco · amanhã, 18h30','Agenda'],
  ['Projeto atualizado','Calçada Segura · há 2h','Projeto'],
]
</script>

<template>
  <main class="dashboard">
    <DemoTopbar product="Mapa de Atuação" />
    <div class="dashboard-shell">
      <aside class="dashboard-sidebar" aria-label="Navegação principal">
        <a href="#" class="dashboard-logo">F</a>
        <nav><button class="active" aria-label="Visão geral">Visão geral</button><button aria-label="Bairros">Bairros</button><button aria-label="Pessoas">Pessoas</button><button aria-label="Agenda">Agenda</button></nav>
      </aside>

      <div class="dashboard-main">
        <header class="dashboard-header">
          <div><p>Central de inteligência territorial</p><h1>Mapa de atuação</h1><span>Visão agregada do relacionamento com os bairros</span></div>
          <button type="button" aria-label="Notificações">3 notificações</button>
        </header>

        <section class="dashboard-filters" aria-label="Filtros do painel">
          <label>Bairro<select v-model="district"><option>Todos os bairros</option><option>Centro</option><option>Zona Nova</option><option>São Francisco</option><option>Indianópolis</option><option>Nova Tramandaí</option></select></label>
          <label>Período<select v-model="period"><option>Esta semana</option><option>Últimos 30 dias</option><option>Este trimestre</option></select></label>
          <span>Atualizado hoje, 09h12</span>
        </section>

        <section class="metric-strip" aria-label="Indicadores principais">
          <button v-for="metric in metrics" :key="metric.label" type="button" :class="{ active:selectedMetric===metric.label }" @click="selectedMetric=metric.label"><span>{{ metric.label }}</span><strong>{{ metric.value }}</strong><em>{{ metric.change }}</em></button>
        </section>

        <div class="dashboard-grid dashboard-grid--top">
          <section v-reveal class="data-panel activity-chart">
            <header><div><h2>Atividade por bairro</h2><p>Interações registradas no período</p></div><div class="legend"><span><i></i>Atual</span><span><i></i>Anterior</span></div></header>
            <div class="activity-chart__plot"><div v-for="(bar,i) in [42,68,51,83,64,92,72,86,59,95,78,88]" :key="i"><i :style="{height:`${Math.max(18,bar-18)}%`}"></i><b :style="{height:`${bar}%`}"></b></div></div>
            <div class="activity-chart__axis"><span>01 AGO</span><span>08 AGO</span><span>15 AGO</span><span>22 AGO</span><span>31 AGO</span></div>
          </section>

          <section v-reveal="100" class="data-panel distribution">
            <header><div><h2>Demandas por tema</h2><p>Distribuição no período</p></div></header>
            <div class="distribution__chart"><div><strong>{{ fmt(186) }}</strong><span>demandas</span></div></div>
            <dl><div><dt>Infraestrutura</dt><dd>38%</dd></div><div><dt>Saúde</dt><dd>26%</dd></div><div><dt>Educação</dt><dd>18%</dd></div><div><dt>Outros</dt><dd>18%</dd></div></dl>
          </section>
        </div>

        <div class="dashboard-grid">
          <section v-reveal class="data-panel neighborhood-panel">
            <header><div><h2>Volume por bairro</h2><p>Atendimentos e participações</p></div><button type="button" @click="noteOpen=true">Sobre os dados</button></header>
            <div class="neighborhood-list"><div v-for="item in neighborhoods" :key="item.name"><span><strong>{{ item.name }}</strong><em>{{ item.demand }} interações</em></span><i><b :style="{width:`${item.value}%`}"></b></i></div></div>
          </section>

          <section v-reveal="100" class="data-panel operation-panel">
            <header><div><h2>Agora na operação</h2><p>Atualizações recentes</p></div><span class="live"><i></i>Ao vivo</span></header>
            <ul><li v-for="activity in activities" :key="activity[0]"><span>{{ activity[2] }}</span><div><strong>{{ activity[0] }}</strong><small>{{ activity[1] }}</small></div></li></ul>
          </section>
        </div>

        <aside v-reveal class="responsible-note"><strong>Leitura responsável</strong><p>Este painel mostra atendimentos, eventos e participações voluntárias agregadas. Não representa pesquisa, enquete, intenção ou rastreamento de voto.</p></aside>
      </div>
    </div>

    <v-dialog v-model="noteOpen" max-width="560"><v-card><v-card-text class="pa-6"><p class="type-kicker">Metodologia demonstrativa</p><h3 class="note-title">O que este painel mede?</h3><p class="note-copy">Somente dados operacionais agregados: demandas recebidas, atendimentos do gabinete, presença em eventos e adesões voluntárias. Uma versão real precisaria de controle de acesso, base legal, política de retenção e segurança.</p></v-card-text><v-card-actions class="px-6 pb-6"><v-spacer/><v-btn color="#244d62" @click="noteOpen=false">Fechar</v-btn></v-card-actions></v-card></v-dialog>
  </main>
</template>

<style scoped>
.dashboard { --paper: #eef0eb; --surface: #f9faf6; --rule: #c9cdc6; --ink: #1a2225; --ink-soft: #626a6c; min-height: 100vh; background: var(--paper); color: var(--ink); }
.dashboard-shell { min-height: calc(100vh - 3.25rem); }
.dashboard-sidebar { display: none; }
.dashboard-main { padding: 1rem var(--page-pad) 2rem; }
.dashboard-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; border-bottom: 1px solid var(--rule); padding-bottom: 1.1rem; }
.dashboard-header p { margin: 0 0 .35rem; color: #2e6275; font-size: .58rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; }
.dashboard-header h1 { margin: 0; font-family: var(--font-serif); font-size: clamp(1.8rem, 8vw, 2.7rem); line-height: 1; }
.dashboard-header span { display: none; margin-top: .45rem; color: #737a7a; font-size: .68rem; }
.dashboard-header > button { min-height: 2.75rem; border: 1px solid var(--rule); border-radius: .25rem; background: #fff; padding: .5rem .7rem; color: #4f5859; font-size: 0; }
.dashboard-header > button::before { content: "03"; font-size: .68rem; font-weight: 700; }
.dashboard-filters { display: grid; grid-template-columns: 1fr 1fr; gap: .6rem; border-bottom: 1px solid var(--rule); padding-block: 1rem; }
.dashboard-filters label { color: #6e7575; font-size: .58rem; font-weight: 700; text-transform: uppercase; }
.dashboard-filters select { width: 100%; min-height: 2.75rem; display: block; margin-top: .35rem; border: 1px solid var(--rule); border-radius: .25rem; background: #fff; padding: .45rem; color: #283033; font-size: .68rem; text-transform: none; }
.dashboard-filters > span { grid-column: 1 / -1; color: #7a807e; font-size: .58rem; }
.metric-strip { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--rule); border-bottom: 0; background: #fff; }
.metric-strip button { position: relative; min-height: 7.4rem; display: flex; flex-direction: column; align-items: flex-start; border: 0; border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule); background: transparent; padding: .9rem; color: inherit; text-align: left; }
.metric-strip button:nth-child(even) { border-right: 0; }
.metric-strip button.active::before { position: absolute; left: 0; right: 0; top: 0; height: .22rem; background: #2e6275; content: ""; }
.metric-strip button span { color: #6c7474; font-size: .6rem; }
.metric-strip button strong { margin-top: auto; font-family: var(--font-serif); font-size: 1.8rem; }
.metric-strip button em { position: absolute; right: .7rem; bottom: 1rem; color: #267258; font-size: .58rem; font-style: normal; font-weight: 700; }
.dashboard-grid { display: grid; gap: .75rem; margin-top: .75rem; }
.data-panel { min-width: 0; border: 1px solid var(--rule); border-radius: .35rem; background: var(--surface); padding: 1rem; }
.data-panel > header { min-height: 2.8rem; display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
.data-panel h2 { margin: 0; font-size: .82rem; }
.data-panel header p { margin: .25rem 0 0; color: #737a78; font-size: .58rem; }
.legend { display: flex; gap: .6rem; color: #717877; font-size: .55rem; }
.legend span { display: flex; align-items: center; gap: .25rem; }
.legend i { width: .4rem; height: .4rem; background: #2e6275; }
.legend span:last-child i { background: #c5cbc9; }
.activity-chart__plot { height: 13rem; display: flex; align-items: end; gap: .25rem; border-bottom: 1px solid #bfc5c2; background-image: repeating-linear-gradient(to bottom, transparent 0, transparent calc(25% - 1px), #e2e5e0 25%); }
.activity-chart__plot > div { height: 100%; flex: 1; display: flex; align-items: end; justify-content: center; gap: 2px; }
.activity-chart__plot i, .activity-chart__plot b { width: 34%; display: block; }
.activity-chart__plot i { background: #c9cfcc; }
.activity-chart__plot b { background: #2e6275; }
.activity-chart__axis { display: flex; justify-content: space-between; margin-top: .5rem; color: #868c89; font-size: .48rem; }
.distribution__chart { width: 8.5rem; height: 8.5rem; display: grid; place-items: center; margin: 1rem auto; border-radius: 50%; background: conic-gradient(#2e6275 0 38%, #b8603f 38% 64%, #6e8b75 64% 82%, #d3ae54 82%); }
.distribution__chart > div { width: 5.2rem; height: 5.2rem; display: grid; place-content: center; border-radius: 50%; background: var(--surface); text-align: center; }
.distribution__chart strong { font-family: var(--font-serif); font-size: 1.45rem; }
.distribution__chart span { color: #737a78; font-size: .52rem; }
.distribution dl { display: grid; grid-template-columns: 1fr 1fr; gap: .55rem 1rem; margin: 0; }
.distribution dl div { display: flex; justify-content: space-between; font-size: .58rem; }
.distribution dt { color: #707775; }
.distribution dd { margin: 0; font-weight: 700; }
.data-panel header > button { min-height: 2.75rem; border: 0; background: none; color: #2e6275; font-size: .58rem; font-weight: 700; }
.neighborhood-list { margin-top: .8rem; }
.neighborhood-list > div { margin-top: .8rem; }
.neighborhood-list span { display: flex; justify-content: space-between; gap: 1rem; font-size: .62rem; }
.neighborhood-list em { color: #7a817f; font-style: normal; }
.neighborhood-list > div > i { height: .3rem; display: block; margin-top: .35rem; background: #e0e4df; }
.neighborhood-list b { height: 100%; display: block; background: #2e6275; }
.live { display: inline-flex; align-items: center; gap: .35rem; color: #267258; font-size: .56rem; font-weight: 700; }
.live i { width: .4rem; height: .4rem; border-radius: 50%; background: #2c8061; }
.operation-panel ul { margin: .7rem 0 0; padding: 0; list-style: none; }
.operation-panel li { display: grid; grid-template-columns: 4.2rem 1fr; gap: .7rem; border-top: 1px solid #dfe2dd; padding: .7rem 0; }
.operation-panel li > span { align-self: start; border: 1px solid #bcc5c1; padding: .25rem .35rem; color: #50615e; font-size: .5rem; font-weight: 700; text-align: center; text-transform: uppercase; }
.operation-panel strong, .operation-panel small { display: block; }
.operation-panel strong { font-size: .65rem; }
.operation-panel small { margin-top: .2rem; color: #818785; font-size: .55rem; }
.responsible-note { display: grid; gap: .3rem; margin-top: .75rem; border-left: .25rem solid #b8603f; background: #e4e4de; padding: .8rem; }
.responsible-note strong { font-size: .6rem; text-transform: uppercase; }
.responsible-note p { margin: 0; color: #686e6c; font-size: .58rem; line-height: 1.5; }
.note-title { margin: .8rem 0 0; font-family: var(--font-serif); font-size: 2rem; }
.note-copy { color: #636a67; line-height: 1.6; }

@media (min-width: 40rem) { .dashboard-header span { display: block; } .metric-strip { grid-template-columns: repeat(4, 1fr); } .metric-strip button, .metric-strip button:nth-child(even) { border-right: 1px solid var(--rule); } .metric-strip button:last-child { border-right: 0; } }
@media (min-width: 64rem) {
  .dashboard-shell { display: grid; grid-template-columns: 10.5rem minmax(0, 1fr); }
  .dashboard-sidebar { display: block; border-right: 1px solid var(--rule); background: #182327; padding: 1.5rem 1rem; color: #fff; }
  .dashboard-logo { width: 2.4rem; height: 2.4rem; display: grid; place-items: center; background: #d3ae54; color: #182327; font-family: var(--font-serif); font-weight: 700; text-decoration: none; }
  .dashboard-sidebar nav { display: grid; gap: .2rem; margin-top: 2.5rem; }
  .dashboard-sidebar nav button { min-height: 2.75rem; border: 0; border-left: 2px solid transparent; background: transparent; color: rgba(255,255,255,.55); padding: 0 .8rem; font-size: .65rem; text-align: left; }
  .dashboard-sidebar nav button.active { border-color: #d3ae54; color: #fff; }
  .dashboard-main { padding: 1.5rem clamp(1.5rem, 3vw, 3rem) 2.5rem; }
  .dashboard-filters { grid-template-columns: 13rem 13rem 1fr; align-items: end; }
  .dashboard-filters > span { grid-column: auto; justify-self: end; padding-bottom: .7rem; }
  .dashboard-grid { grid-template-columns: 1fr 1fr; }
  .dashboard-grid--top { grid-template-columns: minmax(0, 1.45fr) minmax(16rem, .55fr); }
  .metric-strip button { min-height: 8rem; padding: 1.1rem; }
  .metric-strip button strong { font-size: 2.15rem; }
}
</style>
