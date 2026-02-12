import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
	port: number | string;
	whatsappWebHookVerifyToken: string;
	whatsappToken: string;
	whatsappPhoneNumberId: string;
	metaApiUrl: string;
	waBotToken: string;
	apiCoreUrl: string;
}

export const env: EnvConfig = {
	port: process.env.PORT || 3000,
	whatsappWebHookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN as string,
	whatsappToken: process.env.WHATSAPP_TOKEN as string,
	whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || "",
	metaApiUrl: process.env.META_API_URL || "",
	waBotToken: process.env.WA_BOT_TOKEN || "",
	apiCoreUrl: process.env.API_CORE_URL || "",
};

if (!env.whatsappWebHookVerifyToken || !env.whatsappToken) {
	throw new Error("❌ Missing required environment variables");
}
