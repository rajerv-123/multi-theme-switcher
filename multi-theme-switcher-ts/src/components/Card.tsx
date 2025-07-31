import React from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
};

const Card: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="bg-bg border border-black/10 dark:border-white/10 rounded-theme shadow-theme p-4">
      <div className="text-lg font-bold mb-2">{title}</div>
      <div className="text-muted">{children}</div>
    </div>
  );
};

export default Card;
