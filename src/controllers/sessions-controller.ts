import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { authConfig } from "@/configs/auth";
import { prisma } from "@/database/prisma";
import { compare } from "bcrypt";
import z from "zod";
import jwt from "jsonwebtoken"

class SessionsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            email: z.email(),
            password: z.string().min(6),
        });

        const { email, password } = bodySchema.parse(request.body);

        const user = await prisma.user.findFirst({ where: { email } });

        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }

        const passwordMatches = await compare(password, user.password);

        if (!passwordMatches) {
            throw new AppError("Invalid credentials", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        if (!secret) {
            throw new AppError("JWT secret is not defined", 500);
        }

        const token = jwt.sign({ role: user.role ?? "customer" }, secret, {
            subject: String(user.id),
            expiresIn: String(expiresIn),
        });

        const { password: hashedPassword, ...userWithoutPassword } = user;

        return response.json({ token, user: userWithoutPassword });

    }
}

export { SessionsController };