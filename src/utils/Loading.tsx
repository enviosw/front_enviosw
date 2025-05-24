// components/Loader.tsx
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="loader">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="loader-square" style={{ animationDelay: `${-i * (10 / 7)}s` }} />
      ))}
    </div>
  );
};

export default Loading;
