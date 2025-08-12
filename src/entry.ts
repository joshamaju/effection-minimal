import bodyParser from "body-parser";
import compression from "compression";
import express, { Router, type Handler } from "express";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";

import { all, resource, useScope } from "effection";
import logger from "morgan";

import { engine, View } from "@stack54/express/view";

import { errorHandler } from "./error";
import { create_handler } from "./utils/handler";
import { resolver } from "./utils/view";

import * as home from "./controllers/home/home";

export default resource(function* (provide) {
  const scope = yield* useScope();

  const run = create_handler(scope);

  const app = express();

  app.engine("svelte", engine);
  app.set("view engine", "svelte");
  app.set("view", View({ resolve: resolver }));

  app.use(logger("dev"));

  app.use(compression());

  app.use(methodOverride());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // parse application/json
  app.use(bodyParser.json());

  app.use(flash());

  app.get("/", run(home.index));

  app.use(errorHandler);

  app.use(function (_, res) {
    res.status(404).render("404");
  });

  yield* provide(app);
});
