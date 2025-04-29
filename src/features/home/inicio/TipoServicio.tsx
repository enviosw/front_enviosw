import React from 'react';
import { TipoServicios } from '../../../shared/types/tipos';
import RecogidasForm from './components/RecogidasForm';
import ComprasForm from './components/ComprasForm';
import TramitesForm from './components/TramitesForm';
import PagosForm from './components/PagosForm';

const normalizeString = (str: string): string => {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
};

const TipoServicio: React.FC<TipoServicios> = ({ tipo }) => {
  const tipoString = normalizeString(String(tipo));

  return (
    <div className="space-y-8 w-full h-full px-1 ">
      <RecogidasForm tipoString={tipoString} />
      <ComprasForm tipoString={tipoString} />
      <TramitesForm tipoString={tipoString} />
      <PagosForm tipoString={tipoString} />
    </div>
  );
};

export default TipoServicio;
