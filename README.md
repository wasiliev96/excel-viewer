# excel-viewer

## Usage

* Upload excel table by clicking on input field or drag'n'drop file on it.
* Follow instructions placeholder
* View table
* Press button to table objects to server
* You`re great!
## Tips
>> You can toggle night theme here!

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Structure guide
> Server variables stores at `./config/index.js`

> Main component: `./components/ExcelViewer.vue`

> For simplify development used [Vuetify](https://vuetifyjs.com/)

> By requirements used [SheetJS](https://www.npmjs.com/package/xlsx)

## Config
* Configure accepted file extentions by editing `:accepted-filetypes` in `UploadFileInput` component call in main file.
* Configure accepted file size by editing `:filesize-limit` in `UploadFileInput` component call in main file. Gets value in MB!
* Set a custom default placeholder by editing `:placeholder` in `UploadFileInput` component call in main file. 
* Error and success status placeholder are hardcoded inside `./components/UploadFileInput.vue`.
* Colors are nested from theme values, edit  `./plugins/vuetify.js` for change.
