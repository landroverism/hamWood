"use client";

import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && <LoadingScreen />}
      {children}
    </>
  );
};

export default ClientLayout;
