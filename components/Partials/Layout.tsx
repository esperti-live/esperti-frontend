import React from "react";
import Navigation from "./Navigation";

export default function Layout({ children }) {
  return (
    <div className="container">
      <Navigation />
      <main className="container">{children}</main>
    </div>
  );
}
