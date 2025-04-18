import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production', 'staging')
    .default('development'),
  APP_NAME: Joi.string().required(),
  API_VERSION: Joi.string().required(),
  API_PREFIX: Joi.string().required(),
  BACKEND_URL: Joi.string().required(),
  FRONTEND_URL: Joi.string().required(),
  RESET_PASSWORD_FRONTEND_URL: Joi.string().required(),

  // database
  DATABASE_PORT: Joi.number().port().default(5432),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(true),
  DATABASE_AUTO_LOAD_ENTITIES: Joi.boolean().default(true),

  // jwt
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
  JWT_REFRESH_TOKEN_TTL: Joi.number().default(86400),

  // google authentication
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOGOOGLE_CLIENT_SECRET: Joi.string().required(),

  // chapa payment get way
  CHAPA_WEBHOOK_URL: Joi.string().required(),
  CHAPA_WEBHOOK_SECRET: Joi.string().required(),
  CHAPA_SECRET_KEY: Joi.string().required(),

  // email service
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().port().required(),
  EMAIL_USERNAME: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_FROM: Joi.string().required(),

  // Twilio
  TWILIO_ACCOUNT_SID: Joi.string().required(),
  TWILIO_PHONE_NUMBER: Joi.string().required(),
  TWILIO_AUTH_TOKEN: Joi.string().required(),
});
