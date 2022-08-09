import { useContext } from 'react';
import { PartyContext } from '../contexts/PartyContext';

export default function useParty() {
  const partyContext = useContext(PartyContext);
  if (!partyContext) {
    throw new Error('useAlert must be used inside a AlertContext Provider');
  }

  return partyContext;
}
