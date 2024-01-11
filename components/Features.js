import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const Features = () => {
  const [aboutRef, setAboutRef] = useState(null);
  const animation = useAnimation();
  const itemAnimation = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.getBoundingClientRect().top < window.innerHeight) {
        animation.start("visible");
        itemAnimation.start("visible");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [aboutRef, animation, itemAnimation]);

  const itemVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    hidden: {
      y: -20,
      opacity: 0,
    },
  };

  return (
    <div
      id="features"
      ref={setAboutRef}
      className="flex flex-col items-center justify-start scroll-mt-16 lg:scroll-mt-0 mb-36 lg:mb-12"
    >
      <div className="mb-2 font-figtree lg:w-[40%] md:w-[60%] w-[85%] text-center">
        <motion.h2
          animate={animation}
          initial="hidden"
          variants={itemVariants}
          className="font-bold text-4xl lg:text-5xl mb-2 lg:mt-36  text-gray-200"
        >
          The Future of the Internet is Decentralized
        </motion.h2>
        <motion.h1
          animate={animation}
          initial="hidden"
          variants={itemVariants}
          className="text-xl lg:text-xl font-figtree opacity-50 text-white text-center lg:mb-24 mb-12"
        >
          Be a part of it.
        </motion.h1>
      </div>
      <div className="lg:w-[50%] w-[60%] lg:ml-16">
        <motion.div
          animate={itemAnimation}
          initial="hidden"
          variants={itemVariants}
          className="flex lg:mb-12 lg:flex-row flex-col justify-center items-start"
        >
          <div className="flex lg:w-[50%] lg:mb-0 mb-4">
            <span className="text-4xl mr-6">⛓</span>
            <div className="flex flex-col">
              <motion.h1 className="text-white font-bold text-xl">
                Power of Decentralization
              </motion.h1>
              <motion.p className="text-gray-400 lg:w-[80%]">
                Equipped with Blockchain based Security and verified Hosting
                Providers, you get to experience the true power of
                decentralization.
              </motion.p>
            </div>
          </div>
          <div className="flex lg:w-[50%] lg:mb-0 mb-4">
            <span className="text-4xl mr-6">⚡️</span>
            <div className="flex flex-col">
              <motion.h1 className="text-white font-bold text-xl">
                Fast Speed & Unlimited Bandwidth.
              </motion.h1>
              <motion.p className="text-gray-400 lg:w-[80%]">
                We offer speeds that match popular providers out there, allowing
                for a fast browsing experience.
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={itemAnimation}
          initial="hidden"
          variants={itemVariants}
          className="flex lg:flex-row flex-col justify-center items-start lg:mb-12"
        >
          <div className="flex lg:w-[50%] lg:mb-0 mb-4">
            <span className="text-4xl mr-6">🌐</span>
            <div className="flex flex-col">
              <motion.h1 className="text-white font-bold text-xl">
                IP Address Protection
              </motion.h1>
              <motion.p className="text-gray-400 lg:w-[80%]">
                Hide your IP address and location from websites and applications
                to keep your search history and downloads private.
              </motion.p>
            </div>
          </div>
          <div className="flex lg:w-[50%] lg:mb-0 mb-4">
            <span className="text-4xl mr-6">📱</span>
            <div className="flex flex-col">
              <motion.h1 className="text-white font-bold text-xl">
                Multiple Devices
              </motion.h1>
              <motion.p className="text-gray-400 lg:w-[80%]">
                Now you can access a fast and secure internet connection on
                multiple devices! Connect to up to 2 devices starting on our
                starter plan.
              </motion.p>
            </div>
          </div>
        </motion.div>
        <motion.div
          animate={itemAnimation}
          initial="hidden"
          variants={itemVariants}
          className="flex lg:flex-row flex-col justify-center items-center"
        >
          <div className="flex lg:w-[60%] lg:mb-0 mb-4">
            <span className="text-4xl mr-6">🖼</span>
            <div className="flex flex-col">
              <motion.h1 className="text-white font-bold text-xl">
                NFT Subscriptions
              </motion.h1>
              <motion.p className="text-gray-400 lg:w-[80%]">
                Pay using cryptocurrencies and surf the internet securely -
                Anonymous Browsing without sacrificing speed or bandwidth had
                never been this easy.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
