import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";

interface TokenPayload {
    role: string;
    sub: string;
}

function ensureAuth(request: Request, response: Response, next: NextFunction) {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new AppError("JWT token is missing", 401);
        }

        const [, token] = authHeader.split(" ");

        const { secret } = authConfig.jwt;

        if (!secret) {
            throw new AppError("JWT secret is not defined", 500);
        }

        const { role, sub: user_id } = jwt.verify(token, secret) as TokenPayload;

        request.user = {
            id: user_id,
            role,
        }

        return next();

    } catch (error) {
        throw new AppError("Invalid token", 401);
    }
}

export { ensureAuth };