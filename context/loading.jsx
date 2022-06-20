import React, { createContext, useState } from 'react';

export const LoadingContext = createContext([]);

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  function increseLoading() {
    setLoading(true);
  }

  function decreaseLoading() {
    setLoading(false);
  }

  return (
    <LoadingContext.Provider value={{
      decreaseLoading, increseLoading, loading,
    }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
