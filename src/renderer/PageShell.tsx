import React from 'react';

type PageShellProps = {
  children: React.ReactNode;
};

export const PageShell = ({ children }: PageShellProps) => {
  return (
    <React.StrictMode>
      {children}
    </React.StrictMode>
  );
};
