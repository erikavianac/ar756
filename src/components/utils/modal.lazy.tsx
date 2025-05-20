'use client';
import dynamic from 'next/dynamic';
import { ImagePlaceholder } from './imagePlaceholder';

// Componente de loading personalizado para o modal
const ModalLoading = () => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
    <div className="bg-white p-4 rounded-md">
      <ImagePlaceholder 
        w="w-12" 
        h="h-12" 
        className="animate-pulse"
      />
    </div>
  </div>
);

// Importação dinâmica do Modal
const ModalComponent = dynamic(
  () => import('./modal').then(mod => mod.ModalComponent),
  {
    loading: () => <ModalLoading />,
    ssr: false // Desativamos SSR para o modal pois ele usa document
  }
);

export default ModalComponent; 