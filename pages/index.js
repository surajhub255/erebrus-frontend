import Head from "next/head";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import About from "../components/About";
// import Features from "../components/Features";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Erebrus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="container mx-auto px-6 py-10 -mt-12">
        <div className="flex flex-col items-center justify-center h-screen -mt-16 lg:ml-0 lg:mr-0 md:ml-0 md:mr-0 ml-4 mr-4">
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl lg:text-5xl  font-bold text-gray-300 mb-6 lg:w-[35%] lg:text-center md:text-center "
          >
            Protect your online privacy and security with our decentralized VPN
            solution.
          </motion.h1>
          <p className="text-xl text-gray-600 mb-8 lg:w-[35%] lg:text-center md:text-center">
            Anonymous Virtual Private Network for accessing internet in stealth
            mode bypassing filewalls and filters
          </p>
          <Link
            href="/demo"
            target={"_blank"}
            className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg "
          >
            Get started
          </Link>
        </div>
      </div>

      <About />
      {/* <Features /> */}
    </div>
  );
}
