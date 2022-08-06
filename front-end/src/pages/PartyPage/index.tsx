// import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

// import * as S from './style';

export default function PartyPage() {
  const { partyId } = useParams();

  return (
    <>
      <Header />
      <h1>{partyId}</h1>
      <Footer />
    </>
  );
}
