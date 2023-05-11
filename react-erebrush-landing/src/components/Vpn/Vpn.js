import { motion } from "framer-motion";

const Vpn=()=> {
  return (
    <div>
      <header>
        <title>Erebrus</title>
        <link rel="icon" href="/logo.svg" />
      </header>
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col items-center justify-start lg:h-full lg:mt-32 md:mt-16 mt-8 lg:ml-0 lg:mr-0 md:ml-0 md:mr-0 ml-4 mr-4 mb-36 lg:mb-0 ">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            className="text-4xl lg:text-5xl  font-bold text-gray-300 mb-6 lg:w-[43%] lg:text-center md:text-center md:w-[60%]"
          >
            Where decentralization meets VPN for ultimate internet security
          </motion.h1>
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            className="text-xl text-gray-600 mb-8 lg:w-[35%] lg:text-center md:text-center md:w-[60%]"
          >
            <p>
              Anonymous Virtual Private Network for accessing internet in
              stealth mode bypassing filewalls and filters
            </p>
          </motion.h1>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg "
          >
            <a href="https://app.erebrus.io/" target={"_blank"}>
              Get started
            </a>
          </motion.div>
        </div>
      </div>

    
    </div>
  );
}
export default Vpn;