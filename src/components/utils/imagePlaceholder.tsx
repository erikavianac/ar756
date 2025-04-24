'use client';

interface ImagePlaceholderProps {
  w: string;
  h: string;
  className?: string;
}

export function ImagePlaceholder({ w, h, className }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label="Carregando imagem"
      className={`${w} ${h} relative overflow-hidden animate-pulse bg-gray-300 ${className}`}
      style={{
        background: 'linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 2s ease-in-out infinite, pulse 2.5s ease-in-out infinite'
      }}
    />
  );
} 