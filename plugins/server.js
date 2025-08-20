import { call, run, suspend } from "effection";

/**
 *
 * @returns {import('stack54/config').Integration}
 */
export default function plugin() {
  /** @type {import('stack54/config').ResolvedConfig} */
  let config;

  return {
    name: "@stack54/express",
    configResolved(conf) {
      config = conf;
    },
    configureServer(server) {
      return () => devServer(server, { entry: config.entry });
    },
  };
}

/**
 *
 * @param {import('vite').ViteDevServer} server
 * @param {{ entry: string }} opts
 */
function devServer(server, opts) {
  /** @type {import('vite').Connect.NextHandleFunction} */
  const handle = async (req, res, next) => {
    // try {
      await run(function* () {
        const serverEntry = yield* call(() => {
          return server.ssrLoadModule(opts.entry, { fixStacktrace: true });
        });

        try {
          const app = yield* serverEntry.default;

          app(req, res, (err) => {
            console.log('next error', err);

            if (err) {
              if (!res.headersSent) {
                res.statusCode = 500;
                res.end("Internal Server Error");
              }
            } else {
              next();
            }
          });
        } catch (e) {
          console.log('app error', e);

          if (!res.headersSent) {
            res.statusCode = 500;
            res.end("Internal Server Error");
          }
        }

        yield* suspend();
      });
    // } catch (error) {
    //   console.log('server plugin', error)
    // }
  };

  server.middlewares.use(handle);
  // try {
  // } catch (error) {
  //   console.log('server stack', error)
  // }
}
