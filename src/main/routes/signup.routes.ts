import { Router } from "express";

import { adaptRoute } from "../adapters/express.routes.adapter";
import { makeSignUpController } from "../factory/controllers/signup/signup.controller.factory";

export default (router: Router): void => {
  router.post("/company/signup", adaptRoute(makeSignUpController()));
};
