import React, { useState } from "react";
import Card from "../components/Card";

const Contact: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks! We'll get back to you soon.");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-[var(--size-h1)] font-bold">Contact</h1>
      <Card title="Send us a message">
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block">
            <span className="block mb-1">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bg text-fg border border-muted rounded-md px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="block mb-1">Message</span>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-bg text-fg border border-muted rounded-md px-3 py-2 h-32"
            />
          </label>
          <button className="bg-primary text-white rounded-md px-4 py-2">Send</button>
        </form>
      </Card>
    </div>
  );
};

export default Contact;
