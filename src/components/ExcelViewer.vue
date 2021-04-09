<template>
  <v-container class="">
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <UploadFileInput
              :accepted-filetypes="`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel, .xls`"
              :filesize-limit="1"
              @onUpload="handleUpload"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TablePreview :tableData="tableData" />
        <v-btn
          block
          :disabled="!tableData.title"
          :loading="loadingToServer"
          color="primary"
          @click="uploadToServer"
        >
          {{ uploadBtnText }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UploadFileInput from "./UploadFileInput";
import TablePreview from "./TablePreview";
import config from "../config";

export default {
  name: "ExcelViewer",
  components: {
    TablePreview,
    UploadFileInput,
  },
  data() {
    return {
      tableData: {
        title: null,
        rows: null,
      },
      loadingToServer: false,
      uploadBtnText: "Отправить данные на сервер",
    };
  },
  methods: {
    /**
     * Upload handler
     * @param objects {array} - array of table objects(rows)
     * @param filename {string} - table file name with file extension
     */
    handleUpload({ objects, filename }) {
      this.tableData.title = filename;
      this.tableData.rows = objects;
    },
    /**
     *  Upload rows array to server and wait for answer. If asnwer 200(success) - pass this array to parent component
     *  through $emit('done')
     * @returns {Promise<void>}
     */
    async uploadToServer() {
      this.loadingToServer = true;
      await fetch(config.serverURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: config.serverAuthorization,
        },
        body: JSON.stringify({ resultArray: this.tableData.rows }),
      }).then((response) => {
        this.loadingToServer = false;
        if (response.status === 200) {
          this.$emit("done", JSON.stringify(this.tableData.rows));
        }
      });
    },
  },
};
</script>

<style scoped></style>
