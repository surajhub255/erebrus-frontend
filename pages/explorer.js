import React, { useEffect, useState} from "react";
import Link from "next/link";
import NodesData from "../components/NodesData";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";

const DvpnMap = dynamic(() => import('../components/DvpnMap'), { ssr: false });
const EREBRUS_GATEWAY_URL = process.env.NEXT_PUBLIC_EREBRUS_BASE_URL;

const Explorer = () => {
  const [nodes, setNodes] = useState([]);
  const [activeMap, setActiveMap] = useState('pin');

  useEffect(() => {
    async function fetchNodes() {
      const response = await fetch(`${EREBRUS_GATEWAY_URL}api/v1.0/nodes/all`);
      const data = await response.json();
      setNodes(data.payload);
    }
    fetchNodes();
  }, []);

    return (
      <div className="bg-[#040819] ">
        <div className="mx-auto py-20 "
          style={{
            backgroundImage: 'radial-gradient(circle at left, rgba(86, 150, 255, 0.6) 4%, #0162FF80 10%, black 30%), url("/explorer4.png") ',  
              backgroundSize: 'cover',
              backgroundBlendMode: 'overlay',
            }}
            >
        <div className="flex flex-col items-start justify-start lg:h-full mt-10 lg:ml-0 lg:mr-0 md:ml-0 md:mr-0 ml-4 mr-4 mb-36 lg:mb-0 px-20 ">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            className="text-6xl font-semibold text-gray-300 mb-8 w-3/5"
          >
            Decentralized Access with 
            Erebrus ÐVPN
          </motion.h1>
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            className="text-2xl text-white mb-8"
          >
            <p>
            Unrestricted Uncensored Web Access
            </p>
          </motion.h1>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
            className="text-black font-bold py-3 px-10 rounded-full bg-white text-lg" 
            // style={{backgroundImage: 'linear-gradient(#FFFFFF00, #0099FF)'}}
          >
            <Link href="https://discord.com/invite/5uaFhNpRF6" target="_blank"
              rel="noopener noreferrer">
              Run Your Node
            </Link>
          </motion.div>
        </div>
      </div>
            {/* <img src="/mapRegions.png"/> */}
        <div className="bg-[#20253A] pt-16 px-20">
          <div className="text-2xl font-semibold text-gray-300 mb-8 "
          >
            Erebrus Decentralized VPN (ÐVPN) Network Nodes Overview
          </div>
          <div className="text-white"
          >
            <p>
            Explore the Erebrus decentralized VPN network with our interactive map. View detailed information on active nodes, including their location, network performance, and status. This map provides real-time insights into the global distribution and operation of our secure and private VPN infrastructure.
            </p>
          </div>
        </div>
        <div className="map-page" style={{ height: '100vh', width: '100vw' }}>
          <div className="map-container" style={{ height: '100%', width: '100%' }}>
              <DvpnMap nodes={nodes} />
          </div>
        </div>

        <NodesData />
      </div>
    )
}

export default Explorer;
