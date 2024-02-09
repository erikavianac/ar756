import { ReactNode } from 'react';

interface ShowOnlyOnMobileProps {
  children: ReactNode;
}
export function ShowOnlyOnMobileComponent({ children }: ShowOnlyOnMobileProps) {
  return <span className="block lg:hidden">{children}</span>;
}
