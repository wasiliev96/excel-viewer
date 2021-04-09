<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer />
      <v-app-bar-title>Excel Viewer</v-app-bar-title>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="darkMode">
            <v-icon v-if="!$vuetify.theme.dark">mdi-white-balance-sunny</v-icon>
            <v-icon v-else>mdi-moon-waxing-crescent</v-icon>
          </v-btn>
        </template>
        <span>Dark Mode {{ $vuetify.theme.dark ? "Off" : "On" }}</span>
      </v-tooltip>
    </v-app-bar>

    <v-main>
      <ExcelViewer />
    </v-main>
  </v-app>
</template>

<script>
import ExcelViewer from "./components/ExcelViewer";

export default {
  name: "App",
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  components: {
    ExcelViewer,
  },
};
</script>
