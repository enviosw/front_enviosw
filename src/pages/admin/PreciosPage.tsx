// p. ej. src/pages/Precios.tsx
import React, { Suspense, lazy } from "react";
import Loading from "../../utils/Loading";

const TablaSumasHoyPorDomiciliario = lazy(() => import("../../features/precios/TablaSumasHoyPorDomiciliario"));
const SumasPorDia = lazy(() => import("../../features/precios/SumasPorDia"));

const PreciosPage: React.FC = () => {
    return (
        <div className="w-full  mx-auto px-4 lg:px-10 py-4 space-y-6">
            <Suspense fallback={<Loading />}>
                <TablaSumasHoyPorDomiciliario />
            </Suspense>

            <Suspense fallback={<Loading />}>
                <SumasPorDia />
            </Suspense>
        </div>
    );
};

export default PreciosPage;
