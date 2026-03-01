import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-8">
      &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
    </footer>
  );
};

export default Footer;
