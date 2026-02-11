import { Router } from "express";
import { internalAuth } from "../middleware/internalAuth.middleware.js";
import { resolveTenantFromWa } from "../middleware/resolveTenant.middleware.js";

const router = Router();

router.post(
	"/wa/inbound",
	internalAuth,
	resolveTenantFromWa,
	async (req, res) => {
		res.json({
			tenant_id: req.tenant.id,
			status: "ok",
		});
	},
);

export default router;
