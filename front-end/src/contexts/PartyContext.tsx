import { createContext, useState } from 'react';
import { AddressInterface, PartyInterface } from '../interfaces';

type PartyWithAddress = PartyInterface & { address: AddressInterface };

interface PartyContextInterface {
  party: PartyWithAddress | null;
  setParty: (newParty: PartyWithAddress | null) => void;
  donePercentage: number;
  setDonePercentage: (newDonePercentage: number) => void;
}

export const PartyContext = createContext<PartyContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

export function PartyProvider({ children }: Props) {
  const [party, setParty] = useState<PartyWithAddress | null>(null);
  const [donePercentage, setDonePercentage] = useState<number>(0);

  return (
    <PartyContext.Provider value={{
      party, setParty, donePercentage, setDonePercentage,
    }}
    >
      {children}
    </PartyContext.Provider>
  );
}
