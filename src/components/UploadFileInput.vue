<template>
  <v-container :class="uploadBanner.classes">
    <v-card flat class="transparent">
      <v-sheet
        class="drop-area pa-6 pointer file-upload bg-transparent border-dashed"
        @drop.prevent="handleDrop"
        @dragover.prevent
        @click="$refs.upload.click()"
      >
        <input
          ref="upload"
          type="file"
          @change="handleInput"
          v-show="false"
          :accept="acceptedFiletypes"
          class="transparent"
        />
        <v-sheet class="text-center transparent">
          {{ uploadBanner.message }}
        </v-sheet>
      </v-sheet>
    </v-card>

    <!--    <VMessages :value="errorBucket" color="error" />-->
  </v-container>
</template>

<script>
import xlsx from "xlsx";

const UPLOAD_CLASSES = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};
export default {
  name: "UploadFileInput",
  props: {
    placeholder: {
      required: false,
      type: String,
      default: "Перетащите сюда файл или нажмите чтобы выбрать",
    },
    acceptedFiletypes: {
      required: false,
      type: String,
      default:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel, .xls",
    },
    filesizeLimit: {
      required: false,
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      files: [],
      json: null,
      filesizeLimitMB: 0,
      uploadBanner: {
        classes: UPLOAD_CLASSES.INFO,
        message: "",
      },
    };
  },
  mounted() {
    this.uploadBanner.message = this.placeholder;
    this.uploadBanner.classes = UPLOAD_CLASSES.SUCCESS;
    this.filesizeLimitMB = this.filesizeLimit;
  },
  //todo: external logic in separate files
  methods: {
    /**
     * Handle user drop file. Gets file from event and pass to handleFiles()
     * @param e {Event} - default user event
     */
    handleDrop(e) {
      let files = e.dataTransfer.files;
      this.handleFiles(files);
    },
    /**
     * Handle user click on input field. Gets file from event and pass to handleFiles()
     * @param e {Event}
     */
    handleInput(e) {
      let files = e.target.files;
      this.handleFiles(files);
    },
    /**
     * If uploaded file is valid -  pass it to
     * emitFileObjsArray(). Set appropriate to file status component placeholder.
     * @param files {array} - user input files array
     * @returns {Promise<void>}
     */
    async handleFiles(files) {
      this.reset();
      if (files.length > 0) {
        this.files = files;
        if (this.validateFile(files[0])) {
          this.emitFileObjsArray(files[0]);

          this.setFileInputPlaceholder("success", `Файл - "${files[0].name}"`);
        }
      }
    },
    /**
     * Checks if file is valid
     * @param file {File}
     * @returns {boolean}
     */
    validateFile(file) {
      return this.validateFileExt(file) && this.validateFileSize(file);
    },

    /**
     * Checks if file extention is allowed
     * @param file {File}
     * @returns {boolean}
     */
    validateFileExt(file) {
      if (!this.acceptedFiletypes.includes(file.type)) {
        this.setFileInputPlaceholder(
          UPLOAD_CLASSES.INFO,
          `Недопустимый тип файла "${file.type}", выберите другой файл`
        );
        return false;
      }
      return true;
    },
    /**
     * Checks if file size allowed
     * @param file {File}
     * @returns {boolean}
     */
    validateFileSize(file) {
      if (this.getMBFromBytes(file.size) > this.filesizeLimitMB) {
        const FILESIZE_MB = this.filesizeLimitMB;
        this.setFileInputPlaceholder(
          UPLOAD_CLASSES.INFO,
          `Допустимый размер файла ${FILESIZE_MB}MB, выберите другой файл`
        );
        return false;
      }
      return true;
    },
    /**
     * Set`s component placeholder
     * @param classes {string} - status classes(error,success,warning etc.)
     * @param message {string} Placeholder text
     */
    setFileInputPlaceholder(classes, message) {
      this.uploadBanner.message = message;
      this.uploadBanner.classes = classes;
    },
    /**
     * Transform bytes to Megabytes :0
     * @param bytes
     * @returns {number} - MB quantity (not floored!)
     */
    getMBFromBytes(bytes) {
      return bytes / 1024 / 1024;
    },
    /**
     * Creates objects array from file and send it to parent component by $emit('onUpload')
     * @param file {File}
     */
    emitFileObjsArray(file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        const wb = xlsx.read(fileData, { type: "binary" });

        const excelObjects = xlsx.utils.sheet_to_row_object_array(
          wb.Sheets[wb.SheetNames[0]]
        );
        this.$emit("onUpload", { objects: excelObjects, filename: file.name });
      };
      reader.onerror = (error) => {
        console.error(error);
      };
      return reader.readAsBinaryString(file);
    },
    /**
     * Reset uploaded data and table data
     */
    reset() {
      this.files = [];
      this.json = null;
    },
  },
};
</script>

<style scoped>
.border-dashed {
  border: 2px dashed var(--v-secondary-lighten1) !important;
}

.bg-transparent {
  background: transparent !important;
}
</style>
