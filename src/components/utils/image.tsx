'use client';
import Image from 'next/image';
import { useState, memo } from 'react';
import { ImagePlaceholder } from './imagePlaceholder';

interface ImageComponentProps {
  w: string;
  h: string;
  src: string;
  alt: string;
  priority?: boolean;
  onClick?: () => void;
  imageClassname?: string;
  containerClassname?: string;
  isLargeImage?: boolean;
}

const ImageComponent = memo(function ImageComponent({
  w,
  h,
  src,
  alt,
  onClick,
  priority,
  imageClassname,
  containerClassname,
  isLargeImage,
}: ImageComponentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Validação do alt
  const validatedAlt = alt.trim() || 'Imagem sem descrição';

  // Função para validar a URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Se a URL for inválida, mostra o placeholder diretamente
  if (!isValidUrl(src) && !src.startsWith('/')) {
    return (
      <div 
        className={`${w} ${h} relative ${containerClassname}`}
        role="img"
        aria-label="Imagem não disponível"
      >
        <ImagePlaceholder 
          w={w} 
          h={h} 
          className="absolute inset-0"
        />
      </div>
    );
  }

  if (hasError) {
    return (
      <div 
        className={`${w} ${h} relative ${containerClassname}`}
        role="img"
        aria-label="Erro ao carregar imagem"
      >
        <ImagePlaceholder 
          w={w} 
          h={h} 
          className="absolute inset-0"
        />
      </div>
    );
  }

  return (
    <div 
      className={`${w} ${h} relative ${containerClassname}`}
      role="img"
      aria-label={validatedAlt}
    >
      {isLoading && (
        <ImagePlaceholder 
          w={w} 
          h={h} 
          className="absolute inset-0"
          aria-hidden="true"
        />
      )}
      <Image
        src={src}
        priority={priority}
        alt={validatedAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ 
          objectFit: 'cover',
          transform: isLoading ? 'scale(0.95)' : 'scale(1)',
          opacity: isLoading ? 0 : 1,
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
        }}
        className={`h-full w-full ${imageClassname}`}
        onClick={onClick}
        quality={isLargeImage ? 90 : 60}
        loading={priority ? 'eager' : 'lazy'}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJyEkMj84OC8xOi4uNTQ6Rjo4NS45OkU9PURYQz5GOTs6Tj5FREVBSEb/2wBDAR"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        aria-hidden={isLoading}
      />
    </div>
  );
});

export { ImageComponent };
