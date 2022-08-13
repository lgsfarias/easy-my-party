import joi from 'joi';

interface signUpSchemaInterface {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signUpSchema = joi
  .object<signUpSchemaInterface>({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.valid(joi.ref('password')).required(),
  })
  .required();

export default signUpSchema;
