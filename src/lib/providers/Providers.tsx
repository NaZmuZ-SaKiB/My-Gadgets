"use client";

import ContextProvider from "./ContextProvider";
import QueryProvider from "./QueryProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ContextProvider>{children}</ContextProvider>
    </QueryProvider>
  );
};

export default Providers;
