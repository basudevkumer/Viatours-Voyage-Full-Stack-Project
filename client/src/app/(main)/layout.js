import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import React from "react";

const HomeLayout = ({ children }) => {
  return (
    <div className="relaive">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
