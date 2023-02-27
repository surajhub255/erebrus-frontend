import Head from "next/head";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useAddress } from "@thirdweb-dev/react";

export default function Home() {
  const address = useAddress();

  return (
    <div>
      <Head>
        <title>Erebrus</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="container mx-auto px-6 py-10 h-screen">
        <div className="flex flex-col items-center justify-center2lg:h-full lg:mt-32 md:mt-16 mt-8 lg:ml-0 lg:mr-0 md:ml-0 md:mr-0 ml-4 mr-4 mb-36 lg:mb-0 ">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            className="text-4xl lg:text-5xl  font-bold text-gray-300 mb-6 lg:w-[43%] lg:text-center md:text-center md:w-[60%]"
          >
            Connect your wallet and sign in to Erebrus
          </motion.h1>
        </div>
        {/* if wallet is connected, show a button to sign the message*/}
      </div>
    </div>
  );
}
