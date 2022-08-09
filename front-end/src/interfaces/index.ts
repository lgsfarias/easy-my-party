export interface PartyInterface {
  id: number;
  name: string;
  date: string;
  userId: string;
  createdAt: string;
}

export interface TaskInterface {
  id: number;
  description: string;
  done: boolean;
  partyId: number;
  createdAt: string;
}

export interface AddressInterface {
  id: number;
  street: string;
  city: string;
  state: string;
  partyId: number;
  createdAt: string;
}
