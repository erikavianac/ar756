import dynamic from 'next/dynamic';

// Componente de loading que simula a estrutura da galeria
const GaleriaLoading = () => (
  <div className="w-full h-full bg-white rounded-lg p-5 flex flex-col gap-y-5">
    {/* Simula o título AR756 */}
    <div className="flex items-center justify-end w-full space-x-3">
      <div className="w-[140px] h-10 bg-gray-200 animate-pulse rounded"/>
      <div className="flex-1 h-[1px] bg-gray-200"/>
    </div>
    
    {/* Simula o título GALERIA */}
    <div className="w-32 h-8 bg-gray-200 animate-pulse rounded ml-8 mt-8"/>
    
    {/* Simula o grid de imagens */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {[1,2,3,4,5,6].map((i) => (
        <div key={i} className="h-[180px] bg-gray-200 animate-pulse rounded-lg"/>
      ))}
    </div>
  </div>
);

// Importação dinâmica do componente
export const GaleriaCardLazy = dynamic(
  () => import('./galeriaCard'),
  {
    loading: GaleriaLoading,
    ssr: false
  }
); 