import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                background: '#091F43', // blue
                primary: '#091F43', // blue
                secondary: '#992930', // red
            },
        },
    },
});
