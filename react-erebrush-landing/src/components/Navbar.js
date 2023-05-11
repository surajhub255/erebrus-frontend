import { useState } from "react";
import { motion } from "framer-motion";
const variants = {
  open: { opacity: 1, x: 0, y: 0 },
  closed: { opacity: 0, y: 0 },
};

const Navbar = ({ isHome }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-transparent py-4">
      <div
        className={`container mx-auto px-6 flex items-center justify-between lg:mb-0 `}
      >
        <div className="flex items-center">
          <a href="/" scroll={false}>
            <div className="block -mb-8 -mt-8">
              <img src="/logo.svg" alt="Logo" className="w-20" />
            </div>
          </a>
          <a href="/" scroll={false}>
            <h1 className="text-xl font-bold text-white ml-2">EREBRUS</h1>
          </a>
        </div>
        <div className="hidden lg:flex items-center">
          <a href="/#features" scroll={false} className="text-gray-300 mr-8">
            Features
          </a>
          <a href="/#howto" scroll={false} className="text-gray-300 mr-8">
            How To
          </a>
          <a href="/#pricing" className="text-gray-300 mr-8" scroll={false}>
            Pricing
          </a>

          <a
            href="/demo"
            className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg"
          >
            Sign Up
          </a>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 rounded-full text-gray-300"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <motion.nav animate={isOpen ? "open" : "closed"} variants={variants}>
        {isOpen && (
          <div className="bg-transparent py-4">
            <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center lg:justify-between">
              <div className="flex flex-col lg:flex-row items-center">
                <a
                  href="/#features"
                  className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                  scroll={false}
                >
                  Features
                </a>
                <a
                  href="/#howto"
                  className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                  scroll={false}
                >
                  How To
                </a>
                <a
                  href="/#pricing"
                  className="text-white font-bold block lg:inline-block lg:mr-0 mb-4 lg:mb-0"
                  scroll={false}
                >
                  Pricing
                </a>
                <a
                  href="https://app.erebrus.io/"
                  className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg lg:mr-0 lg:mb-0"
                  target={"_blank"}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        )}
      </motion.nav>
    </nav>
  );
};

export default Navbar;
