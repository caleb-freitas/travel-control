import express from "express";

import middlewareSetup from "./middleware";
import routesSetup from "./routes";

const app = express();

middlewareSetup(app);
routesSetup(app);

export default app;
