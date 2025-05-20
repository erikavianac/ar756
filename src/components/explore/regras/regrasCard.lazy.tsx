import dynamic from 'next/dynamic';

// Componente de loading que simula a estrutura das regras
const RegrasLoading = () => (
  <div className="w-full h-full bg-white rounded-lg p-5 flex flex-col gap-y-5">
    {/* Simula o título AR756 */}
    <div className="flex items-center justify-end w-full space-x-3">
      <div className="w-[140px] h-10 bg-gray-200 animate-pulse rounded"/>
      <div className="flex-1 h-[1px] bg-gray-200"/>
    </div>
    
    {/* Simula o título SOBRE */}
    <div className="w-32 h-8 bg-gray-200 animate-pulse rounded ml-8 mt-8"/>
    
    {/* Simula o conteúdo */}
    <div className="space-y-4 mt-4">
      <div className="h-40 bg-gray-200 animate-pulse rounded-lg"/>
      <div className="space-y-2">
        {[1,2,3].map((i) => (
          <div key={i} className="h-4 bg-gray-200 animate-pulse rounded w-full"/>
        ))}
      </div>
    </div>
  </div>
);

// Importação dinâmica do componente
export const RegrasCardLazy = dynamic(
  () => import('./regrasCard').then(mod => mod.RegrasCardComponent),
  {
    loading: RegrasLoading,
    ssr: false
  }
); 