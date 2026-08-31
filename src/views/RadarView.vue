<script setup lang="ts">
import { ref } from 'vue'
import DemoTopbar from '../components/DemoTopbar.vue'
import SectionIntro from '../components/SectionIntro.vue'

const dialog = ref(false)
const step = ref(1)
const category = ref('')
const neighborhood = ref('')
const description = ref('')
const protocol = ref('')
const trackOpen = ref(false)
const tracked = ref(false)
const categories = [
  { title: 'Iluminação', code: 'IL' }, { title: 'Pavimentação', code: 'PV' }, { title: 'Drenagem', code: 'DR' },
  { title: 'Limpeza', code: 'LP' }, { title: 'Acessibilidade', code: 'AC' },
]
const reset = () => { step.value=1; category.value=''; neighborhood.value=''; description.value=''; dialog.value=true }
const finish = () => { step.value=3 }
const search = () => { tracked.value=protocol.value.trim().length > 2 }
</script>

<template>
  <main class="radar">
    <DemoTopbar product="Radar do Bairro" />
    <header class="radar-header">
      <nav class="app-container radar-nav">
        <router-link :to="{ hash: '#topo' }" class="radar-brand"><span>R</span><strong>Radar do Bairro<small>Serviço de escuta cidadã</small></strong></router-link>
        <button type="button" class="radar-track" @click="trackOpen=true">Acompanhar protocolo</button>
      </nav>

      <div id="topo" class="app-container radar-hero">
        <div class="radar-hero__copy">
          <p class="type-kicker">Registro de demanda urbana</p>
          <h1>Encontrou um problema na sua rua?</h1>
          <p>Informe o local, descreva a situação e acompanhe o encaminhamento com um protocolo.</p>
          <button class="radar-primary" type="button" @click="reset">Registrar uma demanda <span>→</span></button>
        </div>
        <div class="radar-map" aria-label="Mapa ilustrativo de bairros">
          <div class="radar-map__label"><span>Mapa de atendimento</span><strong>Tramandaí</strong></div>
          <svg viewBox="0 0 640 470" role="img" aria-label="Mapa ilustrativo dos bairros">
            <path d="M66 137L183 58l97 51 111-56 172 97-22 104 45 85-121 75-96-44-116 58-96-77-92-45 41-92z" class="map-land"/>
            <path d="M183 58l51 145-128 11M234 203l135 16 96-113M369 219l-18 151M234 203l19 225M369 219l172 35M157 351l194 19M369 219l96 195" class="map-rule"/>
            <g class="map-point"><circle cx="220" cy="175" r="9"/><circle cx="400" cy="160" r="9"/><circle cx="305" cy="310" r="9"/><circle cx="466" cy="300" r="9"/></g>
            <g class="map-text"><text x="140" y="130">CENTRO</text><text x="410" y="115">ZONA NOVA</text><text x="205" y="350">SÃO FRANCISCO</text><text x="438" y="355">INDIANÓPOLIS</text></g>
          </svg>
          <div class="radar-map__summary"><div><strong>87</strong><span>resolvidas</span></div><div><strong>12</strong><span>em andamento</span></div></div>
        </div>
      </div>
    </header>

    <section class="radar-how section-block">
      <div class="app-container">
        <SectionIntro kicker="Como funciona" title="Três passos, sem conversa perdida." description="A equipe recebe cada registro já classificado e o cidadão acompanha o andamento pelo mesmo canal." />
        <ol class="radar-steps">
          <li v-reveal><span>01</span><div><strong>Registre</strong><p>Escolha o assunto e conte onde está o problema.</p></div></li>
          <li v-reveal="70"><span>02</span><div><strong>Encaminhamos</strong><p>A demanda entra organizada e vai para a equipe responsável.</p></div></li>
          <li v-reveal="140"><span>03</span><div><strong>Acompanhe</strong><p>Use o protocolo para consultar cada mudança de status.</p></div></li>
        </ol>
      </div>
    </section>

    <section class="radar-report section-block">
      <div class="app-container radar-report__grid">
        <div><p class="type-kicker">Resumo operacional</p><h2>Últimos 30 dias</h2><p>Dados agregados de atendimento. Nenhuma intenção de voto é registrada.</p></div>
        <dl v-reveal><div><dt>186</dt><dd>registros recebidos <span>+18%</span></dd></div><div><dt>87</dt><dd>demandas resolvidas <span>+24%</span></dd></div><div><dt>4 dias</dt><dd>tempo médio <span>−1,5 dia</span></dd></div><div><dt>9</dt><dd>bairros ativos <span>+2</span></dd></div></dl>
      </div>
    </section>

    <section class="radar-cta section-block"><div v-reveal class="app-container radar-cta__inner"><div><p class="type-kicker">Canal aberto</p><h2>Ajude a equipe a enxergar sua rua.</h2></div><button class="ui-button ui-button--ink" type="button" @click="reset">Fazer um registro</button></div></section>
    <footer class="radar-footer"><div class="app-container"><strong>Radar do Bairro</strong><span>Nenhum dado é enviado ou armazenado nesta demonstração.</span></div></footer>

    <v-dialog v-model="dialog" max-width="650" persistent>
      <v-card class="radar-dialog">
        <div class="radar-dialog__header"><div><span>Registro demonstrativo</span><h3>{{ step===3 ? 'Protocolo emitido' : 'Nova demanda' }}</h3></div><button type="button" aria-label="Fechar" @click="dialog=false">×</button><div class="radar-dialog__steps"><i v-for="n in 3" :key="n" :class="{ active:n<=step }"></i></div></div>
        <v-card-text class="pa-5 pa-sm-7">
          <div v-if="step===1"><p class="radar-dialog__question">Qual assunto precisa de atenção?</p><div class="category-grid"><button v-for="item in categories" :key="item.title" type="button" :class="{ selected:category===item.title }" @click="category=item.title"><span>{{ item.code }}</span><strong>{{ item.title }}</strong></button></div></div>
          <div v-else-if="step===2"><p class="radar-dialog__question">Onde está o problema?</p><v-select v-model="neighborhood" label="Bairro" :items="['Centro','Zona Nova','São Francisco','Indianópolis','Nova Tramandaí']"/><v-textarea v-model="description" class="mt-2" label="Descreva a situação" rows="3"/><v-btn variant="outlined" prepend-icon="mdi-camera-outline" block>Anexar foto (simulação)</v-btn></div>
          <div v-else class="protocol-success"><span>✓</span><h3>Registro recebido</h3><p>Seu protocolo demonstrativo é</p><strong>RAD-2026-0186</strong><small>Em uma versão real, as atualizações seriam enviadas pelos canais autorizados.</small></div>
        </v-card-text>
        <v-card-actions class="px-5 px-sm-7 pb-6"><v-btn v-if="step===2" variant="text" @click="step=1">Voltar</v-btn><v-spacer/><v-btn v-if="step===1" color="#172a31" :disabled="!category" @click="step=2">Continuar</v-btn><v-btn v-else-if="step===2" color="#172a31" :disabled="!neighborhood || description.length<5" @click="finish">Enviar registro</v-btn><v-btn v-else color="#172a31" @click="dialog=false">Concluir</v-btn></v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="trackOpen" max-width="540"><v-card><v-card-text class="pa-6"><p class="type-kicker">Consultar protocolo</p><h3 class="track-title">Acompanhe uma demanda</h3><v-text-field v-model="protocol" class="mt-6" label="Ex.: RAD-2026-0186" @keyup.enter="search"/><div v-if="tracked" class="track-timeline"><div v-for="(status,i) in [['Recebido','31 ago · 14h22'],['Encaminhado à equipe','31 ago · 16h05'],['Vistoria agendada','02 set · 09h00']]" :key="status[0]"><i :class="{ pending:i===2 }"></i><span><strong>{{ status[0] }}</strong><small>{{ status[1] }}</small></span></div></div></v-card-text><v-card-actions class="px-6 pb-6"><v-spacer/><v-btn color="#172a31" @click="search">Buscar</v-btn></v-card-actions></v-card></v-dialog>
  </main>
