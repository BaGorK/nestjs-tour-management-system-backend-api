import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION,
  apiPrefix: process.env.API_PREFIX,
  backendUrl: process.env.BACKEND_URL,
  frontendUrl: process.env.FRONTEND_URL,

  chapaWebhookUrl: process.env.CHAPA_WEBHOOK_URL,
  chapaWebhookSecret: process.env.CHAPA_WEBHOOK_SECRET,
  chapaSecretKey: process.env.CHAPA_SECRET_KEY,
}));
