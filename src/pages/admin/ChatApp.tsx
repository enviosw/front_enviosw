import { useState } from 'react';
import { DomiciliarioResumen } from '../../services/domiServices';
import DomiciliarioList from '../../features/chat/DomiciliarioList';
import ChatList from '../../features/chat/ChatList';
import ChatWindow from '../../features/chat/ChatWindow';

const ChatApp = () => {
  const [selectedDomiciliario, setSelectedDomiciliario] = useState<DomiciliarioResumen | null>(null);
  const [selectedConversacionId, setSelectedConversacionId] = useState<string | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-blue-100 overflow-hidden">
      {/* Sidebar: Domiciliarios */}
      <div className="w-1/4 min-w-[240px] max-w-sm border-r border-gray-300 bg-white shadow-inner overflow-y-auto">
        <DomiciliarioList
          onSelect={(domi) => {
            setSelectedDomiciliario(domi);
            setSelectedConversacionId(null);
            setSelectedCliente(null);
          }}
          selected={selectedDomiciliario}
        />
      </div>

      {/* Lista de Chats */}
      <div className="w-1/4 min-w-[240px] max-w-sm border-r border-gray-300 bg-white shadow-inner overflow-y-auto">
        {selectedDomiciliario ? (
          <ChatList
            numeroDomiciliario={selectedDomiciliario.telefono_whatsapp}
            onSelect={(conversacionId, cliente) => {
              setSelectedConversacionId(conversacionId);
              setSelectedCliente(cliente);
            }}
            selectedConversacionId={selectedConversacionId}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm px-4 text-center">
            Selecciona un domiciliario para ver sus chats.
          </div>
        )}
      </div>

      {/* Ventana de Chat */}
      <div className="flex-1 bg-blue-50 relative">
        {selectedConversacionId && selectedCliente && selectedDomiciliario ? (
          <ChatWindow
            domiciliario={selectedDomiciliario.telefono_whatsapp}
            id={selectedConversacionId}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg text-center px-4">
            Selecciona un chat para ver los mensajes.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
