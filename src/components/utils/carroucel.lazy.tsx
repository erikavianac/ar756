import dynamic from 'next/dynamic';

// Componente de loading que simula a estrutura do carrossel
const CarrouselLoading = () => (
  <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-md">
    <div className="flex items-center justify-center h-full">
      <div className="space-x-4 flex">
        {[1,2,3].map((i) => (
          <div key={i} className="w-[200px] h-[200px] bg-gray-300 rounded-md"/>
        ))}
      </div>
    </div>
  </div>
);

// Importação dinâmica do componente
export const CarrouselLazy = dynamic(
  () => import('./carroucelv2').then(mod => mod.default),
  {
    loading: CarrouselLoading,
    ssr: false
  }
); 