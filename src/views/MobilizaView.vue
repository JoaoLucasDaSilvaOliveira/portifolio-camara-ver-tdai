<script setup lang="ts">
import { ref } from 'vue'
import DemoTopbar from '../components/DemoTopbar.vue'
import SectionIntro from '../components/SectionIntro.vue'

const joinOpen = ref(false)
const joinStep = ref(1)
const name = ref('')
const city = ref('')
const interests = ref<string[]>([])
const action = ref('')
const shareOpen = ref(false)
const storyOpen = ref(false)
const startJoin = () => { joinStep.value=1; name.value=''; city.value=''; interests.value=[]; action.value=''; joinOpen.value=true }
const toggleInterest = (item: string) => interests.value.includes(item) ? interests.value.splice(interests.value.indexOf(item),1) : interests.value.push(item)

const causes = [
  { number: '01', title: 'Educação que abre portas', text: 'Mais oportunidades para jovens permanecerem, estudarem e crescerem na região.' },
  { number: '02', title: 'Trabalho o ano inteiro', text: 'Economia local forte, turismo responsável e apoio para quem empreende.' },
  { number: '03', title: 'Saúde mais perto', text: 'Atendimento regional ágil e cuidado que chega a cada comunidade.' },
]
</script>

<template>
  <main class="mobiliza">
    <DemoTopbar dark product="Mobiliza Litoral" />
    <header class="mobiliza-header">
      <nav class="app-container mobiliza-nav"><a href="#topo" class="mobiliza-brand"><strong>HELENA<br/>DUARTE</strong><span>Uma voz pelo Litoral</span></a><div><a href="#propostas">Propostas</a><a href="#agenda">Agenda</a><button type="button" @click="startJoin">Participar</button></div></nav>
      <div id="topo" class="app-container mobiliza-hero">
        <div class="mobiliza-hero__copy">
          <p class="type-kicker">Litoral Norte · Rio Grande do Sul</p>
          <h1>Helena Duarte para representar o Litoral.</h1>
          <p>Uma candidatura fictícia construída em torno de trabalho, escuta e presença regional.</p>
          <div class="mobiliza-hero__actions"><button class="mobiliza-primary" type="button" @click="startJoin">Quero participar</button><button class="mobiliza-secondary" type="button" @click="storyOpen=true">Conhecer a trajetória</button></div>
        </div>
        <figure class="mobiliza-photo"><img src="/assets/helena-duarte.webp" alt="Helena Duarte, personagem política fictícia"/><figcaption><strong>Helena Duarte</strong><span>Personagem demonstrativa</span></figcaption></figure>
        <div class="mobiliza-cities"><span>Um movimento por</span><strong v-for="cityName in ['Tramandaí','Imbé','Osório','Cidreira','Capão da Canoa']" :key="cityName">{{ cityName }}</strong></div>
      </div>
    </header>

    <section id="propostas" class="mobiliza-causes section-block">
      <div class="app-container">
        <SectionIntro kicker="Compromissos regionais" title="Três prioridades, explicadas sem rodeios." description="Cada pauta tem contexto local, compromisso verificável e espaço para participação." />
        <div class="cause-list">
          <article v-for="cause in causes" :key="cause.number"><span>{{ cause.number }}</span><h3>{{ cause.title }}</h3><p>{{ cause.text }}</p><button type="button" class="ui-link" @click="storyOpen=true">Ler compromissos</button></article>
        </div>
      </div>
    </section>

    <section class="mobiliza-quote section-block">
      <div class="app-container mobiliza-quote__grid"><blockquote>“Representar começa por ouvir. E ouvir exige estar presente.”</blockquote><div><p>Política feita de perto</p><span>Encontros abertos, agenda pública e diálogo com cada cidade.</span><button type="button" class="ui-button ui-button--light" @click="startJoin">Entrar no movimento</button></div></div>
    </section>

    <section id="agenda" class="mobiliza-agenda section-block">
      <div class="app-container">
        <SectionIntro kicker="Agenda pública" title="Próximos encontros no Litoral." />
        <ol>
          <li v-for="event in [['04','SET','Tramandaí','Roda de conversa com empreendedores','19h · Centro'],['07','SET','Osório','Encontro regional da juventude','15h · Largo dos Estudantes'],['11','SET','Capão da Canoa','Caminhada pela saúde','9h · Praça Central']]" :key="event[0]"><time><strong>{{ event[0] }}</strong>{{ event[1] }}</time><div><span>{{ event[2] }}</span><h3>{{ event[3] }}</h3><p>{{ event[4] }}</p></div><span aria-hidden="true">↗</span></li>
        </ol>
      </div>
    </section>

    <section class="mobiliza-action"><div class="app-container mobiliza-action__grid"><div><p class="type-kicker">Participação voluntária</p><h2>Tem espaço para você.</h2><p>Escolha uma forma de participar e diga quais assuntos importam na sua cidade.</p></div><div><button class="mobiliza-primary" type="button" @click="startJoin">Quero participar</button><button class="mobiliza-secondary" type="button" @click="shareOpen=true">Compartilhar no WhatsApp</button></div></div></section>
    <footer class="mobiliza-footer"><div class="app-container"><strong>Helena Duarte · Uma voz pelo Litoral</strong><span>Campanha, personagem e dados fictícios.</span></div></footer>

    <v-dialog v-model="joinOpen" max-width="600" persistent>
      <v-card class="mobiliza-dialog"><div class="mobiliza-dialog__header"><div><span>Participação demonstrativa</span><h3>{{ joinStep===3 ? 'Cadastro concluído' : 'Quero fazer parte' }}</h3></div><button type="button" aria-label="Fechar" @click="joinOpen=false">×</button><div><i v-for="n in 3" :key="n" :class="{ active:n<=joinStep }"></i></div></div>
        <v-card-text class="pa-5 pa-sm-7">
          <div v-if="joinStep===1"><p class="form-question">Primeiro, queremos conhecer você.</p><v-text-field v-model="name" label="Seu nome"/><v-select v-model="city" class="mt-2" label="Sua cidade" :items="['Tramandaí','Imbé','Osório','Cidreira','Capão da Canoa','Outra cidade']"/><p class="privacy-note">Nenhuma informação é enviada ou armazenada nesta demonstração.</p></div>
          <div v-else-if="joinStep===2"><p class="form-question">O que mais importa para você?</p><div class="interest-list"><button v-for="item in ['Educação','Saúde','Trabalho','Meio ambiente','Infraestrutura','Juventude']" :key="item" type="button" :class="{ selected:interests.includes(item) }" @click="toggleInterest(item)">{{ item }}</button></div><p class="form-question form-question--spaced">Como gostaria de participar?</p><v-radio-group v-model="action" hide-details><v-radio label="Receber notícias e agenda" value="news"/><v-radio label="Participar de encontros" value="events"/><v-radio label="Ajudar como voluntário(a)" value="volunteer"/></v-radio-group></div>
          <div v-else class="join-success"><span>✓</span><h3>Que bom ter você aqui, {{ name }}.</h3><p>Em uma campanha real, este passo mostraria a política de privacidade e a confirmação pelos canais autorizados.</p></div>
        </v-card-text>
        <v-card-actions class="px-5 px-sm-7 pb-6"><v-btn v-if="joinStep===2" variant="text" @click="joinStep=1">Voltar</v-btn><v-spacer/><v-btn v-if="joinStep===1" color="#a7352b" :disabled="!name || !city" @click="joinStep=2">Continuar</v-btn><v-btn v-else-if="joinStep===2" color="#a7352b" :disabled="!interests.length || !action" @click="joinStep=3">Confirmar participação</v-btn><v-btn v-else color="#a7352b" @click="joinOpen=false">Concluir</v-btn></v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="shareOpen" color="#1d2333" :timeout="3000">Demonstração: aqui seria aberto o compartilhamento no WhatsApp.</v-snackbar>
    <v-dialog v-model="storyOpen" max-width="560"><v-card><v-card-text class="pa-6"><p class="type-kicker">Trajetória demonstrativa</p><h3 class="story-title">Uma história ligada ao Litoral.</h3><p class="story-copy">Aqui entraria a trajetória real da liderança: origem, experiência, causas e resultados. A apresentação seria curta, documentada e escrita para leitura no celular.</p></v-card-text><v-card-actions class="px-6 pb-6"><v-spacer/><v-btn color="#a7352b" @click="storyOpen=false">Fechar</v-btn></v-card-actions></v-card></v-dialog>
  </main>
