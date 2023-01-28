import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const About = () => {
  const [aboutRef, setAboutRef] = useState(null);
  const animation = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.getBoundingClientRect().top < window.innerHeight) {
        animation.start("visible");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [aboutRef, animation]);

  return (
    <div
      id="about"
      ref={setAboutRef}
      className="flex flex-col items-center justify-center lg:scroll-mt-56 scroll-mt-32"
    >
      <div className="text-center mb-12 font-figtree">
        <motion.h2
          animate={animation}
          initial="hidden"
          variants={{
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.5 },
            },
            hidden: {
              y: -20,
              opacity: 0,
            },
          }}
          className="font-bold text-4xl lg:text-6xl mb-2 text-gray-200"
        >
          About
        </motion.h2>
      </div>
      <div className="lg:w-[50%] w-[60%]">
        <motion.h1
          animate={animation}
          initial="hidden"
          variants={{
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.5 },
            },
            hidden: {
              y: 20,
              opacity: 0,
            },
          }}
          className="text-2xl lg:text-2xl font-figtree font-bold opacity-50 text-gray-400 lg:mb-60 mb-36"
        >
          Erebrus VPN uses WireGuard® P2P VPN Solution for bypassing IP
          Fingerprinting to provide secure & private access to geo-restricted
          content. Users get to choose the VPN Connection from various countries
          and change IP addresses upon their requirements. This means they get
          access to their favorite content without sacrificing speed or
          bandwidth in case the content provider detects a VPN and tries to
          block the access. Our platform is capable of getting new anonymous VPN
          IP addresses on the go just by a simple form filled by the user.
        </motion.h1>
      </div>
    </div>
  );
};

export default About;
