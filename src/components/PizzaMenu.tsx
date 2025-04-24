import React from 'react';

const PizzaMenu: React.FC = () => {
    const pizzas = [
        { name: "Pizza Peperoni", description: "Queso mozzarella, queso parmesano, salami.", price: "$ 15.000", image: "https://via.placeholder.com/150", available: false },
        { name: "Pizza Pollo con Champiñones", description: "Pollo, champiñón, queso.", price: "$ 15.000", image: "https://via.placeholder.com/150", available: false },
        { name: "Pizza Mexicana", description: "Carne molida, pico de gallo, totopos.", price: "$ 15.000", image: "https://via.placeholder.com/150", available: false },
        { name: "Pizza Hawaiana", description: "Jamon y piña.", price: "$ 15.000", image: "https://via.placeholder.com/150", available: false },
        { name: "Pizza Margarita", description: "Rodajas de tomate, mozzarella, albahaca.", price: "$ 15.000", image: "https://via.placeholder.com/150", available: false },
        { name: "Pizza Criolla", description: "Carne desmechada, pico de gallo, maíz tierno, totopos.", price: "$ 15.000", image: "https://via.placeholder.com/150", available: false },
        { name: "Pizza Jamón y Tocineta", description: "Jamon, tocineta, ciruela.", price: "$ 15.000", image: "https://via.placeholder.com/150", available: false },
        { name: "Pizza Vegetariana", description: "Lechuga (pepino o pepinillos), mozzarella, aceitunas.", price: "$ 15.000", image: "https://via.placeholder.com/150", available: false },
        { name: "Pizza Mar y Tierra", description: "Camarón, calamar, perejil liso, tomate.", price: "$ 15.000", image: "https://via.placeholder.com/150", available: false },
        { name: "Pizza de la Casa", description: "Arma tu pizza, máximo 3 ingredientes.", price: "$ 15.000", image: "https://via.placeholder.com/150", available: false },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pizzas.map((pizza, index) => (
                <div key={index} className="border rounded-lg shadow-md overflow-hidden">
                    <img src={pizza.image} alt={pizza.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="font-semibold text-xl mb-2">{pizza.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{pizza.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">{pizza.price}</span>
                            <span
                                className={`px-2 py-1 text-sm font-semibold rounded-full ${pizza.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                    }`}
                            >
                                {pizza.available ? "Disponible" : "No disponible"}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default PizzaMenu;