</template>

<style scoped>
.mobiliza { --paper: #f0eee7; --surface: #fbfaf5; --rule: #c9c5ba; --ink: #1d2333; --ink-soft: #5c6270; min-height: 100vh; background: var(--paper); color: var(--ink); }
.mobiliza-header { background: #1d2333; color: #fff; }
.mobiliza-nav { min-height: 4.75rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,.25); }
.mobiliza-brand { display: flex; align-items: center; gap: .65rem; text-decoration: none; }
.mobiliza-brand strong { font-family: var(--font-serif); font-size: .75rem; line-height: .85; letter-spacing: -.03em; }
.mobiliza-brand span { max-width: 6.5rem; color: rgba(255,255,255,.58); font-size: .56rem; line-height: 1.3; }
.mobiliza-nav > div { display: flex; align-items: center; gap: .85rem; }
.mobiliza-nav a, .mobiliza-nav button { border: 0; background: none; color: #fff; font-size: .65rem; font-weight: 700; text-decoration: none; }
.mobiliza-nav a { display: none; }
.mobiliza-nav button { min-height: 2.75rem; border-bottom: 1px solid #e6bd54; }
.mobiliza-hero { padding-block: clamp(2.5rem, 7vw, 5rem); }
.mobiliza-hero__copy h1 { max-width: 11ch; margin: 1rem 0 0; font-family: var(--font-serif); font-size: clamp(3rem, 12vw, 6.5rem); line-height: .95; letter-spacing: -.05em; }
.mobiliza-hero__copy > p:last-of-type { max-width: 35rem; margin: 1.3rem 0 0; color: rgba(255,255,255,.7); font-size: 1rem; line-height: 1.65; }
.mobiliza-hero__actions { display: grid; gap: .6rem; margin-top: 1.7rem; }
.mobiliza-primary, .mobiliza-secondary { min-height: 3.1rem; border: 1px solid currentColor; border-radius: .25rem; padding: .75rem 1rem; font-size: .78rem; font-weight: 700; }
.mobiliza-primary { background: #b94335; color: #fff; border-color: #b94335; }
.mobiliza-secondary { background: transparent; color: inherit; border-color: rgba(255,255,255,.45); }
.mobiliza-photo { margin: 2.5rem 0 0; }
.mobiliza-photo img { width: 100%; max-height: 37rem; display: block; object-fit: cover; object-position: 50% 22%; filter: saturate(.78) contrast(1.04); }
.mobiliza-photo figcaption { display: flex; justify-content: space-between; gap: 1rem; border-top: .35rem solid #b94335; background: #f0eee7; color: #1d2333; padding: .8rem; }
.mobiliza-photo figcaption strong { font-family: var(--font-serif); }
.mobiliza-photo figcaption span { color: #6e727a; font-size: .62rem; }
.mobiliza-cities { display: flex; gap: .9rem 1.5rem; flex-wrap: wrap; margin-top: 2.5rem; border-block: 1px solid rgba(255,255,255,.25); padding-block: 1rem; }
.mobiliza-cities span { width: 100%; color: #e5bd58; font-size: .6rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.mobiliza-cities strong { font-size: .7rem; }

.mobiliza-causes { background: #fbfaf5; }
.cause-list { margin-top: 3rem; border-top: 2px solid #1d2333; }
.cause-list article { display: grid; grid-template-columns: 2rem 1fr; gap: .5rem 1rem; border-bottom: 1px solid var(--rule); padding: 1.3rem 0; }
.cause-list article > span { grid-row: 1 / 4; color: #b94335; font-size: .68rem; font-weight: 700; }
.cause-list h3 { margin: 0; font-family: var(--font-serif); font-size: 1.55rem; line-height: 1.05; }
.cause-list p { margin: .35rem 0 0; color: #656a73; font-size: .8rem; line-height: 1.55; }
.cause-list .ui-link { width: fit-content; min-height: 2.2rem; margin-top: .35rem; padding: 0; }
.mobiliza-quote { background: #a7352b; color: #fff; }
.mobiliza-quote__grid { display: grid; gap: 2.5rem; }
.mobiliza-quote blockquote { margin: 0; font-family: var(--font-serif); font-size: clamp(2.4rem, 8vw, 5rem); line-height: .98; letter-spacing: -.04em; }
.mobiliza-quote__grid > div { border-top: 1px solid rgba(255,255,255,.35); padding-top: 1rem; }
.mobiliza-quote__grid p { margin: 0; font-size: .78rem; font-weight: 700; }
.mobiliza-quote__grid span { display: block; margin: .5rem 0 1.5rem; color: rgba(255,255,255,.65); font-size: .75rem; line-height: 1.5; }

.mobiliza-agenda ol { margin: 2.7rem 0 0; padding: 0; list-style: none; border-top: 2px solid #1d2333; }
.mobiliza-agenda li { display: grid; grid-template-columns: 3.25rem 1fr auto; gap: 1rem; align-items: center; border-bottom: 1px solid var(--rule); padding: 1rem 0; }
.mobiliza-agenda time { color: #a7352b; font-size: .55rem; text-align: center; }
.mobiliza-agenda time strong { display: block; font-family: var(--font-serif); font-size: 1.5rem; }
.mobiliza-agenda li div span { color: #6b6f77; font-size: .58rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; }
.mobiliza-agenda h3 { margin: .25rem 0; font-family: var(--font-serif); font-size: 1.08rem; }
.mobiliza-agenda li p { margin: 0; color: #6c7078; font-size: .65rem; }
.mobiliza-action { border-top: 1px solid var(--rule); background: #e3d9c4; padding-block: var(--section-space); }
.mobiliza-action__grid { display: grid; gap: 2rem; }
.mobiliza-action h2 { margin: .8rem 0 0; font-family: var(--font-serif); font-size: clamp(2.8rem, 9vw, 5rem); line-height: 1; }
.mobiliza-action p:last-child { max-width: 34rem; color: #60636a; line-height: 1.6; }
.mobiliza-action__grid > div:last-child { display: grid; gap: .6rem; }
.mobiliza-action .mobiliza-secondary { color: #1d2333; border-color: #74736f; }
.mobiliza-footer { padding-block: 1.5rem; background: #1d2333; color: rgba(255,255,255,.55); }
.mobiliza-footer .app-container { display: flex; flex-direction: column; gap: .3rem; font-size: .65rem; }
.mobiliza-footer strong { color: #fff; }

.mobiliza-dialog__header { display: grid; grid-template-columns: 1fr auto; gap: 1rem; background: #1d2333; color: #fff; padding: 1rem 1.25rem; }
.mobiliza-dialog__header span { color: #e2bd62; font-size: .58rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.mobiliza-dialog__header h3 { margin: .25rem 0 0; font-family: var(--font-serif); font-size: 1.55rem; }
.mobiliza-dialog__header button { width: 2.75rem; height: 2.75rem; border: 0; background: transparent; color: #fff; font-size: 1.5rem; }
.mobiliza-dialog__header > div:last-child { grid-column: 1 / -1; display: flex; gap: .35rem; }
.mobiliza-dialog__header i { height: .2rem; flex: 1; background: rgba(255,255,255,.2); }
.mobiliza-dialog__header i.active { background: #d9b65e; }
.form-question { margin: 0 0 1rem; font-weight: 700; }
.form-question--spaced { margin-top: 1.5rem; }
.privacy-note { color: #6b706b; font-size: .66rem; line-height: 1.5; }
.interest-list { display: flex; flex-wrap: wrap; gap: .45rem; }
.interest-list button { min-height: 2.75rem; border: 1px solid #cbc7be; border-radius: 999px; background: #fff; padding: .5rem .85rem; font-size: .7rem; font-weight: 700; }
.interest-list button.selected { border-color: #a7352b; background: #f6e5df; color: #8f2f27; }
.join-success { padding-block: 1rem; text-align: center; }
.join-success > span { width: 3rem; height: 3rem; display: grid; place-items: center; margin: auto; border: 1px solid #a7352b; color: #a7352b; }
.join-success h3 { margin: 1rem 0 .5rem; font-family: var(--font-serif); font-size: 1.8rem; }
.join-success p, .story-copy { color: #666b65; line-height: 1.6; }
.story-title { margin: .8rem 0 0; font-family: var(--font-serif); font-size: 2rem; }

@media (min-width: 40rem) { .mobiliza-nav a { display: inline; } .mobiliza-hero__actions { display: flex; } .mobiliza-action__grid > div:last-child { display: flex; } .mobiliza-footer .app-container { flex-direction: row; justify-content: space-between; } }
@media (min-width: 48rem) {
  .mobiliza-hero { display: grid; grid-template-columns: 1fr minmax(20rem, .72fr); gap: clamp(2rem, 6vw, 5rem); align-items: center; }
  .mobiliza-hero__copy h1 { font-size: clamp(3.7rem, 6.8vw, 6.5rem); }
  .mobiliza-photo { margin: 0; }
  .mobiliza-cities { grid-column: 1 / -1; }
  .cause-list { display: grid; grid-template-columns: repeat(3, 1fr); }
  .cause-list article { display: block; border-right: 1px solid var(--rule); padding: 1.5rem; }
  .cause-list article:last-child { border-right: 0; }
  .cause-list h3 { margin-top: 2.8rem; }
  .mobiliza-quote__grid { grid-template-columns: 1fr .55fr; align-items: end; }
  .mobiliza-action__grid { grid-template-columns: 1fr auto; align-items: end; }
}
</style>
