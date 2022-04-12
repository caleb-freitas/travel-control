import { Router } from "express";

import { adaptRoute } from "../adapters/express.routes";
import { makeCompanySignUpController } from "../factory/controllers/company.signup";
import { makeDriverSignUpController } from "../factory/controllers/driver.signup";
import { authorization } from "../middleware";

export default (router: Router): void => {
  router.post("/signup/company", adaptRoute(makeCompanySignUpController()));
  router.post(
    "/signup/driver",
    authorization,
    adaptRoute(makeDriverSignUpController())
  );
};
