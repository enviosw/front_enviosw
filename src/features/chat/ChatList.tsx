import { useChatsPorDomiciliario } from '../../services/domiServices';
import { formatDate } from '../../utils/formatearFecha';

interface Props {
  numeroDomiciliario: string;
  onSelect: (conversacionId: string, cliente: string) => void;
  selectedConversacionId: string | null;
}

const ChatList = ({ numeroDomiciliario, onSelect, selectedConversacionId }: Props) => {
  const { data, isLoading } = useChatsPorDomiciliario(numeroDomiciliario);

  if (isLoading) return <p className="p-4 text-center text-blue-600">Cargando chats...</p>;

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-blue-700 text-xl font-bold px-4 py-3 border-b border-blue-200 bg-blue-50">
        Chats
      </h2>

      <ul className="divide-y divide-blue-100">
        {data?.map((chat) => (
          <li
            key={chat.conversacionId}
            onClick={() => onSelect(chat.conversacionId, chat.cliente)}
            className={`px-4 py-3 cursor-pointer transition duration-200 flex justify-between gap-3
              ${selectedConversacionId === chat.conversacionId ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
          >
            {/* Avatar y cliente */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold uppercase">
                {chat.cliente.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-md font-semibold text-gray-900 truncate">{chat.cliente}</p>
                <p className="text-sm text-gray-500 truncate">{chat.ultimoMensaje}</p>
              </div>
            </div>

            {/* Timestamp */}
            <div className="text-xs text-gray-400 whitespace-nowrap self-start pt-1">
              {formatDate(chat.timestamp)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
