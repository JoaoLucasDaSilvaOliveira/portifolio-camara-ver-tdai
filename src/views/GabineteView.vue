<script setup lang="ts">
import { computed, ref } from 'vue'
import DemoTopbar from '../components/DemoTopbar.vue'
import SectionIntro from '../components/SectionIntro.vue'

interface Project { tag: string; title: string; description: string; status: string; code: string }

const activeFilter = ref('Todos')
const selectedProject = ref<Project | null>(null)
const contactOpen = ref(false)
const filters = ['Todos', 'Infraestrutura', 'Educação', 'Saúde']
const projects: Project[] = [
  { code: 'PL 018/26', tag: 'Infraestrutura', title: 'Calçada segura', description: 'Rotas acessíveis próximas a escolas e unidades de saúde.', status: 'Em execução' },
  { code: 'PL 041/26', tag: 'Educação', title: 'Escola aberta', description: 'Atividades culturais e esportivas no contraturno escolar.', status: 'Aprovado' },
  { code: 'IND 107/26', tag: 'Saúde', title: 'Cuidado perto de casa', description: 'Ampliação dos horários de atendimento nos bairros.', status: 'Em análise' },
  { code: 'IND 089/26', tag: 'Infraestrutura', title: 'Bairro iluminado', description: 'Mapeamento colaborativo de pontos com baixa iluminação.', status: 'Concluído' },
]
const visibleProjects = computed(() => activeFilter.value === 'Todos' ? projects : projects.filter(p => p.tag === activeFilter.value))
</script>

<template>
  <main class="gabinete">
    <DemoTopbar product="Gabinete Aberto" />
    <header class="gabinete-header">
      <nav class="app-container gabinete-nav">
        <a href="#topo" class="gabinete-brand"><strong>Helena Duarte</strong><span>Vereadora · Litoral Norte</span></a>
        <div class="gabinete-nav__links"><a href="#entregas">Entregas</a><a href="#projetos">Projetos</a><a href="#agenda">Agenda</a></div>
      </nav>

      <div id="topo" class="app-container gabinete-hero">
        <div class="gabinete-hero__copy">
          <p class="type-kicker">Gabinete aberto</p>
          <h1 class="type-display">Trabalho público, em linguagem pública.</h1>
          <p class="type-body">Projetos, recursos, agenda e resultados reunidos para qualquer pessoa acompanhar.</p>
          <div class="gabinete-hero__actions">
            <button class="ui-button ui-button--ink" type="button" @click="contactOpen=true">Falar com o gabinete</button>
            <a class="ui-button ui-button--paper" href="#entregas">Ver prestação de contas</a>
          </div>
        </div>
        <figure class="gabinete-portrait">
          <img src="/assets/helena-duarte.webp" alt="Helena Duarte, personagem fictícia" />
          <figcaption><span>Agenda de hoje</span><strong>Escuta no bairro São Francisco</strong><small>18h30 · Associação de moradores</small></figcaption>
        </figure>
      </div>
    </header>

    <section id="entregas" class="gabinete-results section-block">
      <div class="app-container">
        <SectionIntro kicker="Prestação de contas" title="Números que podem ser conferidos." description="Um resumo do mandato, com acesso aos projetos e ao andamento de cada compromisso." />
        <dl class="gabinete-stats">
          <div><dt>34</dt><dd>projetos apresentados</dd></div>
          <div><dt>R$ 2,4 mi</dt><dd>em recursos destinados</dd></div>
          <div><dt>12</dt><dd>bairros atendidos</dd></div>
          <div><dt>1.284</dt><dd>pessoas recebidas</dd></div>
        </dl>

        <div class="commitment-ledger">
          <div class="commitment-ledger__headline"><span>Compromissos do mandato</span><strong>78% entregues</strong><p>Atualizado em 31 de agosto de 2026</p></div>
          <div class="commitment-ledger__progress"><i></i></div>
          <dl><div><dt>18</dt><dd>Entregues</dd></div><div><dt>07</dt><dd>Em andamento</dd></div><div><dt>03</dt><dd>Em análise</dd></div></dl>
        </div>
      </div>
    </section>

    <section id="projetos" class="gabinete-projects section-block">
      <div class="app-container">
        <div class="gabinete-projects__heading">
          <SectionIntro kicker="Projetos em destaque" title="Da proposta ao resultado." />
          <div class="filter-tabs" role="tablist" aria-label="Filtrar projetos">
            <button v-for="filter in filters" :key="filter" type="button" :class="{ 'is-active': activeFilter===filter }" @click="activeFilter=filter">{{ filter }}</button>
          </div>
        </div>
        <div class="project-ledger">
          <button v-for="project in visibleProjects" :key="project.code" type="button" class="project-ledger__row" @click="selectedProject=project">
            <span class="project-ledger__code">{{ project.code }}</span>
            <div><span>{{ project.tag }}</span><strong>{{ project.title }}</strong><p>{{ project.description }}</p></div>
            <em :class="`status-${project.status.toLowerCase().replace(' ', '-')}`">{{ project.status }}</em>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>

    <section id="agenda" class="gabinete-agenda section-block">
      <div class="app-container gabinete-agenda__grid">
        <SectionIntro kicker="Agenda pública" title="Onde encontrar o mandato nesta semana." inverse />
        <ol>
          <li v-for="event in [['03','SET','Escuta no bairro','São Francisco · 18h30'],['06','SET','Gabinete na praça','Centro · 10h'],['10','SET','Audiência pública','Câmara · 19h']]" :key="event[0]"><time><strong>{{ event[0] }}</strong>{{ event[1] }}</time><div><strong>{{ event[2] }}</strong><span>{{ event[3] }}</span></div><span aria-hidden="true">↗</span></li>
        </ol>
      </div>
    </section>

    <footer class="gabinete-footer"><div class="app-container"><strong>Helena Duarte · Gabinete Aberto</strong><span>Personagem e dados inteiramente fictícios</span></div></footer>

    <v-dialog :model-value="!!selectedProject" max-width="560" @update:model-value="selectedProject=null">
      <v-card><v-card-text class="pa-6"><div v-if="selectedProject"><p class="type-kicker">{{ selectedProject.code }} · {{ selectedProject.tag }}</p><h3 class="dialog-title">{{ selectedProject.title }}</h3><p class="dialog-copy">{{ selectedProject.description }} Nesta demonstração, a pessoa encontraria objetivos, documentos, cronograma e atualizações.</p></div></v-card-text><v-card-actions class="px-6 pb-6"><v-spacer/><v-btn color="#213b36" @click="selectedProject=null">Fechar</v-btn></v-card-actions></v-card>
    </v-dialog>
    <v-snackbar v-model="contactOpen" color="#213b36" :timeout="3000">Demonstração: aqui seria aberto o WhatsApp do gabinete.</v-snackbar>
  </main>
