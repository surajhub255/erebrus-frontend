import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { useAddress } from "@thirdweb-dev/react";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import erebrusABI from "../utils/erebrusABI.json";

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
        const data1 = await response1.json();
        console.log(data1);
        setApiData1(data1.clients);

        const apiCalls = data1.clients.map((item) =>
          fetch(`/api/getClientConfig?UUID=${item.UUID}`)
        );
        const responses = await Promise.all(apiCalls);
        const data2 = await Promise.all(responses.map((res) => res.json()));
        setApiData2(data2);
        console.log(data2);
        setIsLoading1(false);
      };

      fetchData();
    }
  }, [address]);

  const mint = async () => {
    const providerMeta = new ethers.providers.Web3Provider(window.ethereum);
    const signer = providerMeta.getSigner();

    const contract = new ethers.Contract(
      "0x3091EFF0b0a8E176D962456fc26110414704B01a",
      erebrusABI,
      signer
    );

    contract.mintNFT({
      value: ethers.utils.parseEther("0.1"),
    });
  };

  if (!address) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center mt-48 text-white bg-black h-screen">
          Please connect your wallet to view your VPN clients
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {isOwned ? (
        <div className="container flex flex-wrap w-100 justify-center items-center mx-auto px-4 bg-black text-white lg:h-screen pt-8 pb-8">
          {isLoading1 ? (
            <div className="bg-black h-screen">Loading...</div>
          ) : (
            apiData1 &&
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
                    {apiData2 && apiData2[index] ? (
                      <div>
                        <QRCode value={apiData2[index]} />
                        <div className="mt-4 mr-20">
                          <a
                            href={`data:application/octet-stream,${encodeURIComponent(
                              apiData2[index]
                            )}`}
                            download="vpn.conf"
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg "
                          >
                            Download config file
                          </a>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
            onClick={mint}
          >
            Mint Erebrus NFT
          </button>
        </div>
      )}
    </>
  );
};

export default Clients;
