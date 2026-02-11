import { Request, Response, NextFunction } from "express";
import { TenantRepository } from "../infrastructure/repositories/tenant.repository.js";

declare module "express-serve-static-core" {
	interface Request {
		tenant?: any;
	}
}

export async function resolveTenantFromWa(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const { phone_number_id } = req.body;

	const tenant = await TenantRepository.findByPhoneNumberId(phone_number_id);

	if (!tenant) return res.sendStatus(403);

	req.tenant = tenant;
	next();
}
