import { Express } from "express";
import { serve, setup } from "swagger-ui-express";

import { swaggerDocument } from "../docs";
import { noCache } from "../middleware/no.cache";

export default (app: Express): void => {
  app.use("/api-docs", noCache, serve, setup(swaggerDocument));
};
