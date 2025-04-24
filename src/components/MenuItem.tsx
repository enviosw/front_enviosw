import React from 'react';
import { MenuItemType } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MenuItem: React.FC<MenuItemType> = ({ name, description, price, image }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/producto', {
      state: {
        name,
        description,
        price,
        image
      }
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white hover:rounded-xl hover:shadow cursor-pointer border-b border-gray-200 hover:bg-gray-100 p-2 transition w-full lg:max-w-72 flex items-center gap-4"
    >
      <div className="avatar">
        <div className="mask mask-squircle w-24">
          <img src={image} alt={name} />
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <h3 className="text-base font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-base text-orange-600 font-bold">${price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ name, description, price, image });
            }}
            className="bg-[#E63946] text-white text-sm size-8 flex justify-center items-center rounded-full hover:bg-orange-600 transition"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
