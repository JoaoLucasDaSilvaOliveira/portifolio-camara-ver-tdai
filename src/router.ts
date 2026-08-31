import { createRouter, createWebHistory } from 'vue-router'
import PortfolioView from './views/PortfolioView.vue'
import GabineteView from './views/GabineteView.vue'
import RadarView from './views/RadarView.vue'
import MobilizaView from './views/MobilizaView.vue'
import DashboardView from './views/DashboardView.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
  routes: [
    { path: '/', component: PortfolioView },
    { path: '/gabinete-aberto', component: GabineteView },
    { path: '/radar-do-bairro', component: RadarView },
    { path: '/mobiliza-litoral', component: MobilizaView },
    { path: '/mapa-de-atuacao', component: DashboardView },
  ],
})
