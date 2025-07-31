import { AI_NAME } from "../config";
import React from "react";


const Footer: React.FC = () => {
  return (
    <footer className="mt-6 pt-3 border-t border-black/10 dark:border-white/10 text-muted text-sm">
      <span>Built by {AI_NAME}</span>
    </footer>
  );
};

export default Footer;
