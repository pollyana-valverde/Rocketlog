import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError.js";

function verifyUserAuthorization(roles: string[]) {
    return(request: Request, response: Response, next: NextFunction) => {
        if (!request.user) {
            throw new AppError("Unauthorized", 401);
        }

        if (!roles.includes(request.user.role)) {
            throw new AppError("Unauthorized", 403);
        }

        return next();
    }
}

export { verifyUserAuthorization };