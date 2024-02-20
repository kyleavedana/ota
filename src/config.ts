import 'dotenv/config';
import joi from 'joi';

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: joi.number().positive().required()
  })
  .unknown();

interface EnvShape {
  NODE_ENV: string;
  PORT: number;
}

const { value, error } = envVarsSchema
  // eslint-disable-next-line @cspell/spellchecker
  .prefs({ errors: { label: 'key' } })
  .validate(process.env) as { value: EnvShape; error?: joi.ValidationError };

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: value.NODE_ENV,
  port: value.PORT
};
