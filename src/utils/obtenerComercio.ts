import { useLocation } from 'react-router-dom';

export const useComercioId = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/'); // ["", "comercio", "39", ...]
  const comercioId = pathSegments.includes('comercio') ? pathSegments[pathSegments.indexOf('comercio') + 1] : undefined;

  return comercioId;
};