</template>

<style scoped>
.gabinete { --paper: #efece3; --surface: #f8f5ed; --rule: #c9c4b9; --ink: #172521; --ink-soft: #5d6762; min-height: 100vh; background: var(--paper); color: var(--ink); }
.gabinete-header { border-bottom: 1px solid var(--rule); }
.gabinete-nav { min-height: 4.25rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--rule); }
.gabinete-brand { text-decoration: none; }
.gabinete-brand strong { display: block; font-family: var(--font-serif); font-size: 1rem; }
.gabinete-brand span { display: block; margin-top: .18rem; color: #6d756f; font-size: .62rem; }
.gabinete-nav__links { display: none; gap: 1.5rem; }
.gabinete-nav__links a { font-size: .74rem; font-weight: 700; text-decoration: none; }
.gabinete-hero { padding-block: clamp(2.5rem, 7vw, 5.5rem); }
.gabinete-hero__copy h1 { max-width: 11ch; margin: 1rem 0 0; font-size: clamp(3rem, 12vw, 6.4rem); }
.gabinete-hero__copy .type-body { max-width: 34rem; margin: 1.4rem 0 0; }
.gabinete-hero__actions { display: grid; gap: .65rem; margin-top: 1.6rem; }
.gabinete-portrait { margin: 2.5rem 0 0; }
.gabinete-portrait img { width: 100%; max-height: 34rem; display: block; object-fit: cover; object-position: 50% 24%; filter: saturate(.78); }
.gabinete-portrait figcaption { display: grid; gap: .25rem; border-left: .35rem solid #bd6b3f; background: #faf8f2; padding: 1rem; }
.gabinete-portrait figcaption span { color: #8c4e30; font-size: .62rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.gabinete-portrait figcaption strong { font-size: .85rem; }
.gabinete-portrait figcaption small { color: #70766f; }

.gabinete-stats { display: grid; grid-template-columns: 1fr 1fr; margin: 2.75rem 0 0; border-top: 2px solid var(--ink); }
.gabinete-stats div { min-height: 7.5rem; padding: 1.2rem .75rem; border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
.gabinete-stats div:nth-child(even) { border-right: 0; }
.gabinete-stats dt { font-family: var(--font-serif); font-size: clamp(1.75rem, 7vw, 3.3rem); font-weight: 700; }
.gabinete-stats dd { margin: .4rem 0 0; color: #68706a; font-size: .7rem; line-height: 1.4; }
.commitment-ledger { margin-top: 2.5rem; border: 1px solid #263d37; background: #213b36; color: #fff; padding: 1.25rem; }
.commitment-ledger__headline { display: grid; gap: .4rem; }
.commitment-ledger__headline span { font-size: .68rem; color: rgba(255,255,255,.62); }
.commitment-ledger__headline strong { font-family: var(--font-serif); font-size: 2rem; }
.commitment-ledger__headline p { margin: 0; color: rgba(255,255,255,.46); font-size: .62rem; }
.commitment-ledger__progress { height: .45rem; margin-top: 1.5rem; background: rgba(255,255,255,.14); }
.commitment-ledger__progress i { width: 78%; height: 100%; display: block; background: #dca64b; }
.commitment-ledger dl { display: grid; grid-template-columns: repeat(3, 1fr); margin: 1.3rem 0 0; }
.commitment-ledger dl div { border-right: 1px solid rgba(255,255,255,.18); text-align: center; }
.commitment-ledger dl div:last-child { border: 0; }
.commitment-ledger dt { font-size: 1.25rem; font-weight: 700; }
.commitment-ledger dd { margin: .2rem 0 0; color: rgba(255,255,255,.55); font-size: .6rem; }

.gabinete-projects { border-top: 1px solid var(--rule); background: #faf8f2; }
.filter-tabs { display: flex; gap: 1.2rem; margin-top: 2rem; overflow-x: auto; border-bottom: 1px solid var(--rule); }
.filter-tabs button { min-height: 2.75rem; flex: 0 0 auto; border: 0; border-bottom: 2px solid transparent; background: transparent; color: #777b74; font-size: .72rem; font-weight: 700; }
.filter-tabs button.is-active { border-color: #b85d38; color: var(--ink); }
.project-ledger { border-top: 2px solid var(--ink); }
.project-ledger__row { width: 100%; display: grid; grid-template-columns: 1fr auto; gap: .75rem 1rem; border: 0; border-bottom: 1px solid var(--rule); background: transparent; padding: 1.2rem 0; color: inherit; text-align: left; }
.project-ledger__code { color: #86523a; font-size: .65rem; font-weight: 700; }
.project-ledger__row > div { grid-column: 1 / -1; }
.project-ledger__row > div span { color: #777d77; font-size: .62rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; }
.project-ledger__row > div strong { display: block; margin-top: .25rem; font-family: var(--font-serif); font-size: 1.45rem; }
.project-ledger__row p { margin: .4rem 0 0; color: #69706a; font-size: .76rem; line-height: 1.5; }
.project-ledger__row em { align-self: center; font-size: .65rem; font-style: normal; font-weight: 700; }
.project-ledger__row > span:last-child { align-self: center; }

.gabinete-agenda { background: #2f413d; color: #fff; }
.gabinete-agenda__grid { display: grid; gap: 3rem; }
.gabinete-agenda ol { margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(255,255,255,.3); }
.gabinete-agenda li { display: grid; grid-template-columns: 3.5rem 1fr auto; align-items: center; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,.25); padding: 1rem 0; }
.gabinete-agenda time { color: #deb46e; font-size: .6rem; text-align: center; }
.gabinete-agenda time strong { display: block; font-family: var(--font-serif); font-size: 1.55rem; }
.gabinete-agenda li div strong, .gabinete-agenda li div span { display: block; }
.gabinete-agenda li div strong { font-size: .82rem; }
.gabinete-agenda li div span { margin-top: .25rem; color: rgba(255,255,255,.55); font-size: .68rem; }
.gabinete-footer { padding-block: 1.5rem; background: #172521; color: rgba(255,255,255,.6); }
.gabinete-footer .app-container { display: flex; flex-direction: column; gap: .3rem; font-size: .65rem; }
.gabinete-footer strong { color: #fff; }
.dialog-title { margin: 1rem 0 0; font-family: var(--font-serif); font-size: 2rem; }
.dialog-copy { margin: 1rem 0 0; color: #60665f; line-height: 1.6; }

@media (min-width: 40rem) { .gabinete-nav__links { display: flex; } .gabinete-hero__actions { display: flex; } }
@media (min-width: 48rem) {
  .gabinete-hero { display: grid; grid-template-columns: 1fr minmax(20rem, .72fr); gap: clamp(2rem, 6vw, 5rem); align-items: center; }
  .gabinete-hero__copy h1 { font-size: clamp(3.7rem, 6.8vw, 6.4rem); }
  .gabinete-portrait { margin: 0; }
  .gabinete-stats { grid-template-columns: repeat(4, 1fr); }
  .gabinete-stats div { border-bottom: 0; }
  .gabinete-stats div:nth-child(even) { border-right: 1px solid var(--rule); }
  .gabinete-stats div:last-child { border-right: 0; }
  .commitment-ledger { display: grid; grid-template-columns: .7fr 1fr; gap: 2rem; align-items: center; padding: 2rem; }
  .commitment-ledger__progress, .commitment-ledger dl { grid-column: 2; }
  .commitment-ledger dl { grid-row: 2; }
  .gabinete-projects__heading { display: flex; align-items: end; justify-content: space-between; gap: 2rem; }
  .project-ledger__row { grid-template-columns: 7rem 1fr 8rem 1.5rem; align-items: center; padding: 1.35rem 0; }
  .project-ledger__row > div { grid-column: auto; }
  .gabinete-agenda__grid { grid-template-columns: .8fr 1fr; }
  .gabinete-footer .app-container { flex-direction: row; justify-content: space-between; }
}
</style>
