import { Address } from '@prisma/client';
import AddressRepository, {
  CreateAddressData,
} from '@repositories/AddressRepository';

export default class AddressService {
  private addressRepository: AddressRepository;

  constructor() {
    this.addressRepository = new AddressRepository();
  }

  async create(data: CreateAddressData): Promise<Address> {
    return this.addressRepository.create(data);
  }

  async findById(id: number): Promise<Address | null> {
    return this.addressRepository.findById(id);
  }
}
