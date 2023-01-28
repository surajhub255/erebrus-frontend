import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { useAddress } from "@thirdweb-dev/react";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import erebrusABI from "../utils/erebrusABI.json";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

const Clients = () => {
  const provider = new ethers.providers.InfuraProvider(
    "maticmum",
    "bfa8e872ea014d979d17e288e0aea3e9"
  );
  const address = useAddress();
  const [isOwned, setIsOwned] = useState(false);
  const [apiData1, setApiData1] = useState(null);
  const [apiData2, setApiData2] = useState(null);
  const [isLoading1, setIsLoading1] = useState(false);

  useEffect(() => {
    if (address) {
      setIsOwned(false);
      const contract = new ethers.Contract(
        "0x3091EFF0b0a8E176D962456fc26110414704B01a",
        erebrusABI,
        provider
      );
      contract.balanceOf(address).then((balance) => {
        if (Number(balance) > 0) {
          setIsOwned(true);
        }
      });
      const fetchData = async () => {
        setIsLoading1(true);
        const response1 = await fetch("/api/getClients");
        let data1 = await response1.json();
        console.log(data1);
        data1 = data1.clients.filter((obj) => obj.WalletAddress === address);
        console.log(address);
        console.log(data1);
        setApiData1(data1);

        // const apiCalls = data1.clients.map((item) =>
        //   fetch(`/api/getClientConfig?UUID=${item.UUID}`)
        // );
        // const responses = await Promise.all(apiCalls);
        // const data2 = await Promise.all(responses.map((res) => res.json()));
        // setApiData2(data2);
        // console.log(data2);
        setIsLoading1(false);
      };

      fetchData();
    }
  }, [address]);

  if (!address) {
    return (
      <>
        <Head>
          <title>Erebrus | Clients</title>
        </Head>
        <Navbar />
        <div className="flex justify-center mt-48 text-white bg-black h-screen">
          Please connect your wallet to view your VPN clients
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Erebrus | Clients</title>
      </Head>
      <Navbar />
      {isOwned ? (
        <div className="container flex flex-wrap w-100 justify-center lg:items-center items-start mx-auto px-4 bg-black text-white h-screen pt-8 pb-8 mt-8 lg:-mt-8">
          {isLoading1 ? (
            <div className="bg-black h-screen">Loading...</div>
          ) : apiData1 ? (
            apiData1.map((item1, index) => (
              <div className="mb-12 " key={item1.UUID}>
                <div className="flex flex-col">
                  <div className="card-header">
                    <h2 className="text-xl font-bold leading-tight">
                      {item1.Name}
                    </h2>
                  </div>
                  <div className="card-body">
                    <p className="mt-2 text-gray-700 w-40 mb-4">{item1.UUID}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center text-white bg-black">
              <p className="mb-4">You have not created any clients yet.</p>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
                className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg "
              >
                <Link href="/demo">Create new client</Link>
              </motion.div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center mt-48 text-white bg-black h-screen">
          Please mint an Erebrus NFT to view your VPN client
        </div>
      )}
    </>
  );
};

export default Clients;
