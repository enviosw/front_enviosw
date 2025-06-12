// src/components/ErrorFallback.tsx
import React from 'react'

interface Props {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorFallback: React.FC<Props> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="p-4 text-center text-red-700 bg-red-100 rounded">
      <p className="font-bold">Ocurrió un error inesperado</p>
      <pre className="text-sm whitespace-pre-wrap">{error.message}</pre>
      <button onClick={resetErrorBoundary} className="mt-3 px-4 py-2 bg-red-600 text-white rounded">
        Reintentar
      </button>
    </div>
  )
}

export default ErrorFallback
