import { Router } from "express";

import { DeliveriesController } from "@/controllers/deliveries-controller";
import { DeliveriesStatusController } from "@/controllers/deliveries-status-controller";

import { ensureAuth } from "@/middlewares/ensure-auth";
import { verifyUserAuthorization } from "@/middlewares/verify-user.authorization";

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusController();

deliveriesRoutes.use(ensureAuth);
deliveriesRoutes.use(verifyUserAuthorization(["sale"]));
deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.index);

deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update);

export { deliveriesRoutes };