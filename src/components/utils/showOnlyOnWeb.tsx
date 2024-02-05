import { ReactNode } from 'react';

interface ShowOnlyOnMobileProps {
  children: ReactNode;
}
export function ShowOnlyOnWebComponent({ children }: ShowOnlyOnMobileProps) {
  return <span className="hidden md:block">{children}</span>;
}
