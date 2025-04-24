import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Componente de loading que simula a estrutura do formulário
const ConsultarLoading = () => (
  <div className="rounded-md lg:max-w-[500px] lg:max-h-[650px] max-w-[390px] w-full my-10 
    relative md:rounded-md py-5 px-5 flex flex-col gap-y-5 md:mt-2 bg-white">
    {/* Simula o título */}
    <div className="h-8 bg-gray-200 rounded-md w-3/4 mx-auto animate-pulse"/>
    
    {/* Simula os campos do formulário */}
    <div className="space-y-4">
      {/* Campo Nome */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 w-20 rounded animate-pulse"/>
        <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"/>
      </div>
      
      {/* Campo Email */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 w-20 rounded animate-pulse"/>
        <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"/>
      </div>
      
      {/* Campo WhatsApp */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 w-20 rounded animate-pulse"/>
        <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"/>
      </div>
    </div>
  </div>
);

const DynamicConsultarForm = dynamic(
  () => import('./index').then(mod => mod.ConsultarFormComponent),
  {
    loading: ConsultarLoading,
    ssr: false
  }
);

// Wrapper component to handle Suspense
export const ConsultarFormLazy = (props: any) => (
  <Suspense fallback={<ConsultarLoading />}>
    <DynamicConsultarForm {...props} />
  </Suspense>
); 