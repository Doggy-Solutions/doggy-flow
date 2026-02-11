import { Router } from "express";
import { internalAuth } from "../middleware/internalAuth.middleware.js";
import { resolveTenantFromWa } from "../middleware/resolveTenant.middleware.js";

const router = Router();

router.post("/wa/inbound", internalAuth, resolveTenantFromWa, (req, res) => {
	const { from, text } = req.body;
	const tenant = req.tenant;

	// Por ahora solo respondemos OK
	res.json({
		tenant_id: tenant.id,
		message: "Inbound received",
	});
});

export default router;
