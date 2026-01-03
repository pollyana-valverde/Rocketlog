import { Request, Response } from "express";
import { prisma } from "@/database/prisma.js";
import z from "zod";

class DeliveriesController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            user_id: z.uuid(),
            description: z.string().min(1)
        });

        const { user_id, description } = bodySchema.parse(request.body);

        await prisma.delivery.create({
            data: {
                userId:user_id,
                description
            }
        });

        return response.status(201).json();
    }

    async index(request: Request, response: Response) {
        const deliveries = await prisma.delivery.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        return response.status(200).json({ deliveries });
    }
}

export { DeliveriesController };