import dynamic from 'next/dynamic';

// Componente de loading que simula a estrutura do FAQ
const FaqLoading = () => (
  <div className="w-full h-full bg-white rounded-lg p-5 flex flex-col gap-y-5">
    {/* Simula o título AR756 */}
    <div className="flex items-center justify-end w-full space-x-3">
      <div className="w-[140px] h-10 bg-gray-200 animate-pulse rounded"/>
      <div className="flex-1 h-[1px] bg-gray-200"/>
    </div>
    
    {/* Simula o título FAQ */}
    <div className="w-32 h-8 bg-gray-200 animate-pulse rounded ml-8 mt-8"/>
    
    {/* Simula a barra de pesquisa */}
    <div className="w-full h-12 bg-gray-200 animate-pulse rounded-md mt-4"/>
    
    {/* Simula os itens do FAQ */}
    <div className="space-y-4 mt-4">
      {[1,2,3,4].map((i) => (
        <div key={i} className="w-full">
          <div className="h-14 bg-gray-200 animate-pulse rounded-md"/>
        </div>
      ))}
    </div>
  </div>
);

// Importação dinâmica do componente
export const FaqLazy = dynamic(
  () => import('./index').then(mod => mod.default),
  {
    loading: FaqLoading,
    ssr: false
  }
); 