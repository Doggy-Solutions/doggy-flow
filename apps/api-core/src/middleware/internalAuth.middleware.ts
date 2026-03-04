import { Request, Response, NextFunction } from "express";
import { config } from "../config/env.config.js";

export function internalAuth(req: Request, res: Response, next: NextFunction) {
	const token = req.headers["x-service-token"];

	if (token !== config.internalSecureToken) {
		return res.sendStatus(401);
	}

	next();
}
