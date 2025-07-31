import React from "react";
import Card from "../components/Card";
import { useProducts } from "../hooks/useProducts";
import { useTheme } from "../theme/ThemeContext";

const Home: React.FC = () => {
  const { theme } = useTheme();
  const { data, loading, error } = useProducts();

  return (
    <div className="space-y-6">
      <h1 className="text-[var(--size-h1)] font-bold">Home</h1>
      <p className="text-muted">This page fetches data from FakeStore API and shows cards. Theme selected: <b>{theme}</b></p>

      {loading && <div>Loading products…</div>}
      {error && <div role="alert">Failed to load products: {error}</div>}

      <div className={theme === "theme-3" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "space-y-4"}>
        {data.slice(0, 8).map(p => (
          <Card key={p.id} title={p.title}>
            <div className="flex gap-3 items-start">
              <img src={p.image} alt="" className="w-16 h-16 object-contain rounded-md border border-black/10" loading="lazy" />
              <div className="space-y-1">
                <div>${"{p.price.toFixed(2)}"}</div>
                <div className="text-sm opacity-80 line-clamp-3">{p.description}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
