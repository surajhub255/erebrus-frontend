import Link from "next/link";
import { useState } from "react";
import {
  useNetworkMismatch,
  useNetwork,
  useAddress,
  ChainId,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { motion } from "framer-motion";
const variants = {
  open: { opacity: 1, x: 0, y: 0 },
  closed: { opacity: 0, y: 0 },
};

const Navbar = ({ isHome }) => {
  const [isOpen, setIsOpen] = useState(false);

  const address = useAddress();

  const [, switchNetwork] = useNetwork();
  const isMismatched = useNetworkMismatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-transparent py-4">
      <div
        className={`container mx-auto px-6 flex items-center justify-between lg:mb-0 ${
          isHome && !isOpen ? "mb-24" : ""
        }`}
      >
        <div className="flex items-center">
          <Link href="/" scroll={false}>
            <div className="block -mb-8 -mt-8">
              <img src="/logo.svg" alt="Logo" className="w-20" />
            </div>
          </Link>
          <Link href="/" scroll={false}>
            <h1 className="text-xl font-bold text-white ml-2">EREBRUS</h1>
          </Link>
        </div>
        <div className="hidden lg:flex items-center">
          <Link href="/#about" scroll={false} className="text-gray-300 mr-8">
            About
          </Link>
          <Link href="/demo" className="text-gray-300 mr-8">
            Demo
          </Link>
          <Link href="/mint" className="text-gray-300 mr-8" scroll={false}>
            Mint
          </Link>
          <Link href="/clients" className="text-gray-300 mr-8">
            Clients
          </Link>
          {isMismatched && (
            <button
              className="text-purple-400 mr-12"
              onClick={() => switchNetwork(ChainId.Mumbai)}
            >
              Switch To Mumbai
            </button>
          )}
          <div className="lg:mt-0 mt-4 lg:mr-20 z-50 rounded-xl bg-white">
            <ConnectWallet />
          </div>
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
                <Link
                  href="/#about"
                  className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                  scroll={false}
                >
                  About
                </Link>
                <Link
                  href="/demo"
                  className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                  scroll={false}
                >
                  Demo
                </Link>
                <Link
                  href="/mint"
                  className="text-white font-bold block lg:inline-block lg:mr-0 mb-4 lg:mb-0"
                  scroll={false}
                >
                  Mint
                </Link>
                <Link
                  href="/clients"
                  className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                >
                  Clients
                </Link>
                {isMismatched && (
                  <button
                    className="text-purple-400"
                    onClick={() => switchNetwork(ChainId.Mumbai)}
                  >
                    Switch To Mumbai
                  </button>
                )}
                <div className="lg:mt-0 mt-4 lg:mr-20 z-50 rounded-xl">
                  <ConnectWallet />
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.nav>
    </nav>
  );
};

export default Navbar;
