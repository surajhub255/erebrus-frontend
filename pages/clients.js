import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { useAddress } from "@thirdweb-dev/react";
import Navbar from "../components/Navbar";

const Clients = () => {
  const address = useAddress();
  const [apiData1, setApiData1] = useState(null);
  const [apiData2, setApiData2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (address) {
      const fetchData = async () => {
        setIsLoading(true);
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
        setIsLoading(false);
      };

      fetchData();
    }
  }, [address]);

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
      <div className="container flex flex-wrap w-100 justify-center items-center mx-auto px-4 bg-black text-white lg:h-screen pt-8 pb-8">
        {isLoading ? (
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
    </>
  );
};

export default Clients;
