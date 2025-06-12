import React from 'react'
import AppRouter from './routes/AppRouter'
import { ModalProvider } from './context/ModalContext'
import { CartProvider } from './context/CartContext'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './utils/ErrorFallback';


const App: React.FC = () => {
    return (
        <>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                    // Aquí podrías reiniciar algo, o navegar a una página segura
                    window.location.reload()
                }}
            >
                <ModalProvider>
                    <CartProvider>
                        <AppRouter />
                    </CartProvider>
                </ModalProvider>
            </ErrorBoundary>

        </>
    )
}

export default App