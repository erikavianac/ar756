'use client';
import Image from 'next/legacy/image';

interface ImageComponentProps {
  w: string;
  h: string;
  src: string;
  alt: string;
  priority?:boolean;
  onclik?: () => void;
  imageClassname?: string;
  containerClassname?: string;
}

export function ImageComponent({
  w,
  h,
  src,
  alt,
  onclik,
  priority,
  imageClassname,
  containerClassname,
}: ImageComponentProps) {
  return (
    <div className={`${w} ${h} relative ${containerClassname}`}>
      <Image
        src={src}
        priority={priority}
        alt={alt}
        layout="fill"
        objectFit={'cover'}
        className={`h-full w-full ${imageClassname}`}
        onClick={() => onclik && onclik()}
      />
    </div>
  );
}
