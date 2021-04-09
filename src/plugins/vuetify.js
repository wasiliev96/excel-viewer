import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import uk from "vuetify/lib/locale/uk";
import ru from "vuetify/lib/locale/ru";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#46bae3",
        secondary: "#424242",
        // accent: "#82B1FF",
        // error: "#E0FFFF",
        info: "#E0FFFF",
        success: "#ADD6E5",
        // warning: "#E0FFFF",
      },
      dark: {
        primary: "#1f6882",
        secondary: "#424242",
        // accent: "#f9ed69",
        // error: "#b83b5e",
        info: "#9eb6b6",
        success: "#608484",
        // warning: "#f08a5d",
      },
    },
  },
  lang: {
    locales: { uk, ru },
    current: "ru",
  },
});
