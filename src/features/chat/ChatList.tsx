import { useMemo, useState, useEffect, useCallback, KeyboardEvent } from 'react';
import { useChatsPorDomiciliario } from '../../services/domiServices';
import { formatDate } from '../../utils/formatearFecha';

interface ChatItem {
  conversacionId: string;
  cliente: string;
  ultimoMensaje?: string;
  timestamp?: string; // ISO
  unreadCount?: number;
  isMuted?: boolean;
  isPinned?: boolean;
  isOnline?: boolean;
}

interface Props {
  numeroDomiciliario: string;
  onSelect: (conversacionId: string, cliente: string) => void;
  selectedConversacionId: string | null;
}

const SkeletonItem = () => (
  <li className="animate-pulse px-4 py-3">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-blue-100" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-1/3 bg-blue-100 rounded" />
        <div className="h-3 w-1/2 bg-blue-50 rounded" />
      </div>
      <div className="h-3 w-10 bg-blue-50 rounded" />
    </div>
  </li>
);

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase())
    .join('');

const hashColor = (str: string) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  const hue = Math.abs(h) % 360;
  return `hsl(${hue} 70% 90%)`;
};

const Highlight: React.FC<{ text?: string; query: string }> = ({ text = '', query }) => {
  if (!query) return <>{text}</>;
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-yellow-200 px-0.5 rounded">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
};

const ChatList = ({ numeroDomiciliario, onSelect, selectedConversacionId }: Props) => {
  const { data, isLoading } = useChatsPorDomiciliario(numeroDomiciliario);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const sorted = useMemo(() => {
    const chats = (data as ChatItem[] | undefined) ?? [];
    // Pin primero, luego por fecha desc
    return [...chats].sort((a, b) => {
      if ((b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0) !== 0) {
        return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
      }
      const ta = a.timestamp ? +new Date(a.timestamp) : 0;
      const tb = b.timestamp ? +new Date(b.timestamp) : 0;
      return tb - ta;
    });
  }, [data]);

  const items = useMemo(() => {
    if (!query.trim()) return sorted;
    const q = query.toLowerCase();
    return sorted.filter(c =>
      [c.cliente, c.ultimoMensaje].filter(Boolean).some(v => v!.toLowerCase().includes(q))
    );
  }, [sorted, query]);

  useEffect(() => {
    setActiveIndex(items.length ? Math.max(0, items.findIndex(c => c.conversacionId === selectedConversacionId)) : -1);
  }, [items, selectedConversacionId]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLUListElement>) => {
      if (!items.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(i => (i + 1) % items.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(i => (i - 1 + items.length) % items.length);
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        const c = items[activeIndex];
        onSelect(c.conversacionId, c.cliente);
      }
    },
    [items, activeIndex, onSelect]
  );

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <ul className="divide-y divide-blue-50">
          {Array.from({ length: 7 }).map((_, i) => <SkeletonItem key={i} />)}
        </ul>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="px-3 py-2 border-b border-blue-100 bg-blue-50/60">
        <label className="relative block">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar chats"
            className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2 pr-9 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">⌘F</span>
        </label>
      </div>

      {items.length === 0 ? (
        <div className="px-6 py-10 text-center text-gray-500">
          {query ? 'No hay coincidencias.' : 'Aún no hay chats.'}
        </div>
      ) : (
        <ul
          role="listbox"
          aria-label="Lista de chats"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="divide-y divide-blue-50 focus:outline-none max-h-[70vh] overflow-auto"
        >
          {items.map((chat, idx) => {
            const isSelected = selectedConversacionId === chat.conversacionId;
            const isActive = idx === activeIndex;

            return (
              <li
                key={chat.conversacionId}
                role="option"
                aria-selected={isSelected}
                onClick={() => onSelect(chat.conversacionId, chat.cliente)}
                className={[
                  'px-4 py-3 cursor-pointer transition flex justify-between gap-3',
                  isSelected ? 'bg-blue-100' : 'hover:bg-blue-50',
                  isActive && !isSelected ? 'ring-2 ring-blue-300' : ''
                ].join(' ')}
              >
                {/* Avatar + texto */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="relative flex-shrink-0 h-11 w-11 rounded-full flex items-center justify-center font-semibold text-blue-900"
                    style={{ background: hashColor(chat.cliente || chat.conversacionId) }}
                    aria-hidden="true"
                  >
                    {getInitials(chat.cliente)}
                    {chat.isOnline && (
                      <span
                        title="En línea"
                        className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[15px] font-semibold text-gray-900 truncate">
                        <Highlight text={chat.cliente} query={query} />
                      </p>
                      {chat.isPinned && (
                        <span title="Fijado" className="text-xs text-blue-600">📌</span>
                      )}
                      {chat.isMuted && (
                        <span title="Silenciado" className="text-xs text-gray-400">🔕</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      <Highlight text={chat.ultimoMensaje} query={query} />
                    </p>
                  </div>
                </div>

                {/* Derecha: hora + no leídos */}
                <div className="flex flex-col items-end justify-between shrink-0">
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {chat.timestamp ? formatDate(chat.timestamp) : ''}
                  </span>
                  {chat.unreadCount ? (
                    <span className="mt-1 text-xs bg-blue-600 text-white rounded-full px-2 py-0.5">
                      {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                    </span>
                  ) : (
                    <span className="h-4" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};


export default ChatList;
