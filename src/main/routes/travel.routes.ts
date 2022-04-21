import { adaptRoute } from "@/main/adapters";
import { makeAddTravelController } from "@/main/factory/controllers";
import { Router } from "express";

import { makeFinishTravelController } from "../factory/controllers/finish.travel";
import { authorization } from "../middleware";

export default (router: Router): void => {
  router.post(
    "/travel/:driver_id/:truck_id",
    authorization,
    adaptRoute(makeAddTravelController())
  );

  router.patch(
    "/travel/:id",
    authorization,
    adaptRoute(makeFinishTravelController())
  );
};