</template>

<style scoped>
.radar { --paper: #f3efe4; --surface: #fffdf7; --rule: #cbc5b8; --ink: #172a31; --ink-soft: #59676b; min-height: 100vh; background: var(--paper); color: var(--ink); }
.radar-header { background: #eabf46; }
.radar-nav { min-height: 4.4rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(23,42,49,.35); }
.radar-brand { display: flex; align-items: center; gap: .7rem; text-decoration: none; }
.radar-brand > span { width: 2rem; height: 2rem; display: grid; place-items: center; background: #172a31; color: #fff; font-family: var(--font-serif); font-size: .85rem; }
.radar-brand strong, .radar-brand small { display: block; }
.radar-brand strong { font-size: .78rem; }
.radar-brand small { margin-top: .15rem; color: rgba(23,42,49,.64); font-size: .56rem; font-weight: 400; }
.radar-track { min-height: 2.75rem; border: 0; border-bottom: 1px solid #172a31; background: none; color: inherit; font-size: .68rem; font-weight: 700; }
.radar-hero { padding-block: clamp(2.5rem, 8vw, 5rem); }
.radar-hero__copy h1 { max-width: 12ch; margin: 1rem 0 0; font-family: var(--font-serif); font-size: clamp(3rem, 12vw, 6.25rem); line-height: .98; letter-spacing: -.045em; }
.radar-hero__copy > p:last-of-type { max-width: 35rem; margin: 1.3rem 0 0; font-size: 1rem; line-height: 1.65; }
.radar-primary { width: 100%; min-height: 3.25rem; display: flex; align-items: center; justify-content: space-between; margin-top: 1.6rem; border: 1px solid #172a31; background: #172a31; color: #fff; padding: .8rem 1rem; font-size: .82rem; font-weight: 700; }
.radar-map { position: relative; margin-top: 2.5rem; border: 1px solid #172a31; background: #f4e7bd; }
.radar-map svg { width: 100%; display: block; padding: 3rem 1rem 1rem; }
.map-land { fill: #f8f1da; stroke: #172a31; stroke-width: 4; stroke-linejoin: round; }
.map-rule { fill: none; stroke: #c7af70; stroke-width: 3; }
.map-point { fill: #c84e32; }
.map-text { fill: #172a31; font-family: var(--font-sans); font-size: 12px; font-weight: 700; }
.radar-map__label { position: absolute; z-index: 2; left: 1rem; top: .9rem; }
.radar-map__label span, .radar-map__label strong { display: block; }
.radar-map__label span { color: #6d654e; font-size: .58rem; text-transform: uppercase; letter-spacing: .08em; }
.radar-map__label strong { margin-top: .15rem; font-family: var(--font-serif); }
.radar-map__summary { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #172a31; background: #fffdf7; }
.radar-map__summary div { display: flex; align-items: baseline; gap: .5rem; padding: .8rem; }
.radar-map__summary div:first-child { border-right: 1px solid #172a31; }
.radar-map__summary strong { font-family: var(--font-serif); font-size: 1.4rem; }
.radar-map__summary span { color: #626a68; font-size: .62rem; }

.radar-how { background: #fffdf7; }
.radar-steps { margin: 2.8rem 0 0; padding: 0; list-style: none; border-top: 2px solid #172a31; }
.radar-steps li { display: grid; grid-template-columns: 2.4rem 1fr; gap: 1rem; border-bottom: 1px solid var(--rule); padding: 1.2rem 0; }
.radar-steps li > span { color: #bb4d34; font-size: .68rem; font-weight: 700; }
.radar-steps strong { font-family: var(--font-serif); font-size: 1.35rem; }
.radar-steps p { margin: .3rem 0 0; color: #667072; font-size: .78rem; line-height: 1.5; }
.radar-report { background: #172a31; color: #fff; }
.radar-report__grid { display: grid; gap: 2.5rem; }
.radar-report h2 { margin: .8rem 0 0; font-family: var(--font-serif); font-size: 2.7rem; }
.radar-report__grid > div > p:last-child { max-width: 27rem; color: rgba(255,255,255,.58); font-size: .78rem; line-height: 1.55; }
.radar-report dl { display: grid; grid-template-columns: 1fr 1fr; margin: 0; border-top: 1px solid rgba(255,255,255,.3); }
.radar-report dl div { padding: 1.2rem .5rem; border-right: 1px solid rgba(255,255,255,.2); border-bottom: 1px solid rgba(255,255,255,.2); }
.radar-report dl div:nth-child(even) { border-right: 0; }
.radar-report dt { font-family: var(--font-serif); font-size: 1.75rem; }
.radar-report dd { margin: .35rem 0 0; color: rgba(255,255,255,.55); font-size: .62rem; }
.radar-report dd span { display: block; margin-top: .25rem; color: #efc55e; }
.radar-cta__inner { display: grid; gap: 1.5rem; align-items: end; }
.radar-cta h2 { max-width: 15ch; margin: .8rem 0 0; font-family: var(--font-serif); font-size: clamp(2.4rem, 8vw, 4rem); line-height: 1; }
.radar-footer { border-top: 1px solid var(--rule); padding-block: 1.5rem; }
.radar-footer .app-container { display: flex; flex-direction: column; gap: .35rem; color: #667071; font-size: .65rem; }
.radar-footer strong { color: #172a31; }

.radar-dialog__header { display: grid; grid-template-columns: 1fr auto; gap: 1rem; background: #eabf46; padding: 1rem 1.25rem; }
.radar-dialog__header span { font-size: .6rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.radar-dialog__header h3 { margin: .25rem 0 0; font-family: var(--font-serif); font-size: 1.55rem; }
.radar-dialog__header button { width: 2.75rem; height: 2.75rem; border: 0; background: transparent; font-size: 1.5rem; }
.radar-dialog__steps { grid-column: 1 / -1; display: flex; gap: .35rem; }
.radar-dialog__steps i { height: .2rem; flex: 1; background: rgba(23,42,49,.2); }
.radar-dialog__steps i.active { background: #172a31; }
.radar-dialog__question { margin: 0 0 1rem; font-weight: 700; }
.category-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; }
.category-grid button { min-height: 4.4rem; display: grid; grid-template-columns: 1.8rem 1fr; align-items: center; gap: .5rem; border: 1px solid #d4d0c7; background: #fff; padding: .7rem; text-align: left; }
.category-grid button.selected { border: 2px solid #172a31; background: #f7f0d8; }
.category-grid button span { color: #b14b33; font-size: .62rem; font-weight: 700; }
.category-grid button strong { font-size: .72rem; }
.protocol-success { padding-block: 1rem; text-align: center; }
.protocol-success > span { width: 3rem; height: 3rem; display: grid; place-items: center; margin: auto; border: 1px solid #2e6a55; color: #2e6a55; font-size: 1.4rem; }
.protocol-success h3 { margin: 1rem 0 .4rem; font-family: var(--font-serif); font-size: 1.7rem; }
.protocol-success p, .protocol-success small { color: #69716d; }
.protocol-success strong { display: block; margin: .6rem 0 1rem; color: #b54c33; font-size: 1.4rem; }
.protocol-success small { max-width: 25rem; display: block; margin: auto; line-height: 1.5; }
.track-title { margin: .8rem 0 0; font-family: var(--font-serif); font-size: 1.8rem; }
.track-timeline { border-left: 1px solid #c9c5bb; margin-left: .4rem; padding-left: 1.2rem; }
.track-timeline div { position: relative; padding: .7rem 0; }
.track-timeline i { position: absolute; left: -1.5rem; top: 1rem; width: .55rem; height: .55rem; border-radius: 50%; background: #2f745a; }
.track-timeline i.pending { background: #d6a63d; }
.track-timeline strong, .track-timeline small { display: block; }
.track-timeline small { margin-top: .2rem; color: #737973; }

@media (min-width: 40rem) { .radar-primary { width: auto; min-width: 16rem; } .radar-cta__inner { grid-template-columns: 1fr auto; } .radar-footer .app-container { flex-direction: row; justify-content: space-between; } }
@media (min-width: 48rem) {
  .radar-hero { display: grid; grid-template-columns: .85fr 1fr; gap: clamp(2rem, 6vw, 5rem); align-items: center; }
  .radar-hero__copy h1 { font-size: clamp(3.6rem, 6.7vw, 6.25rem); }
  .radar-map { margin: 0; }
  .radar-steps { display: grid; grid-template-columns: repeat(3, 1fr); }
  .radar-steps li { grid-template-columns: 2.4rem 1fr; border-right: 1px solid var(--rule); padding: 1.5rem; }
  .radar-steps li:last-child { border-right: 0; }
  .radar-report__grid { grid-template-columns: .65fr 1fr; align-items: end; }
  .radar-report dl { grid-template-columns: repeat(4, 1fr); }
  .radar-report dl div, .radar-report dl div:nth-child(even) { border-right: 1px solid rgba(255,255,255,.2); border-bottom: 0; }
  .radar-report dl div:last-child { border-right: 0; }
  .category-grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
