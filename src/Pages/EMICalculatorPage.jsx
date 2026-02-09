import React, { lazy, Suspense } from "react";
import Navbar from "../aadharhomes/navbar/Navbar";
import Footer from "../Components/Actual_Components/Footer";

const EMICalculator = lazy(() => import("../Components/EMICalculator"));

export default function EMICalculatorPage() {
  return (
    <div style={{ background: "#fff" }}>
      <Navbar />
      <main className="pt-24 md:pt-[72px] pb-10"> {/* space for fixed navbar */}
        <div style={containerStyle}>
          <h1 style={titleStyle}>EMI Calculator</h1>
          <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
            <EMICalculator />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const containerStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: 16,
};

const titleStyle = {
  fontSize: 28,
  fontWeight: 800,
  margin: "0 0 12px",
  color: "#111",
};
