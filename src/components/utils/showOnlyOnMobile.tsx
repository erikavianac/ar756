import { ReactNode } from 'react';

interface ShowOnlyOnMobileProps {
  children: ReactNode;
}
export function ShowOnlyOnMobileComponent({ children }: ShowOnlyOnMobileProps) {
  return <span className="block md:hidden">{children}</span>;
}
