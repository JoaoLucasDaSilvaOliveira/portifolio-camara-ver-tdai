<script setup lang="ts">
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'
import SectionIntro from '../components/SectionIntro.vue'

interface Product {
  index: string
  title: string
  kind: string
  description: string
  outcome: string
  route: string
}

const menuOpen = ref(false)
const qrValue = 'https://portifolio-camara-ver-tdai.vercel.app/'
const contactUrl = 'https://wa.me/5551991620409'

const products: Product[] = [
  { index: '01', title: 'Gabinete Aberto', kind: 'Portal de mandato', description: 'Entregas, projetos e agenda pública reunidos em um endereço que o cidadão entende.', outcome: 'Presença e transparência', route: '/gabinete-aberto' },
  { index: '02', title: 'Radar do Bairro', kind: 'Escuta cidadã', description: 'Um fluxo curto para registrar, encaminhar e acompanhar demandas da cidade.', outcome: 'Organização de atendimento', route: '/radar-do-bairro' },
  { index: '03', title: 'Mobiliza Litoral', kind: 'Campanha digital', description: 'Propostas, agenda e participação voluntária em uma experiência pronta para o celular.', outcome: 'Mobilização responsável', route: '/mobiliza-litoral' },
  { index: '04', title: 'Mapa de Atuação', kind: 'Painel territorial', description: 'Dados operacionais agregados para a equipe enxergar volume, ritmo e prioridades.', outcome: 'Decisão baseada em dados', route: '/mapa-de-atuacao' },
]
</script>

<template>
  <main class="portfolio">
    <header class="portfolio-nav">
      <div class="app-container portfolio-nav__inner">
        <router-link :to="{ hash: '#inicio' }" class="portfolio-brand"><span class="portfolio-brand__mark">F.</span><span>Farol Digital<small>Produtos para mandato e campanha</small></span></router-link>
        <button class="portfolio-nav__toggle" type="button" :aria-expanded="menuOpen" aria-label="Abrir menu" @click="menuOpen=!menuOpen">{{ menuOpen ? 'Fechar' : 'Menu' }}</button>
        <nav class="portfolio-nav__links" :class="{ 'is-open': menuOpen }">
          <router-link :to="{ hash: '#projetos' }" @click="menuOpen=false">Projetos</router-link>
          <router-link :to="{ hash: '#processo' }" @click="menuOpen=false">Processo</router-link>
          <router-link :to="{ hash: '#contato' }" @click="menuOpen=false">Contato</router-link>
        </nav>
      </div>
    </header>

    <section id="inicio" class="portfolio-hero app-container">
      <div class="portfolio-hero__copy">
        <p class="type-kicker">Tecnologia política sem espetáculo</p>
        <h1 class="type-display">Produtos digitais para mandato e campanha.</h1>
        <p class="type-body">Sites e ferramentas que ajudam equipes públicas a mostrar trabalho, organizar demandas e conversar com a comunidade.</p>
        <div class="portfolio-hero__actions">
          <router-link :to="{ hash: '#projetos' }" class="ui-button ui-button--ink">Conhecer os projetos <span aria-hidden="true">↓</span></router-link>
          <a class="ui-button ui-button--paper" :href="contactUrl" target="_blank" rel="noopener noreferrer">Conversar sobre uma ideia</a>
        </div>
      </div>

      <figure class="portfolio-hero__figure">
        <img src="/assets/helena-duarte.webp" alt="Retrato de uma personagem política fictícia no litoral" />
        <figcaption><span>Imagem demonstrativa</span><strong>Comunicação com contexto local, não template genérico.</strong></figcaption>
      </figure>

      <dl class="portfolio-hero__facts">
        <div><dt>01</dt><dd>Celular primeiro</dd></div>
        <div><dt>02</dt><dd>Conteúdo claro</dd></div>
        <div><dt>03</dt><dd>Entrega enxuta</dd></div>
      </dl>
    </section>

    <section id="projetos" class="portfolio-projects section-block">
      <div class="app-container">
        <SectionIntro kicker="Portfólio demonstrativo" title="Quatro produtos. Quatro problemas concretos." description="Cada projeto abaixo é navegável e foi pensado para uma situação de trabalho diferente." />
        <div class="portfolio-projects__list">
          <router-link v-for="product in products" :key="product.route" :to="product.route" v-reveal class="project-row">
            <span class="project-row__index">{{ product.index }}</span>
            <div class="project-row__main"><span>{{ product.kind }}</span><h3>{{ product.title }}</h3></div>
            <p>{{ product.description }}</p>
            <strong>{{ product.outcome }}</strong>
            <span class="project-row__arrow" aria-hidden="true">↗</span>
          </router-link>
        </div>
      </div>
    </section>

    <section id="processo" class="portfolio-process section-block">
      <div class="app-container portfolio-process__grid">
        <SectionIntro kicker="Forma de trabalho" title="Um processo curto e visível." description="Sem meses de descoberta e sem surpresa na entrega. Escopo, conteúdo e publicação cabem em etapas objetivas." inverse />
        <ol class="process-list">
          <li v-reveal><span>01</span><div><strong>Diagnóstico</strong><p>Problema, público, conteúdo disponível e objetivo mensurável.</p></div></li>
          <li v-reveal="70"><span>02</span><div><strong>Protótipo</strong><p>Uma primeira versão navegável para decidir com algo concreto na tela.</p></div></li>
          <li v-reveal="140"><span>03</span><div><strong>Publicação</strong><p>Ajustes, domínio, testes no celular e entrega dos acessos.</p></div></li>
        </ol>
      </div>
    </section>

    <section id="contato" class="portfolio-contact section-block">
      <div class="app-container portfolio-contact__grid">
        <div v-reveal>
          <p class="type-kicker">Próximo passo</p>
          <h2 class="type-display">Qual problema sua equipe precisa resolver agora?</h2>
          <p class="type-body">Em vinte minutos dá para escolher um ponto de partida, fechar o escopo inicial e definir prazo.</p>
          <a class="ui-button ui-button--ink" :href="contactUrl" target="_blank" rel="noopener noreferrer">Abrir conversa</a>
        </div>
        <div v-reveal="120" class="portfolio-contact__qr">
          <qrcode-vue :value="qrValue" :size="132" level="M" />
          <span>Abra este portfólio no celular</span>
        </div>
      </div>
    </section>

    <footer class="portfolio-footer"><div class="app-container"><strong>Farol Digital</strong><span>Tramandaí · RS</span><span>Todos os projetos e dados são demonstrativos.</span></div></footer>
  </main>
