import axios from 'axios'
import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    experimentalModifyObstructiveThirdPartyCode: true,
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      on('task', {
        async serverCleanup() {
          await axios.post('http://localhost:3000/api/test/server')
        },
      })
    },

  },
});



