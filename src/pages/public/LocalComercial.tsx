import React from 'react';
import { CartProvider } from '../../context/CartContext';
import MenuList from '../../features/home/inicio/MenuList';

const LocalComercial: React.FC = () => {

    return (
        <CartProvider>
            <div className="w-full h-full">
                <MenuList />
            </div>
        </CartProvider>
    );
};

export default LocalComercial;
