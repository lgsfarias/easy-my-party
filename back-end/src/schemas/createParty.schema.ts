import { CreateAddressData } from '@repositories/AddressRepository';
import { CreatePartyData } from '@repositories/PartyRepository';
import Joi from 'joi';

type createPartySchemaInterface = Omit<CreatePartyData, 'userId'> &
  Omit<CreateAddressData, 'partyId'>;

const createPartySchema = Joi.object<createPartySchemaInterface>({
  name: Joi.string().required(),
  date: Joi.date().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
}).required();

export default createPartySchema;
