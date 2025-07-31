import React, { useState } from "react";
import { useTheme, ThemeName } from "../theme/ThemeContext";

type Props = { isOpen: boolean; onClose: () => void };

const PreviewModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  if (!isOpen) return null;

  const width = device === "desktop" ? 1100 : device === "tablet" ? 820 : 390;

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-[200] p-4">
      <div className="bg-surface text-fg w-full max-w-5xl rounded-theme shadow-theme p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-bold">Live Preview</div>
          <button className="border border-muted rounded-md px-3 py-1.5" onClick={onClose}>Close</button>
        </div>

        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex gap-2">
            <button className={`border border-muted rounded-full px-3 py-1 ${device==="desktop"?"bg-primary text-white":""}`} onClick={() => setDevice("desktop")}>Desktop</button>
            <button className={`border border-muted rounded-full px-3 py-1 ${device==="tablet"?"bg-primary text-white":""}`} onClick={() => setDevice("tablet")}>Tablet</button>
            <button className={`border border-muted rounded-full px-3 py-1 ${device==="mobile"?"bg-primary text-white":""}`} onClick={() => setDevice("mobile")}>Mobile</button>
          </div>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeName)}
            className="bg-bg text-fg border border-muted rounded-md px-2 py-2"
            aria-label="Switch theme in preview"
          >
            <option value="theme-1">Theme 1 — Minimal</option>
            <option value="theme-2">Theme 2 — Dark + Sidebar</option>
            <option value="theme-3">Theme 3 — Colorful Cards</option>
          </select>
        </div>

        <div className="overflow-auto bg-bg border border-black/10 rounded-theme p-4">
          <iframe
            title="preview-frame"
            className="block mx-auto bg-white"
            style={{ width: width + "px", height: "600px", border: "none" }}
            srcDoc={`
              <!doctype html>
              <html>
                <head>
                  <meta charset='utf-8' />
                  <meta name='viewport' content='width=device-width, initial-scale=1' />
                  <style>
                    body { margin:0; font-family: system-ui, -apple-system, Arial, sans-serif; }
                    .skeleton { padding: 24px; }
                    .bar { height: 48px; background: #e5e7eb; margin-bottom: 16px; }
                    .block { height: 120px; background: #f3f4f6; margin-bottom: 12px; border-radius: 8px; }
                    .grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 12px; }
                    .cell { height: 140px; background: #f3f4f6; border-radius: 10px; grid-column: span 6; }
                    @media (max-width: 900px){ .cell { grid-column: span 12; } }
                  </style>
                </head>
                <body>
                  <div class='skeleton'>
                    <div class='bar'></div>
                    ${theme === "theme-3"
                      ? '<div class="grid"><div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div></div>'
                      : '<div class="block"></div><div class="block"></div><div class="block"></div>'
                    }
                  </div>
                </body>
              </html>
            `}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
