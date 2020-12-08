import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import CustomLogoIconWhite from "@/components/CustomLogoIconWhite";
import CustomLogoIconRed from "@/components/CustomLogoIconRed";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                background: '#091F43', // blue
                primary: '#091F43', // blue
                secondary: '#992930', // red
                accent: '#DB0000', // red for error alerts
                accent1: '#367C3C', // green for success alerts
                accent2: '#D1515A', // red for icons
                accent3: '#1959B8',  // for like buttons
                accent4: '#CE464F', // for comment buttons
                accent5: '#9A6A28' // for edit buttons
            },
        },
    },
    icons: {
        values: {
            whiteLogo: {
                component: CustomLogoIconWhite
            },
            redLogo: {
                component: CustomLogoIconRed
            }
        }
    }
});
