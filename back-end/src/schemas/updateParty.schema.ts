import { CreatePartyData } from '@repositories/PartyRepository';
import Joi from 'joi';

type updatePartySchemaInterface = Partial<CreatePartyData>;

const updatePartySchema = Joi.object<updatePartySchemaInterface>({
  name: Joi.string(),
  date: Joi.date(),
}).required();

export default updatePartySchema;
