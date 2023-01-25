import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const Features = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      image: "/image1.jpeg",
      title: "IP Address Protection",
      description:
        "Hide your IP address and location from websites and applications to keep your search history and downloads private.",
    },
    {
      image: "/image2.jpeg",
      title: "Multiple Devices",
      description:
        "Now you can access a fast and secure internet connection on multiple devices! Connect to up to 2 devices starting on our starter plan.",
    },
    {
      image: "/image3.jpeg",
      title: "Power of Decentralization",
      description:
        "Equipped with Blockchain based Security and verified Hosting Providers, you get to experience the true power of decentralization. Pay using cryptocurrencies and surf the internet securely - Anonymous Browsing without sacrificing speed or bandwidth had never been this easy.",
    },
  ];

  useEffect(() => {}, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((currentIndex + items.length - 1) % items.length);
  };

  return (
    <div id="features" className="scroll-mt-40">
      <main>
        <h1 className="text-4xl lg:text-6xl font-bold text-center mb-20 mt-14 text-white font-figtree">
          Product Features
        </h1>
        <div className="flex items-center justify-center mt-12">
          <button
            onClick={handlePrevious}
            className="text-gray-500 hover:text-gray-700 mr-8 mb-80"
          >
            Previous
          </button>

          <section className="lg:mb-64 mb-36">
            <AnimatePresence>
              <motion.div
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                exit={{ x: -100 }}
                transition={{ duration: 1 }}
                className="mx-auto max-w-sm rounded-lg shadow-lg overflow-hidden bg-white"
              >
                <Image
                  src={items[currentIndex].image}
                  alt="Feature image"
                  width={500}
                  height={500}
                />
                <div className="px-6 py-4 ">
                  <h2 className="font-bold text-xl mb-2">
                    {items[currentIndex].title}
                  </h2>
                  <p className="text-gray-700 text-base">
                    {items[currentIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
          <button
            onClick={handleNext}
            className="text-gray-500 hover:text-gray-700 ml-8 mb-80"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Features;
