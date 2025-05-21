import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useBuscarComercios } from '../../services/comerciosService'; // Asegúrate de que el path sea correcto
import { Comercio } from '../types/comercioInterface';

interface Option {
  value: number;
  label: string;
}

interface BuscarComercioSelectProps {
  onSelect: (comercioId: number | null, comercio?: Comercio) => void;
}

const BuscarComercioSelect: React.FC<BuscarComercioSelectProps> = ({ onSelect }) => {
  const [search, setSearch] = useState('');
  const [shouldSearch, setShouldSearch] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: comercios, isLoading } = useBuscarComercios(shouldSearch ? search : '');

  const options: Option[] = (comercios || [])
    .filter((comercio) => comercio.id !== undefined)
    .map((comercio) => ({
      value: comercio.id as number,
      label: comercio.nombre_comercial,
    }));

  // Abrir el menú automáticamente cuando llegan los datos
  useEffect(() => {
    if (comercios && comercios.length > 0 && !isLoading) {
      setMenuOpen(true);
    }
  }, [comercios, isLoading]);

  const handleSearchClick = () => {
    setShouldSearch(true);
  };

  const handleChange = (option: Option | null) => {
    setSelectedOption(option);
    setMenuOpen(false); // Cierra el menú al seleccionar
    const selectedComercio = comercios?.find((c) => c.id === option?.value);
    onSelect(option?.value ?? null, selectedComercio);
  };

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Buscar comercio..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShouldSearch(false); // Para evitar búsqueda automática
          }}
        />
        <button type="button" className="btn btn-primary" onClick={handleSearchClick}>
          Buscar
        </button>
      </div>

      <Select
        isLoading={isLoading}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Selecciona un comercio"
        isClearable
        menuIsOpen={menuOpen}
        onMenuClose={() => setMenuOpen(false)}
      />
    </div>
  );
};

export default BuscarComercioSelect;
