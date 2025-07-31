import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-surface shadow-theme rounded-theme p-4 sticky top-[calc(var(--header-h)+16px)] h-fit">
      <div className="font-bold mb-2">Sections</div>
      <ul className="space-y-1">
        <li><NavLink to="/" className="block px-2 py-2 rounded-md hover:bg-bg/50">Dashboard</NavLink></li>
        <li><NavLink to="/about" className="block px-2 py-2 rounded-md hover:bg-bg/50">About</NavLink></li>
        <li><NavLink to="/contact" className="block px-2 py-2 rounded-md hover:bg-bg/50">Contact</NavLink></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
