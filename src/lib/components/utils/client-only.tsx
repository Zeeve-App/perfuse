"use client";
import React, { useState, useEffect, PropsWithChildren } from "react";

interface ClientOnlyProps extends PropsWithChildren {}

const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
