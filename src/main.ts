import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import flash from "express-flash";
import methodOverride from "method-override";

import { useScope } from "effection";
import logger from "morgan";

import { engine, View } from "@stack54/express/view";

import { errorHandler } from "./error";
import { create_handler } from "./utils/handler";
import { resolver } from "./utils/view";

import * as home from "./controllers/home/home";

export default function* () {
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

    return app
};
