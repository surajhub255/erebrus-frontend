import Head from "next/head";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import About from "../components/About";
import Features from "../components/Features";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Erebrus</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Navbar isHome={true} />
      <div className="container mx-auto px-6 py-10 lg:-mt-24">
        <div className="flex flex-col items-center justify-start lg:justify-center lg:h-screen lg:ml-0 lg:mr-0 md:ml-0 md:mr-0 ml-4 mr-4 mb-36 lg:mb-0">
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl lg:text-5xl  font-bold text-gray-300 mb-6 lg:w-[35%] lg:text-center md:text-center "
          >
            Where decentralization meets VPN for ultimate internet security
          </motion.h1>
          <p className="text-xl text-gray-600 mb-8 lg:w-[35%] lg:text-center md:text-center">
            Anonymous Virtual Private Network for accessing internet in stealth
            mode bypassing filewalls and filters
          </p>
          <Link
            href="/demo"
            className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg "
          >
            Get started
          </Link>
        </div>
      </div>

      <About />
      <Features />
      <Contact />
    </div>
  );
}
