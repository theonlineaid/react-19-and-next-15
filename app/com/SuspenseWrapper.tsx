import React, { ReactNode, Suspense } from 'react';
import RootLoading from '../loading';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional fallback prop
}

export default function SuspenseWrapper({ children, fallback = <RootLoading /> }: SuspenseWrapperProps) {
  return (
    <div>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  );
}
