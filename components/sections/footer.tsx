import React from "react";

const Footer = () => {
  return (
    <footer className="h-fit w-full py-10 bg-purple-300 flex items-center justify-center border-t-2 border-solid border-black">
      <h1 className="text-black">
        &copy; {new Date().getFullYear()} Qagura. All rights reserved.
      </h1>
    </footer>
  );
};

export default Footer;
