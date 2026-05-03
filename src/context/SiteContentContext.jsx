import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch } from "../lib/api.js";
import { getFallbackPayload } from "../site/fallbackPayload.js";

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const fallback = useMemo(() => getFallbackPayload(), []);
  const [payload, setPayload] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/api/content");
      setPayload(data.payload);
      setError(null);
    } catch (e) {
      setError(e.message);
      setPayload(fallback);
    } finally {
      setLoading(false);
    }
  }, [fallback]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const value = useMemo(
    () => ({
      payload,
      loading,
      error,
      refetch,
    }),
    [payload, loading, error, refetch],
  );

  return (
    <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return ctx;
}
