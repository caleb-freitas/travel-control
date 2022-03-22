import express from "express";

import middlewareSetup from "./middleware";
import routesSetup from "./routes";
import swaggerSetup from "./swagger";

const app = express();

swaggerSetup(app);
middlewareSetup(app);
routesSetup(app);

export default app;
