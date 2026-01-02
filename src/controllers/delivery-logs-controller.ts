import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import z from "zod";
import { AppError } from "@/utils/AppError";
import { de } from "zod/v4/locales";

class DeliveryLogsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            delivery_id: z.uuid(),
            description: z.string().min(5),
        });

        const { delivery_id, description } = bodySchema.parse(request.body);

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id,
            },
        });

        if (!delivery) {
            throw new AppError("Delivery not found", 404);
        }

        if( delivery.status === "delivered") {
            throw new AppError("This order has already been delivered");
        }

        if (delivery.status === "processing") {
            throw new AppError("Change status to shipped before adding logs");
        }

        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description,
            },
        });

        return response.status(201).json();
    }

    async show(request: Request, response: Response) {
        const paramsSchema = z.object({
            delivery_id: z.uuid(),
        });

        const { delivery_id } = paramsSchema.parse(request.params);

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                logs: {
                    select: {
                        id: true,
                        description: true,
                        createdAt: true,
                    },
                },
            },
        });

        if (
            request.user?.role === "customer" && 
            delivery?.userId !== request.user.id
        ) {
            throw new AppError("The user can only view their own delivery logs", 403);
        }

        return response.json(delivery);
    }
}

export { DeliveryLogsController };