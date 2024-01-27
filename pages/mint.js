import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import {
  useNetworkMismatch,
  useNetwork,
  useAddress,
  ChainId,
  ConnectWallet,
  useSDK,
} from "@thirdweb-dev/react";
import axios from "axios";
import Head from "next/head";
import { motion } from "framer-motion";
import Cookies from 'js-cookie';
import { AuthContext } from "../AuthContext";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import dynamic from "next/dynamic";
import { Network } from "@aptos-labs/ts-sdk";
import Button from "../components/Button";
import SingleSignerTransaction from "../components/transactionFlow/SingleSigner";
const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
const mynetwork = process.env.NEXT_PUBLIC_NETWORK;
const envmintfucn = process.env.NEXT_PUBLIC_MINTFUNCTION;

const transition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

const WalletSelectorAntDesign = dynamic(
  () => import("../components/WalletSelectorAntDesign"),
  {
    suspense: false,
    ssr: false,
  }
);

const isSendableNetwork = (connected, network) => {
  return (
    connected &&
    ( network?.toLowerCase() === mynetwork.toLowerCase())
  );
};

const Mint = () => {
  
  const [isOwned, setIsOwned] = useState(false);
  const [balance, setBalance] = useState(false);
  const [isLoadingTx, setLoadingTx] = useState(false);
  const [error, setError] = useState(null);
  const [isMinted, setMinted] = useState(false);
  const isSignedIn = Cookies.get("erebrus_wallet");
  const isauthenticate = Cookies.get("erebrus_token");
  const [address, setAddress] = useState("");
  const [token, settoken] = useState("");
  const [wallet, setwallet] = useState("");
  const [userid, setuserid] = useState("");
  const [buttonblur, setbuttonblur] = useState(false);
  const [successpop, setsuccesspop] = useState(false);
  const [showsignbutton, setshowsignbutton] = useState(false)

  const { account, connected, network, signMessage} = useWallet();

  let sendable = isSendableNetwork(connected, network?.name);
  
  const getAptosWallet = () => {
    if ("aptos" in window) {
      return window.aptos;
    } else {
      window.open("https://petra.app/", "_blank");
    }
  };

  const connectWallet = async () => {
    const wallet = getAptosWallet();
    try {
      const response = await wallet.connect();

      const account = await wallet.account();
      console.log("account", account);

      // Get the current network after connecting (optional)
      const networkwallet = await window.aptos.network();

      // Check if the connected network is Mainnet
      if (networkwallet === mynetwork) {

      const { data } = await axios.get(`${GATEWAY_URL}api/v1.0/flowid?walletAddress=${account.address}`);
      console.log(data);

      const message = data.payload.eula;
      const nonce = data.payload.flowId;
      const publicKey = account.publicKey;

      const { signature, fullMessage } = await wallet.signMessage({
        message,
        nonce,
      });
      console.log("sign", signature, "full message", fullMessage);

      // console.log(signature);

      let signaturewallet = signature;

      if(signaturewallet.length === 128)
      {
        signaturewallet = `0x${signaturewallet}`;
      }

      const authenticationData = {
        flowId: nonce,
        signature: `${signaturewallet}`,
        pubKey: publicKey,
      };

      const authenticateApiUrl = `${GATEWAY_URL}api/v1.0/authenticate`;

      const config = {
        url: authenticateApiUrl,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: authenticationData,
      };

      try {
        const response = await axios(config);
        console.log("auth data", response.data);
        const token = await response?.data?.payload?.token;
        const userId = await response?.data?.payload?.userId;

        settoken(token),
        setwallet(account.address),
        setuserid(userId)

        Cookies.set("erebrus_token", token, { expires: 7 });
        Cookies.set("erebrus_wallet", account.address, { expires: 7 });
        Cookies.set("erebrus_userid", userId, { expires: 7 });

        // await mint();

      } catch (error) {
        console.error(error);
      }
      }
    else{
      alert(`Switch to ${mynetwork} in your wallet`)
    }

    } catch (err) {
      console.log(err);
    }
  };

  const transaction = {
    arguments: [],
    function:
      `${envmintfucn}`,
    type: "entry_function_payload",
    type_arguments: [],
  };

  const mint = async () => {
    // if (!isSignedIn) {
    //   await connectWallet();
    // }
    setbuttonblur(true);
    try {
      const pendingTransaction = await aptos.signAndSubmitTransaction(
        transaction
      );
      setsuccesspop(true);
    } catch (error) {
      console.error('Error connecting wallet or minting NFT:', error);
      setbuttonblur(false);
    }
  };


  const onSignMessage = async () => {
    if (sendable) {
      try {
        const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
      
        const { data } = await axios.get(`${REACT_APP_GATEWAY_URL}api/v1.0/flowid?walletAddress=${account?.address}`);
        console.log(data);
  
        const message = data.payload.eula;
        const nonce = data.payload.flowId;
        const publicKey = account?.publicKey;
  
        const payload = {
          message: message,
          nonce: nonce,
        };
        const response = await signMessage(payload);
        console.log(response);
  
        let signaturewallet = response.signature;

      if(signaturewallet.length === 128)
      {
        signaturewallet = `0x${signaturewallet}`;
      }
  
      const authenticationData = {
        "flowId": nonce,
        "signature": `${signaturewallet}`,
        "pubKey": publicKey,
      };
  
        const authenticateApiUrl = `${REACT_APP_GATEWAY_URL}api/v1.0/authenticate`;
  
        const config = {
          url: authenticateApiUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: authenticationData,
        };
  
        const authResponse = await axios(config);
        console.log("auth data", authResponse.data);
  
        const token = await authResponse?.data?.payload?.token;
        const userId = await authResponse?.data?.payload?.userId;
  
        Cookies.set("erebrus_token", token, { expires: 7 });
        Cookies.set("erebrus_wallet", account?.address ?? '', { expires: 7 });
        Cookies.set("erebrus_userid", userId, { expires: 7 });
  
        window.location.reload();
      } catch (error) {
        console.error(error);
        setshowsignbutton(true);
      }
    } else {
      alert(`Switch to ${mynetwork} in your wallet`);
    }
  };
  

  // if (!isSignedIn) {
  //   return (
  //     <>
  //       <Head>
  //         <title>Erebrus | Clients</title>
  //       </Head>
  //       <div className="flex justify-center mt-48 text-white bg-black h-screen">
  //         Please sign in to Erebrus to view your NFT
  //       </div>
  //       {/* <button
  //                 className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg lg:mb-48"
  //                 onClick={mint}
  //               >
  //                 Mint Erebrus NFT
  //               </button> */}
  //     </>
  //   );
  // }

  return (
    <>
      <Head>
        <title>Erebrus | Clients</title>
      </Head>
      <div class="flex h-screen">
      <div className="w-1/2">
      <div className="text-white text-4xl ml-20 mt-20 mx-auto">Step into the Future of Internet 
Safety with 111 NFT VPN</div>
<div className="text-white text-xl ml-20 mt-10 mx-auto">3-Month Coverage</div>
<div className="text-white text-xl ml-20 mt-4 mx-auto">Unlimited Devices</div>
<div className="text-white text-xl ml-20 mt-4 mx-auto">Only at 1.11 APT</div>
<div className="text-white text-xl ml-20 mt-4 mx-auto">
Exceptional Value for Unmatched Security</div>
      {isOwned ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <div className="mt-20 text-white flex flex-col justify-start items-center">
            {`Number of NFTs owned: ${balance}`}
            <img
              src="./image1.jpeg"
              alt="Mint Successful"
              className="w-64 h-64 mt-8 mb-8"
            ></img>
            {isLoadingTx ? (
              <div className="animate-spin text-white text-7xl">⛏</div>
            ) : (
              <>
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-10 rounded-lg mt-20"
                  onClick={mint}
                >
                  Mint Erebrus NFT
                </button>
                {error && <div className="text-red-500 mt-4">{error}</div>}
              </>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <div className="mt-20 text-white flex flex-col justify-center items-center">
            {isLoadingTx ? (
              <div className="animate-spin text-white text-7xl">⛏</div>
            ) : (
              <>
              {!isSignedIn || !isauthenticate ? (
            <div className="text-white font-bold py-4 px-10 rounded-lg mr-auto ml-10 -mt-10">
             
             {!connected && ( 
             <button className="">
              <WalletSelectorAntDesign/>
              </button>
             )}
              {connected && (
            // <SingleSignerTransaction isSendableNetwork={isSendableNetwork} />
            <Button
          color={"blue"}
          onClick={onSignMessage}
          disabled={!sendable}
          message={"Authenticate"}
        />
          )} 
            </div>
          ): (
            <div className="mr-auto">
              <div className="text-orange-300 ml-20 text-sm mb-2">(one wallet address can only mint one)</div>
              { buttonblur ? (
                <div
                  className={`text-white font-bold py-4 px-10 rounded-lg mr-auto ml-20 bg-blue-300`}
                >
                  Mint Erebrus NFT
                </div>
              ):
              (
<button
                  className={`text-white font-bold py-4 px-10 rounded-lg mr-auto ml-20 bg-blue-500`}
                  onClick={mint}
                >
                  Mint Erebrus NFT
                </button>
              )}  
            </div>
                

          )}

{successpop && (
                            <div
                              style={{ backgroundColor: "#222944E5" }}
                              className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
                              id="popupmodal"
                            >
                              <div className="relative p-4 w-full max-w-2xl max-h-full">
                                <div
                                  className="relative rounded-lg shadow dark:bg-gray-700"
                                  style={{ backgroundColor: "#37406D" }}
                                >
                                  <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600">
                                    <button
                                      onClick={() => setsuccesspop(false)}
                                      type="button"
                                      className="text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                      >
                                        <path
                                          stroke="currentColor"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                      </svg>
                                      <span className="sr-only">
                                        Close modal
                                      </span>
                                    </button>
                                  </div>

                                  <div className="p-4 md:p-5 space-y-4">
                                    <p className="text-3xl text-center font-bold text-white">
                                      Successfully Minted!
                                    </p>
                                    <p
                                      className="text-md text-center w-1/2 mx-auto"
                                    
                                    >
                                      You have minted an Erebrus NFT ! To set clients, click button to go to subscription page.
                                    </p>
                                  </div>

                                  <div className="flex items-center pb-10 pt-4 rounded-b w-1/2 mx-auto">
                                    <Link href="/subscription"
                                     style={{border:'1px solid white'}}
                                     
                                      type="button"
                                      className="w-full text-white font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                      Subscriptions
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                
                {error && <div className="text-red-500 mt-4">{error}</div>}
              </>
            )}
          </div>
        </motion.div>
      )}
      </div>

<div className="text-white w-1/4 ml-auto mr-40 mt-10"><img src="/111nft_gif.gif"/></div>
</div>
    </>
  );
};

export default Mint;
