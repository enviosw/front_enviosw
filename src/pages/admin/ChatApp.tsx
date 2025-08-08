import { useEffect, useState } from 'react';
import { DomiciliarioResumen } from '../../services/domiServices';
import DomiciliarioList from '../../features/chat/DomiciliarioList';
import ChatList from '../../features/chat/ChatList';
import ChatWindow from '../../features/chat/ChatWindow';

type Pane = 'domi' | 'chats' | 'chat';

const ChatApp = () => {
  const [selectedDomiciliario, setSelectedDomiciliario] = useState<DomiciliarioResumen | null>(null);
  const [selectedConversacionId, setSelectedConversacionId] = useState<string | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<string | null>(null);

  // Control de panel activo en pantallas pequeñas
  const [activePane, setActivePane] = useState<Pane>('domi');

  // Avanza automáticamente en mobile cuando seleccionas algo
  useEffect(() => {
    if (selectedDomiciliario && !selectedConversacionId) setActivePane('chats');
  }, [selectedDomiciliario]);

  useEffect(() => {
    if (selectedConversacionId) setActivePane('chat');
  }, [selectedConversacionId]);

  const resetChat = () => {
    setSelectedConversacionId(null);
    setSelectedCliente(null);
  };

  return (
    <div className="h-[95vh] w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* App shell */}
      <div className="mx-auto h-full max-w-full px-3 py-3 md:py-4">
        <div className="mb-3 flex items-center justify-between rounded-2xl border border-blue-100/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/50">
          <h1 className="text-base md:text-lg font-semibold text-blue-800 tracking-tight">Chat Operaciones</h1>
          <div className="text-[10px] md:text-xs text-gray-500">v1</div>
        </div>

        {/* Conmutador móvil */}
        <div className="md:hidden mb-3">
          <div className="grid grid-cols-3 gap-2 rounded-xl bg-blue-50 p-1 border border-blue-100">
            {([
              { id: 'domi', label: 'Domiciliarios' },
              { id: 'chats', label: 'Chats' },
              { id: 'chat', label: 'Conversación' },
            ] as { id: Pane; label: string }[]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivePane(tab.id)}
                className={[
                  'text-xs px-2 py-2 rounded-lg transition',
                  activePane === tab.id ? 'bg-white shadow text-blue-700 font-medium' : 'text-blue-700/70'
                ].join(' ')}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Layout responsive */}
        <div
          className="
            h-[calc(100%-6.5rem)] md:h-[calc(100%-7.5rem)]
            grid gap-3 rounded-2xl
            grid-cols-1
            md:grid-cols-[280px_minmax(0,1fr)]
            xl:grid-cols-[280px_320px_minmax(0,1fr)]
          "
        >
          {/* Col 1: Domiciliarios */}
          <section
            className={[
              'overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm',
              // mobile: solo visible si tab 'domi'
              activePane === 'domi' ? 'block md:block' : 'hidden md:block'
            ].join(' ')}
          >
            <div className="h-full flex flex-col">
              <div className="border-b border-blue-100/80 bg-blue-50/60 px-4 py-2.5 text-sm font-semibold text-blue-800">
                Domiciliarios
              </div>
              <div className="flex-1 px-1 py-1">
                <DomiciliarioList
                  onSelect={(domi) => {
                    setSelectedDomiciliario(domi);
                    resetChat();
                  }}
                  selected={selectedDomiciliario}
                />
              </div>
            </div>
          </section>

          {/* Col 2: Chats */}
          <section
            className={[
              'overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm',
              // mobile: solo visible si tab 'chats'
              activePane === 'chats' ? 'block md:block' : 'hidden md:block',
              // en md (2 col), oculta si no hay seleccion de domiciliario
              'md:[&:has(.__empty)]:hidden xl:block'
            ].join(' ')}
          >
            <div className="h-full flex flex-col">
              <div className="border-b border-blue-100/80 bg-blue-50/60 px-4 py-2.5 text-sm font-semibold text-blue-800">
                Chats
              </div>
              <div className="flex-1 px-1 py-1">
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
                  <div className="__empty flex h-full items-center justify-center px-6 text-center">
                    <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50/40 px-4 py-6 text-sm text-blue-700">
                      <div className="mb-1 text-2xl">🧭</div>
                      Selecciona un <span className="font-semibold">domiciliario</span> para ver sus chats.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Col 3: ChatWindow */}
          <section
            className={[
              'relative overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm',
              // mobile: solo visible si tab 'chat'
              activePane === 'chat' ? 'block md:block' : 'hidden md:block',
              // en md (2 col), muestra chat en la 2da col si hay conversación
              'xl:block'
            ].join(' ')}
          >
            <div className="h-full flex flex-col">
              {/* Header del chat activo */}
              <div className="sticky top-0 z-10 border-b border-blue-100/80 bg-white/80 px-4 py-2.5 backdrop-blur">
                <div className="flex items-center gap-3">
                  {/* Botón atrás en mobile */}
                  <button
                    onClick={() => setActivePane(selectedDomiciliario ? 'chats' : 'domi')}
                    className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-lg border border-blue-100 text-blue-700"
                    aria-label="Volver"
                  >
                    ←
                  </button>
                  <div className="h-8 w-8 rounded-full bg-blue-200/80" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {selectedCliente ?? 'Sin conversación'}
                    </p>
                    <p className="text-xs text-gray-500">Historial y mensajes</p>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                {selectedConversacionId && selectedCliente && selectedDomiciliario ? (
                  <div className="h-full bg-gradient-to-b from-white via-white to-blue-50/40">
                    <ChatWindow
                      domiciliario={selectedDomiciliario.telefono_whatsapp}
                      id={selectedConversacionId}
                    />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center px-6 text-center">
                    <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50/40 px-6 py-8 text-gray-600">
                      <div className="mb-2 text-3xl">💬</div>
                      <p className="text-base font-medium">Selecciona un chat para ver los mensajes</p>
                      <p className="text-sm text-gray-500">El historial aparecerá aquí.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
