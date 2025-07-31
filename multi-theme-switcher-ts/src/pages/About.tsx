import React from "react";
import Card from "../components/Card";

const About: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-[var(--size-h1)] font-bold">About</h1>
      <Card title="Our Mission">
        We built this app to demonstrate a multi-theme architecture with clear structural and visual differences.
      </Card>
      <Card title="Tech">
        React + TypeScript + Vite + Tailwind + React Router. No large UI libraries.
      </Card>
    </div>
  );
};

export default About;
