import joi from 'joi';

interface loginSchemaInterface {
  email: string;
  password: string;
}

const loginSchema = joi
  .object<loginSchemaInterface>({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  .required();

export default loginSchema;
