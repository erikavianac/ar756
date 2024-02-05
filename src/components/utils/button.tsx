import { Kumbh_Sans } from 'next/font/google';
import { ButtonHTMLAttributes, ReactNode } from 'react';

import { useAnimation } from 'framer-motion';
const kumbh_sans = Kumbh_Sans({ subsets: ['latin'], weight: '400' });
interface Props extends ButtonHTMLAttributes<any> {
  title?: string;
  className?: string;
  icon?: ReactNode;
  titleClassname?: string;
}

export function ButtonComponent({ title, className, icon, titleClassname, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`${className} ${kumbh_sans}`}
    >
      {icon ? icon : null}
      <p className={titleClassname}>{title}</p>
    </button>
  );
}
