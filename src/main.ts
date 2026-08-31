import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import {
  VApp,
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VDialog,
  VIcon,
  VRadio,
  VRadioGroup,
  VSelect,
  VSnackbar,
  VSpacer,
  VTextarea,
  VTextField,
} from 'vuetify/components'
import { Ripple } from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './styles.css'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components: {
    VApp,
    VBtn,
    VCard,
    VCardActions,
    VCardText,
    VDialog,
    VIcon,
    VRadio,
    VRadioGroup,
    VSelect,
    VSnackbar,
    VSpacer,
    VTextarea,
    VTextField,
  },
  directives: { Ripple },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  defaults: {
    VBtn: { rounded: 'lg', elevation: 0 },
    VCard: { rounded: 'xl', elevation: 0 },
    VTextField: { variant: 'outlined', density: 'comfortable', color: 'primary' },
    VTextarea: { variant: 'outlined', density: 'comfortable', color: 'primary' },
    VSelect: { variant: 'outlined', density: 'comfortable', color: 'primary' },
  },
  theme: {
    defaultTheme: 'farol',
    themes: {
      farol: {
        dark: false,
        colors: {
          primary: '#0f766e',
          secondary: '#d97706',
          surface: '#ffffff',
          background: '#f7f8f3',
        },
      },
    },
  },
})

createApp(App).use(router).use(vuetify).mount('#app')
