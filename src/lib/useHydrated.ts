"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the Zustand persisted store has rehydrated
 * from sessionStorage.  Prevents flash of wrong content on load.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
