import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-transparent py-4">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="block -mb-8 -mt-8">
            <img src="/logo.svg" alt="Logo" className="w-20" />
          </div>
          {/* <h1 className="text-xl font-bold text-white ml-2">EREBRUS</h1> */}
        </div>
        <div className="hidden lg:flex items-center">
          <Link href="/#about" scroll={false} className="text-gray-300 mr-8">
            About
          </Link>
          <Link href="/#features" className="text-gray-300 mr-8" scroll={false}>
            Features
          </Link>
          <Link
            href="/demo"
            className="text-gray-300 mr-8"
            target={"_blank"}
            scroll={false}
          >
            Tutorial
          </Link>
          <Link
            href="/demo"
            className="bg-transparent border border-gray-400 text-gray-300 font-bold py-2 px-4 rounded-lg"
            target={"_blank"}
          >
            Sign Up
          </Link>
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
      {isOpen && (
        <div className="bg-transparent py-4">
          <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center lg:justify-between">
            <div className="flex flex-col lg:flex-row items-center">
              <Link
                href="/#about"
                className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                scroll={false}
              >
                About
              </Link>
              <Link
                href="/#features"
                className="text-white font-bold block lg:inline-block lg:mr-0 mb-4 lg:mb-0"
                scroll={false}
              >
                Features
              </Link>
              <Link
                href="/demo"
                className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                scroll={false}
                target={"_blank"}
              >
                Tutorial
              </Link>
              <Link
                href="/demo"
                className="bg-transparent border border-gray-400 text-gray-300 font-bold py-2 px-4 rounded-lg"
                target={"_blank"}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
