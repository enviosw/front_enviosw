import { useMemo, useState, useEffect, useCallback, KeyboardEvent } from 'react';
import { useDomiciliariosResumen } from '../../services/domiServices';
import { DomiciliarioResumen } from '../../services/domiServices';

interface Props {
  onSelect: (domi: DomiciliarioResumen) => void;
  selected: DomiciliarioResumen | null;
}

const SkeletonItem = () => (
  <li className="animate-pulse px-4 py-3">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-blue-100" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-1/3 bg-blue-100 rounded" />
        <div className="h-3 w-1/2 bg-blue-50 rounded" />
      </div>
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
  // Colores suaves y consistentes por contacto
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  const hue = Math.abs(h) % 360;
  return `hsl(${hue} 70% 90%)`;
};

const formatTime = (iso?: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Highlight: React.FC<{ text: string; query: string }> = ({ text, query }) => {
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

const DomiciliarioList = ({ onSelect, selected }: Props) => {
  const { data, isLoading } = useDomiciliariosResumen();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const items = useMemo(() => {
    const base = data ?? [];
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(d =>
      [d.nombre, (d as any).telefono_whatsapp, (d as any).alias]
        .filter(Boolean)
        .some((v: string) => v?.toLowerCase().includes(q))
    );
  }, [data, query]);

  // Mantener el activeIndex válido al cambiar filtro
  useEffect(() => {
    setActiveIndex(items.length ? 0 : -1);
  }, [items.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLUListElement>) => {
    if (!items.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => (i + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => (i - 1 + items.length) % items.length);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      onSelect(items[activeIndex]);
    }
  }, [items, activeIndex, onSelect]);

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
 
        <ul className="divide-y divide-blue-100">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonItem key={i} />)}
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
            placeholder="Buscar por nombre o WhatsApp"
            className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2 pr-9 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">⌘K</span>
        </label>
      </div>

      {items.length === 0 ? (
        <div className="px-4 py-10 text-center text-gray-500">
          {query ? 'No hay coincidencias.' : 'No hay domiciliarios.'}
        </div>
      ) : (
        <ul
          role="listbox"
          aria-label="Lista de domiciliarios"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="divide-y divide-blue-50 focus:outline-none max-h-[70vh] overflow-auto"
        >
          {items.map((d, idx) => {
            const isSelected = selected?.id === d.id;
            const isActive = idx === activeIndex;
            const unread = (d as any).unreadCount as number | undefined; // opcional
            const lastMsg = (d as any).lastMessage as string | undefined; // opcional
            const lastTime = (d as any).lastMessageAt as string | undefined; // opcional
            const online = (d as any).isOnline as boolean | undefined; // opcional

            return (
              <li
                key={d.id}
                role="option"
                aria-selected={isSelected}
                onClick={() => onSelect(d)}
                className={[
                  'flex items-center gap-3 px-4 py-3 cursor-pointer transition',
                  isSelected ? 'bg-blue-100' : 'hover:bg-blue-50',
                  isActive && !isSelected ? 'ring-2 ring-blue-300' : ''
                ].join(' ')}
              >
                <div
                  className="relative flex-shrink-0 h-11 w-11 rounded-full flex items-center justify-center font-semibold text-blue-900"
                  style={{ background: hashColor(d.nombre || String(d.id)) }}
                  aria-hidden="true"
                >
                  {getInitials(d.nombre ?? 'D')}
                  {online && (
                    <span
                      title="En línea"
                      className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[15px] font-semibold text-gray-900 truncate">
                      <Highlight text={d.nombre} query={query} />
                    </p>
                    {unread ? (
                      <span className="ml-auto text-xs bg-blue-600 text-white rounded-full px-2 py-0.5">
                        {unread > 99 ? '99+' : unread}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <p className="truncate">
                      {lastMsg ? <Highlight text={lastMsg} query={query} /> : (d as any).telefono_whatsapp}
                    </p>
                    <span className="ml-auto shrink-0 tabular-nums">{formatTime(lastTime)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};



export default DomiciliarioList;
