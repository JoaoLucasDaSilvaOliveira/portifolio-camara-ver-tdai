import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import PortfolioView from './views/PortfolioView.vue'
import GabineteView from './views/GabineteView.vue'
import RadarView from './views/RadarView.vue'
import MobilizaView from './views/MobilizaView.vue'
import DashboardView from './views/DashboardView.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: async (to, _from, savedPosition) => {
    if (savedPosition) return savedPosition
    if (to.hash) {
      await nextTick()
      await new Promise((resolve) => setTimeout(resolve, 50))
      return { el: to.hash, top: 12 }
    }
    return { top: 0 }
  },
  routes: [
    { path: '/', component: PortfolioView },
    { path: '/gabinete-aberto', component: GabineteView },
    { path: '/radar-do-bairro', component: RadarView },
    { path: '/mobiliza-litoral', component: MobilizaView },
    { path: '/mapa-de-atuacao', component: DashboardView },
  ],
})
