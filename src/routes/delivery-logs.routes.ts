import { Router } from "express";

import { DeliveryLogsController } from "@/controllers/delivery-logs-controller.js";

import { ensureAuth } from "@/middlewares/ensure-auth.js";
import { verifyUserAuthorization } from "@/middlewares/verify-user.authorization.js";

const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoutes.post(
    "/", 
    ensureAuth,
    verifyUserAuthorization(["sale"]),
    deliveryLogsController.create
);

deliveryLogsRoutes.get(
    "/:delivery_id/show",
    ensureAuth,
    verifyUserAuthorization(["sale", "customer"]),
    deliveryLogsController.show
);

export { deliveryLogsRoutes };