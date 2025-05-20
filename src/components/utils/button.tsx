import { Kumbh_Sans } from 'next/font/google';
import { ButtonHTMLAttributes, ReactNode } from 'react';

import { useAnimation } from 'framer-motion';
const kumbh_sans = Kumbh_Sans({ subsets: ['latin'], weight: '400' });
interface Props extends ButtonHTMLAttributes<any> {
  title?: string;
  className?: string;
  icon?: ReactNode;
  titleClassname?: string;
  isLoading?: boolean;
}

export function ButtonComponent({ 
  title, 
  className, 
  icon, 
  titleClassname, 
  isLoading,
  disabled,
  ...rest 
}: Props) {
  return (
    <button
      {...rest}
      className={`${className} ${kumbh_sans}`}
      aria-label={!title && icon ? "Botão" : undefined}
      aria-disabled={disabled}
      aria-busy={isLoading}
      disabled={disabled}
    >
      {icon ? icon : null}
      <p className={titleClassname}>{title}</p>
    </button>
  );
}
