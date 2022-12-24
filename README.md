# Quasar App (todomenubar) (Mac Only Docs for now)

A Todo Menubar App created usgin Quasar Framework, Vue3, Typescript, Electron.

## Install the dependencies
```bash
yarn
# or
npm install
```

### Setup Pocketbase
Download your OS specific .zip from https://pocketbase.io/docs/

Once you've downloaded and extracted the archive, copy the pb_data folder into the extracted directory and then start the application by running the following console command in the extracted directory: ./pocketbase serve.

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev -m electron
```


### Build the app for production
```bash
quasar build -m eletron
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
