import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production', 'staging')
    .default('development'),
  DATABASE_PORT: Joi.number().port().default(5432),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(true),
  DATABASE_AUTO_LOAD_ENTITIES: Joi.boolean().default(true),
});
