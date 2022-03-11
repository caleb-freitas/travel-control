import express from "express";

import middlewareSetup from "./middleware";

const app = express();

middlewareSetup(app);

export default app;
