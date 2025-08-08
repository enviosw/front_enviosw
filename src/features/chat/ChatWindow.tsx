import { useMensajesPorConversacion } from '../../services/domiServices';
import { formatDate } from '../../utils/formatearFecha';

interface Props {
  
  domiciliario: string;
  id: string
}

const ChatWindow = ({ domiciliario, id }: Props) => {
  
  const { data, isLoading } = useMensajesPorConversacion(id);

  if (isLoading) return <p className="p-4">Cargando mensajes...</p>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {data?.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs p-3 rounded-lg shadow ${
              msg.emisor === domiciliario ? 'bg-green-100 ml-auto' : 'bg-gray-200'
            }`}
          >
            <div className="text-sm">{msg.contenido}</div>
            <div className="text-xs text-gray-500 text-right mt-1">
            {formatDate(msg.timestamp)}      
            </div>
          </div>
        ))}
      </div>
      {/* (Opcional) Aquí podrías agregar un input para enviar mensajes */}
    </div>
  );
};

export default ChatWindow;
