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
