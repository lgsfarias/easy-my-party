import { createContext, useState } from 'react';
import { AddressInterface, PartyInterface } from '../interfaces';

type PartyWithAddress = PartyInterface & { address: AddressInterface };

interface PartyContextInterface {
  party: PartyWithAddress | null;
  setParty: (newParty: PartyWithAddress | null) => void;
}

export const PartyContext = createContext<PartyContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

export function PartyProvider({ children }: Props) {
  const [party, setParty] = useState<PartyWithAddress | null>(null);

  return (
    <PartyContext.Provider value={{ party, setParty }}>
      {children}
    </PartyContext.Provider>
  );
}
