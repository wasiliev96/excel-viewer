<template>
  <v-container>
    <caption class="secondary white--text pa-2 d-block">
      {{
        tableData.title
      }}
    </caption>
    <v-data-table
      fixed-header
      multi-sort
      dense
      :headers="table.headers"
      :items="table.rows"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-text-field
          clearable
          v-model="search"
          label="Поиск"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "TablePreview",
  props: {
    tableData: {
      required: false,
      default: {
        title: "",
        rows: [],
      },
    },
  },
  components: {},
  data() {
    return {
      search: "",
    };
  },
  computed: {
    /**
     * Generate table data object
     * @returns {{headers: *[], title, rows: *[]}}
     */
    table() {
      /**
       * Generated data for table view
       * @type {{headers: *[], title, rows: *[]}}
       */
      const table = {
        title: this.tableData.title,
        headers: [],
        rows: [],
      };
      if (this.tableData.rows?.length > 0) {
        /**
         *  Fill table headers by first item keys (suppose that keys are required and equal in all objects)
         */
        for (const item in this.tableData.rows[0]) {
          table.headers.push({
            text: `${item}`,
            align: "start",
            sortable: true,
            value: item,
          });
        }
        table.rows = this.tableData.rows;
      }
      return table;
    },
  },
};
</script>

<style scoped></style>
