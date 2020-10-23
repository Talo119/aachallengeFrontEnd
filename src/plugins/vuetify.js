import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#F44336',
        secondary: '#795548',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#FF5252',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
