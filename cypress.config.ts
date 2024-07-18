import { useEdgeStore } from "./src/lib/edgestore"
import prisma from "./src/lib/prisma"

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalModifyObstructiveThirdPartyCode: true,

    setupNodeEvents(on, config) {
      on('task', {
        async serverCleanup() {
          const { edgestore } = useEdgeStore()
          const server = await prisma.server.findFirst({
            where: {
              serverName: 'mocked-server',
            },
          });

          // don't know how to run this in cypress env

          // edgestore.publicFiles.delete({
          //   url: server?.serverImage!
          // })
        },
      })
    },

  },
});