</template>

<style scoped>
.portfolio { --paper: #f2efe6; --surface: #faf8f2; --rule: #c9c4b9; min-height: 100vh; overflow: hidden; background: var(--paper); color: #191b18; }
.portfolio-nav { border-bottom: 1px solid var(--rule); }
.portfolio-nav__inner { min-height: 4.5rem; display: grid; grid-template-columns: 1fr auto; align-items: center; }
.portfolio-brand { display: inline-flex; align-items: center; gap: 0.7rem; font-size: 0.82rem; font-weight: 700; text-decoration: none; }
.portfolio-brand__mark { width: 2.25rem; height: 2.25rem; display: grid; place-items: center; background: #1e4c3e; color: #fff; font-family: var(--font-serif); font-size: 1rem; }
.portfolio-brand small { display: block; margin-top: 0.18rem; color: #73776f; font-size: 0.58rem; font-weight: 400; }
.portfolio-nav__toggle { min-height: 2.75rem; border: 0; background: none; font-size: 0.76rem; font-weight: 700; }
.portfolio-nav__links { grid-column: 1 / -1; display: none; border-top: 1px solid var(--rule); padding-block: 0.45rem; }
.portfolio-nav__links.is-open { display: grid; }
.portfolio-nav__links a { min-height: 2.75rem; display: flex; align-items: center; font-size: 0.8rem; font-weight: 700; text-decoration: none; }

.portfolio-hero { padding-block: clamp(3.25rem, 8vw, 6rem); }
.portfolio-hero__copy h1 { max-width: 10ch; margin: 1.15rem 0 0; font-size: clamp(3rem, 13vw, 6.8rem); }
.portfolio-hero__copy .type-body { max-width: 38rem; margin: 1.5rem 0 0; }
.portfolio-hero__actions { display: grid; gap: 0.65rem; margin-top: 1.75rem; }
.portfolio-hero__figure { margin: 3rem 0 0; }
.portfolio-hero__figure img { width: 100%; aspect-ratio: 4 / 3; display: block; object-fit: cover; object-position: 50% 25%; filter: saturate(.82) contrast(1.03); }
.portfolio-hero__figure figcaption { display: grid; gap: 0.35rem; border-bottom: 1px solid var(--rule); padding: 0.8rem 0; font-size: 0.7rem; }
.portfolio-hero__figure figcaption span { color: #777a73; text-transform: uppercase; letter-spacing: .08em; }
.portfolio-hero__facts { display: grid; grid-template-columns: repeat(3, 1fr); margin: 2.4rem 0 0; border-block: 1px solid var(--rule); }
.portfolio-hero__facts div { padding: 1rem .55rem; border-right: 1px solid var(--rule); }
.portfolio-hero__facts div:last-child { border-right: 0; }
.portfolio-hero__facts dt { margin-bottom: .45rem; color: #b34831; font-size: .65rem; font-weight: 700; }
.portfolio-hero__facts dd { margin: 0; font-size: .7rem; line-height: 1.4; }

.portfolio-projects { border-top: 1px solid var(--rule); background: #faf8f2; }
.portfolio-projects__list { margin-top: 3rem; border-top: 2px solid #1b1d1a; }
.project-row { position: relative; display: grid; grid-template-columns: 2rem 1fr; gap: .35rem 1rem; border-bottom: 1px solid var(--rule); padding: 1.25rem 2.5rem 1.25rem 0; text-decoration: none; transition: background 160ms ease; }
.project-row:hover { background: #efebe1; }
.project-row__index { grid-row: 1 / 4; padding-top: .2rem; color: #b34831; font-size: .68rem; font-weight: 700; }
.project-row__main span { color: #71756e; font-size: .63rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; }
.project-row__main h3 { margin: .3rem 0 0; font-family: var(--font-serif); font-size: 1.65rem; line-height: 1.05; }
.project-row p { margin: .55rem 0 0; color: #62665f; font-size: .82rem; line-height: 1.55; }
.project-row strong { margin-top: .6rem; font-size: .7rem; }
.project-row__arrow { position: absolute; right: .2rem; top: 1.45rem; font-size: 1.25rem; }

.portfolio-process { background: #1d4a3c; color: #fff; }
.portfolio-process__grid { display: grid; gap: 3rem; }
.process-list { margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(255,255,255,.35); }
.process-list li { display: grid; grid-template-columns: 2rem 1fr; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,.25); padding: 1.3rem 0; }
.process-list li > span { color: #f0c75c; font-size: .68rem; font-weight: 700; }
.process-list strong { font-family: var(--font-serif); font-size: 1.35rem; }
.process-list p { margin: .35rem 0 0; color: rgba(255,255,255,.63); font-size: .82rem; line-height: 1.55; }

.portfolio-contact__grid { display: grid; gap: 2.5rem; }
.portfolio-contact h2 { max-width: 12ch; margin: 1rem 0 0; font-size: clamp(2.7rem, 10vw, 5.8rem); }
.portfolio-contact .type-body { max-width: 39rem; margin: 1.4rem 0 1.7rem; }
.portfolio-contact__qr { width: fit-content; display: none; border: 1px solid var(--rule); padding: 1rem; }
.portfolio-contact__qr span { max-width: 9rem; display: block; margin-top: .7rem; color: #62665f; font-size: .65rem; line-height: 1.35; }
.portfolio-footer { border-top: 1px solid var(--rule); padding-block: 1.5rem; }
.portfolio-footer .app-container { display: flex; flex-direction: column; gap: .35rem; color: #676b64; font-size: .68rem; }
.portfolio-footer strong { color: #1b1d1a; }

@media (min-width: 40rem) { .portfolio-hero__actions { display: flex; } }
@media (min-width: 48rem) {
  .portfolio-nav__inner { grid-template-columns: 1fr auto; }
  .portfolio-nav__toggle { display: none; }
  .portfolio-nav__links { grid-column: auto; display: flex; gap: 2rem; border: 0; padding: 0; }
  .portfolio-hero { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(18rem, .75fr); column-gap: clamp(2rem, 6vw, 6rem); align-items: end; }
  .portfolio-hero__copy h1 { font-size: clamp(4rem, 7.3vw, 6.8rem); }
  .portfolio-hero__copy { align-self: center; }
  .portfolio-hero__figure { margin: 0; }
  .portfolio-hero__figure img { aspect-ratio: 3 / 4; }
  .portfolio-hero__facts { grid-column: 1 / -1; }
  .portfolio-hero__facts div { padding: 1.15rem 1rem; }
  .portfolio-hero__facts dd { font-size: .78rem; }
  .project-row { grid-template-columns: 2.5rem minmax(12rem, .7fr) 1fr minmax(10rem, .55fr) 1.5rem; align-items: center; gap: 1.25rem; padding: 1.5rem 0; }
  .project-row__index { grid-row: auto; }
  .project-row p, .project-row strong { margin: 0; }
  .project-row__arrow { position: static; }
  .portfolio-process__grid { grid-template-columns: .9fr 1fr; align-items: start; }
  .portfolio-contact__grid { grid-template-columns: 1fr auto; align-items: center; }
  .portfolio-contact__qr { display: block; }
  .portfolio-footer .app-container { flex-direction: row; justify-content: space-between; }
}
</style>
