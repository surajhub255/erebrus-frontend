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
      transition: { duration: 0.2 },
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
      <div className="mb-2 font-figtree w-[60%] text-center">
        <motion.h2
          animate={animation}
          initial="hidden"
          variants={itemVariants}
          className="font-bold text-4xl mb-10 lg:mt-36 text-gray-200 text-left"
        >
         Be a part of Decentralized <br></br>Internet
        </motion.h2>
      </div>
      <div className="w-[60%]">
        <motion.div
          animate={itemAnimation}
          initial="hidden"
          variants={itemVariants}
          className="flex lg:mb-12 lg:flex-row flex-col justify-center items-start gap-4"
        >
          <div className="lg:w-[50%] pt-24 pb-5 px-6 rounded-2xl text-black" style={{backgroundColor: '#8EB9FF'}}>
            <span className="text-4xl mr-6">⛓</span>
            <div className="flex flex-col mt-4">
              <motion.h1 className="font-bold text-3xl">
                Power of <br></br>Decentralization
              </motion.h1>
              <motion.p className="lg:w-[80%] text-sm font-semibold mt-4">
                Equipped with Blockchain based Security and verified Hosting
                Providers, you get to experience the true power of
                decentralization.
              </motion.p>
            </div>
          </div>
          <div className="lg:w-[50%] pt-28 pb-6 px-6 rounded-2xl text-black" style={{backgroundColor: '#E3EEFF'}}>
            <span className="text-4xl mr-6">⚡️</span>
            <div className="flex flex-col mt-4">
              <motion.h1 className="font-bold text-3xl">
                Fast Speed & <br></br>Unlimited Bandwidth.
              </motion.h1>
              <motion.p className="lg:w-[80%] text-sm font-semibold mt-4">
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
          className="flex lg:flex-row flex-col justify-center items-start lg:mb-12 gap-4"
        >
          <div className="lg:w-[50%] pt-32 pb-10 px-6 rounded-2xl text-white" style={{backgroundColor: '#3985FF'}}>
            <span className="text-4xl mr-6">🌐</span>
            <div className="flex flex-col mt-4">
              <motion.h1 className="font-bold text-3xl">
                IP Address Protection
              </motion.h1>
              <motion.p className="lg:w-[80%] text-sm font-semibold mt-4">
                Hide your IP address and location from websites and applications
                to keep your search history and downloads private.
              </motion.p>
            </div>
          </div>
          <div className="lg:w-[50%] pt-32 pb-10 px-6 rounded-2xl text-white" style={{backgroundColor: '#0162FF'}}>
            <span className="text-4xl mr-6">📱</span>
            <div className="flex flex-col mt-4">
              <motion.h1 className="font-bold text-3xl">
                Multiple Devices
              </motion.h1>
              <motion.p className="lg:w-[80%] text-sm font-semibold mt-4">
                Now you can access a fast and secure internet connection on
                multiple devices!
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
          <div className="pt-32 pb-10 px-6 rounded-2xl text-white" style={{backgroundColor: '#202333'}}>
            <span className="text-4xl mr-6">🖼</span>
            <div className="flex flex-col mt-4">
              <motion.h1 className="font-bold text-3xl">
                NFT Subscriptions
              </motion.h1>
              <motion.p className="lg:w-[60%] text-sm font-semibold mt-4">
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
