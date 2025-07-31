import { useEffect, useState } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type State = {
  data: Product[];
  loading: boolean;
  error: string | null;
};

export function useProducts() {
  const [state, setState] = useState<State>({ data: [], loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setState({ data: [], loading: true, error: null });
        const res = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
          headers: {
            "Accept": "application/json",
          },
          // No credentials sent to third-party API (privacy)
          credentials: "omit",
          referrerPolicy: "no-referrer",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as Product[];
        setState({ data: json, loading: false, error: null });
      } catch (e: any) {
        if (e.name === "AbortError") return;
        setState({ data: [], loading: false, error: e?.message ?? "Failed to load" });
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return state;
}
