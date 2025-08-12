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
    await run(function* () {
      const serverEntry = yield* call(() => {
        return server.ssrLoadModule(opts.entry, { fixStacktrace: true });
      });

      try {
        const app = yield* serverEntry.default;

        app(req, res, (err) => {
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
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        }
      }

      yield* suspend();
    });
  };

  server.middlewares.use(handle);
}
