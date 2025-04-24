import React from 'react';
import { useParams } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import MenuList from '../../components/MenuList';

const Restaurante: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    console.log(id)

    return (
        <CartProvider>
            <div className="w-full h-full">
                <MenuList />
            </div>
        </CartProvider>
    );
};

export default Restaurante;
