import React from 'react'

const SkeletonCard: React.FC = () => (
    <div className="bg-white border border-[#EDE8E3] rounded-2xl overflow-hidden shadow-sm animate-pulse">
        {/* Imagen placeholder */}
        <div className="aspect-[4/3] bg-gradient-to-br from-[#EDE8E3] to-[#FAFAF7]" />
        {/* Contenido placeholder */}
        <div className="p-3 space-y-2">
            <div className="h-3.5 bg-[#EDE8E3] rounded-full w-3/4" />
            <div className="h-3 bg-[#EDE8E3] rounded-full w-full" />
            <div className="h-3 bg-[#EDE8E3] rounded-full w-1/2" />
            <div className="flex justify-between items-center pt-1">
                <div className="h-2.5 bg-[#EDE8E3] rounded-full w-1/3" />
                <div className="h-5 w-12 bg-[#EDE8E3] rounded-full" />
            </div>
        </div>
    </div>
);

const Skeleton: React.FC = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-5 w-full">
            {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}

export default Skeleton