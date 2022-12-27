import Head from "next/head";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import About from "../components/About";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Decentralized VPN Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col items-center justify-center h-screen -mt-16">
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-gray-800 mb-6"
          >
            Anonymous VPN
          </motion.h1>
          <p className="text-xl text-gray-600 mb-8">
            Protect your online privacy and security with our decentralized VPN
            service.
          </p>
          <Link
            href="/demo"
            className="bg-blue-500 text-white font-bold py-4 px-6 rounded-full"
          >
            Get started
          </Link>
        </div>
      </div>
      <About />
    </div>
  );
}
