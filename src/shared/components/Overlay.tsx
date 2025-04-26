import React from 'react';

const Overlay: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black opacity-50 z-50 pointer-events-none"></div>
    );
};

export default Overlay;
