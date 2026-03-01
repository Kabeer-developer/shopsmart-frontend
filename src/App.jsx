import React from "react";
import Navbar from "./components/Navbar";  // Part 1 & 3 (Admin link)
import Footer from "./components/Footer";  // Part 1
import AppRoutes from "./routes";          // Parts 2 & 3


const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto p-4">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default App;
