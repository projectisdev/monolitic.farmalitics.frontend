import React, { ReactNode } from 'react';

type MinimalLayoutProps = {
  children: ReactNode;
};

export const MinimalLayout = ({ children }: MinimalLayoutProps) => {
  return (
    <div>
      {/* Layout simple */}
      {children}
    </div>
  );
};