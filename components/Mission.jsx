"use client";
import React, { useEffect } from "react";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import Button from "./Button";
import Link from "next/link";

const Mission = () => {

  const { ref, inView } = useInView({ threshold: 0.3 });
  const animation = useAnimation();
  const animation2 = useAnimation();
  const animation3 = useAnimation();
  useEffect(() => {
    console.log("inView", inView);

    if (!inView) {
      animation.start({
        x: -300,
        opacity: 0,
        scale: 0,
      });
      animation2.start({
        scale: 0,
        opacity: 0,
        x: 300,
      });
      animation3.start({
        opacity: 0,
        y: 300,
      });
    } else {
      animation.start({
        x: 0,
        opacity: 1,
        scale: 1,
      });
      animation2.start({
        scale: 1,
        opacity: 1,
        x: 0,
      });
      animation3.start({
        y: 0,
        opacity: 1,
      });
    }
  }, [inView, animation, animation2, animation3]);
  return (
    <div ref={ref} className='h-screen  w-full flex items-center bg-[#080d1f]'>
      <div className='w-[85%] rounded-[50px] relative h-[85%] gradient-background mx-auto'>
        <div className='w-full h-full z-20 rounded-[50px] mission-bg'>
          <div className='w-full h-full z-20 rounded-[50px] lg:flex md:flex items-center justify-between  bg-gradient-to-tl from-primary2/20 to-primary2/20'>
            <motion.div
              transition={{ duration: 1.5 }}
              className='flex-col lg:w-2/3  lg:py-10 md:py-10 py-0 lg:px-20 md:px-20 px-10  h-[80%]  flex'
            >
              <h3
           
                className='text-white max-w-[600px] leading-none mb-16 lg:mt-0 md:mt-0 mt-16 text-3xl lg:text-[60px]'
              >
                Pioneering the DePIN Revolution
              </h3>
              <p className='text-base sm:text-[18px] mb-16 text-white font-thin'>
              Prepare to witness a groundbreaking leap in internet technology with the Erebrus Protocol,
               the vanguard in democratizing safe, private, and accessible internet through DePIN. 
               By seamlessly integrating decentralized VPN (ÐVPN) and decentralized WiFi (ÐWiFi) within a 
               robust infrastructure, Erebrus is set to redefine digital connectivity.
              </p>
             
              <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
          className="text-black font-bold py-3 text-center rounded-[8px] lg:w-[25%] md:w-[25%] w-1/2 z-10 bg-[#8EB9FF]" 
        >
          <Link href="/subscription">
          Our mission
          </Link>
        </motion.div>
            </motion.div>
            <div className='lg:w-1/3 md:w-1/3 w-full lg:flex justify-between h-[80%] lg:mt-0 md:mt-0 mt-10'>
              {/* <motion.div
                animate={animation}
                transition={{ type: "tween", duration: 1 }}
                className='w-[45%] self-start h-[65%] flex flex-col relative'
              >
                <Image
                  className='object-cover rounded-[10px]'
                  src={"/images/vault.jpg"}
                  fill
                  alt='access'
                />
                <h6
                  style={roboto.style}
                  className='font-semibold absolute text-4xl leading-tight self-center bottom-4 z-20 text-white w-[234px]'
                >
                  {" "}
                  DVPN
                </h6>
              </motion.div> */}
              <motion.div
                animate={animation2}
                transition={{ type: "tween", duration: 2 }}
                className='w-[90%] self-end  h-[90%] flex flex-col relative overflow-hidden hidden'
              >
                <Image
                  className='object-cover rounded-[10px]'
                  src={"/mission1.png"}
                  fill
                  alt='access'
                />
                <h6
              
                  className='font-medium absolute text-4xl leading-tight self-center bottom-4 z-20 text-white w-[250px]'
                >
                  {" "}
                  {/* Review System */}
                </h6>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Gradient Radial */}
        <div className='absolute rounded-[50px] top-0 bottom-0 w-full h-full element2 opacity-50 '></div>
      </div>
    </div>
  );
};

export default Mission;
