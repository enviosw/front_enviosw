import React from 'react'
import AppRouter from './routes/AppRouter'
import { ModalProvider } from './context/ModalContext'
import { CartProvider } from './context/CartContext'

const App: React.FC = () => {
    return (
        <>
            <ModalProvider>
                <CartProvider>
                    <AppRouter />
                </CartProvider>
            </ModalProvider>


        </>
    )
}

export default App