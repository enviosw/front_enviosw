import { useDomiciliariosResumen } from '../../services/domiServices';
import { DomiciliarioResumen } from '../../services/domiServices';

interface Props {
  onSelect: (domi: DomiciliarioResumen) => void;
  selected: DomiciliarioResumen | null;
}

const DomiciliarioList = ({ onSelect, selected }: Props) => {
  const { data, isLoading } = useDomiciliariosResumen();

  if (isLoading) return <p className="p-4 text-center text-blue-600">Cargando domiciliarios...</p>;

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-blue-700 text-xl font-bold px-4 py-3 border-b border-blue-200 bg-blue-50">
        Domiciliarios
      </h2>

      <ul className="divide-y divide-blue-100">
        {data?.map((d) => (
          <li
            key={d.id}
            onClick={() => onSelect(d)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition duration-200 
              ${selected?.id === d.id ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
          >
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold uppercase">
              {d.nombre.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-md font-semibold text-gray-900 truncate">{d.nombre}</p>
              <p className="text-sm text-gray-500 truncate">{d.telefono_whatsapp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DomiciliarioList;
