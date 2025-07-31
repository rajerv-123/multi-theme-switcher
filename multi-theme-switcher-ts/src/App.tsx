import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./theme/ThemeContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import PreviewModal from "./components/PreviewModal";

const App: React.FC = () => {
  const { theme } = useTheme();
  const withSidebar = theme === "theme-2";
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col`}>
      <Header onOpenPreview={() => setIsPreviewOpen(true)} />

      <div className={`flex flex-1 ${withSidebar ? "md:grid md:grid-cols-[240px_1fr]" : ""}`}>
        {withSidebar && (
          <aside className="hidden md:block pt-[calc(var(--header-h)+16px)] px-4">
            <Sidebar />
          </aside>
        )}

        <main className="pt-[calc(var(--header-h)+16px)] px-4 max-w-6xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </main>
      </div>

      <PreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </div>
  );
};

export default App;
