import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import aptos from "aptos";
import Head from "next/head";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { AuthContext } from "../AuthContext";
import {
  useWallet,
  InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";
import dynamic from "next/dynamic";
import { Network } from "@aptos-labs/ts-sdk";
import Button from "../components/Button";
import SingleSignerTransaction from "../components/transactionFlow/SingleSigner";
import GetStripe from "../utils/stripe.js";
import { loadStripe } from "@stripe/stripe-js";
import { redirect } from "next/dist/server/api-utils/index.js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm.tsx";
import { aptosClient } from "../module";
export const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from 'ethers';
import { abi } from "../components/mantaabi";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
const mynetwork = process.env.NEXT_PUBLIC_NETWORK;
const envmintfucn = process.env.NEXT_PUBLIC_MINTFUNCTION;
const envcollectionid = process.env.NEXT_PUBLIC_COLLECTIONID;
const graphqlaptos = process.env.NEXT_PUBLIC_GRAPHQL_APTOS;

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
  return connected && network?.toLowerCase() === mynetwork.toLowerCase();
};

const Mint = () => {
  const [isLoadingTx, setLoadingTx] = useState(false);
  const [error, setError] = useState(null);
  const isSignedIn = Cookies.get("erebrus_wallet");
  const isauthenticate = Cookies.get("erebrus_token");
  const [address, setAddress] = useState("");
  const [token, settoken] = useState("");
  const [wallet, setwallet] = useState("");
  const [userid, setuserid] = useState("");
  const [buttonblur, setbuttonblur] = useState(false);
  const [showsignbutton, setshowsignbutton] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [mintpopup, setmintpopup] = useState(false);
  const [showconnectbutton, setshowconnectbutton] = useState(false);
  const [mintpage, setmintpage] = useState("page1");
  const [totalNFTMinted, setTotalNFTMinted] = useState(null);

  const { account, connected, network, signMessage, signAndSubmitTransaction } =
    useWallet();
    const [chainSymbol, setChainSymbol] = useState('');
    const [erebrusWallet, setErebrusWallet] = useState(null);
    const [displayText, setDisplayText] = useState('Only at 1.76 APT');
    const [displayText2, setDisplayText2] = useState('Pay in APT');
    const [imageSrc, setImageSrc] = useState('/mintApt.png');
    const [imageSrc2, setImageSrc2] = useState('/nft_ape2.png');
  
    useEffect(() => {
      const chainSym = Cookies.get('Chain_symbol');
      const wallet = Cookies.get('erebrus_token');
      setChainSymbol(chainSym);
      setErebrusWallet(wallet);
  
      if (wallet) {
        if (chainSym === 'sui') {
          setDisplayText('Only at 4.91 SUI');
          setDisplayText2('Pay in SUI');
          setImageSrc('/mintSui.png');
          setImageSrc2('/nft_ape1.png')
        } else if (chainSym === 'evm') {
          setDisplayText('Only at 0.00028 ETH');
          setDisplayText2('Pay in ETH')
          setImageSrc('/mintEth.jpg');
          setImageSrc2('/nft_ape2.png')
        } else if (chainSym === 'sol') {
          setDisplayText('Only at 18.94 Sol');
          setDisplayText2('Pay in SOL')
          setImageSrc('/mintSui.png');  // change needed
          setImageSrc2('/nft_ape1.png')
        }
        else if (chainSym === 'google') {
          setDisplayText('Only at 18.94 Sol');
          setDisplayText2('Pay in Dollars')
          setImageSrc('/mintSui.png');  // change needed
          setImageSrc2('/nft_ape1.png')
        }
      }
    }, []);

  let sendable = isSendableNetwork(connected, network?.name);

  useEffect(() => {
    mint();
  }, [connected]);

  useEffect(() => {
    // Extract URL parameters
    const currentUrl = window.location.href;
    const params = new URLSearchParams(currentUrl.split("?")[1]);
    const redirect_status = params.get("redirect_status");

    console.log("redirect_status", redirect_status);
    if (redirect_status === `succeeded`) {
      setmintpage("page3");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const vpnnft = async () => {
      try {
        const graphqlbody = {
          query: `
          query MyQuery {
            current_token_datas_v2(
              where: {collection_id: {_eq: \"${envcollectionid}\"}}
            ) {
              token_name
              description
            }
          }
            `,
          operationName: "MyQuery",
        };

        const response = await axios.post(`${graphqlaptos}`, graphqlbody, {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        });

        console.log("vpn nft", response.data.data.current_token_datas_v2);
        setTotalNFTMinted(response.data.data.current_token_datas_v2);
      } catch (error) {
        console.error("Error fetching nft data:", error);
      } finally {
      }
    };

    vpnnft();
  }, []);

  const transaction = {
    data: {
      function: `${envmintfucn}`, // Assuming envmintfucn is the function name in the old format
      typeArguments: [], // No type arguments in the old format
      functionArguments: [], // No function arguments in the old format
    },
  };

  const mint = async () => {
    setbuttonblur(true);
    setLoadingTx(true);
    console.log("connected", connected);
    try {
      const pendingTransaction = await signAndSubmitTransaction(transaction);
      await aptosClient(network?.name.toLowerCase()).waitForTransaction({
        transactionHash: pendingTransaction.hash,
      });
      console.log("mint transaction", pendingTransaction.hash);
      if (pendingTransaction.hash) {
        setmintpage("page3");
        setLoadingTx(false);
        setshowconnectbutton(false);
      }
    } catch (error) {
      console.error("Error connecting wallet or minting NFT:", error);
      setbuttonblur(false);
      setLoadingTx(false);
      // setmintpage("page1");
      setshowconnectbutton(false);
    }
  };

  const stripe = async () => {
    setbuttonblur(true);

    const auth = Cookies.get("erebrus_token");
    const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
    const EREBRUS_GATEWAY_URL = process.env.NEXT_PUBLIC_EREBRUS_BASE_URL;

    try {
      const response = await axios.post(
        `${EREBRUS_GATEWAY_URL}api/v1.0/subscription/erebrus`,
        {},
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      const responseData = await response;
      console.log("stripe response:", responseData);
      setClientSecret(responseData.data.payload.clientSecret);
      setmintpopup(false);
    } catch (error) {
      console.error("stripe error:", error);
    }
  };

  //---------------------------------------------------------------------------------------------------------------------------------
  const mintreading = async () => {
    // setLoading(true);

    try {

      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        // Create a JavaScript object from the Contract ABI, to interact
        // with the HelloWorld contract.
        const contract = new ethers.Contract(
          '0x3414457C53D076D395B05dA6a9FD1b856c30E5F9',
          abi ,
          provider.getSigner()
        )

        
        const tx = await contract.mintNFT(
          1311312
        );
        //  const tx = await  contract.registerNode(
        //     354353453453,
        //     34543535345,
        //     "active",
        //     "SG"
        // )
        const result = await tx.wait();
        const integerValue = parseInt(result.logs[1].data, 16);
        console.log("Result:", result, integerValue);
        setLoading(false);
        setmintdone(true);
      }

    } catch (error) {
      console.error("Error fetching reading:", error);
      // setLoading(false); // Set loading state to false in case of error
    }
  };

  // const onSignMessage = async () => {
  //   if (sendable) {
  //     try {
  //       const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

  //       const { data } = await axios.get(
  //         `${REACT_APP_GATEWAY_URL}api/v1.0/flowid?walletAddress=${account?.address}`
  //       );
  //       console.log(data);

  //       const message = data.payload.eula;
  //       const nonce = data.payload.flowId;
  //       const publicKey = account?.publicKey;

  //       const payload = {
  //         message: message,
  //         nonce: nonce,
  //       };
  //       const response = await signMessage(payload);
  //       console.log(response);

  //       let signaturewallet = response.signature;

  //       if (signaturewallet.length === 128) {
  //         signaturewallet = `0x${signaturewallet}`;
  //       }

  //       const authenticationData = {
  //         flowId: nonce,
  //         signature: `${signaturewallet}`,
  //         pubKey: publicKey,
  //       };

  //       const authenticateApiUrl = `${REACT_APP_GATEWAY_URL}api/v1.0/authenticate`;

  //       const config = {
  //         url: authenticateApiUrl,
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         data: authenticationData,
  //       };

  //       const authResponse = await axios(config);
  //       console.log("auth data", authResponse.data);

  //       const token = await authResponse?.data?.payload?.token;
  //       const userId = await authResponse?.data?.payload?.userId;

  //       Cookies.set("erebrus_token", token, { expires: 7 });
  //       Cookies.set("erebrus_wallet", account?.address ?? "", { expires: 7 });
  //       Cookies.set("erebrus_userid", userId, { expires: 7 });

  //       window.location.reload();
  //     } catch (error) {
  //       console.error(error);
  //       setshowsignbutton(true);
  //     }
  //   } else {
  //     alert(`Switch to ${mynetwork} in your wallet`);
  //   }
  // };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <Head>
        <title>Erebrus | Clients</title>
      </Head>

      {mintpage === "page1" && (
        <>
          <div className="p-20">
            <div
              className="text-white text-5xl uppercase leading-normal"
              style={{
                marginLeft: "25vh",
                marginRight: "10vh",
                fontFamily: "Times New Roman",
              }}
            >
              Step into the Future of Internet Safety with{" "}
              <span style={{ color: "#0162FF" }}>111 NFT VPN</span>
            </div>
            <div class="flex justify-center gap-20">
              <div
                className="text-white w-1/3 p-10"
                style={{ marginLeft: "20vh" }}
              >
                <img
                  src={imageSrc2}
                  style={{ border: "1px solid #0162FF" }}
                  className="rounded-lg"
                />
              </div>
              <div className="w-1/2 mt-10">
                <div className="text-white text-xl mt-10 mx-auto flex gap-2">
                  <img src="/uis_calender.png" className="w-6 h-6 mt-1" />
                  <div>3-Month Coverage</div>
                </div>
                <div className="text-white text-xl mt-4 mx-auto flex gap-2">
                  <img src="/mdi_users.png" className="w-6 h-6 mt-1" />
                  <div>Unlimited Devices</div>
                </div>
                <div className="text-white text-xl mt-4 mx-auto flex gap-2">
                  <img
                    src="/icomoon-free_price-tags.png"
                    className="w-6 h-6 mt-1"
                  />
                  <div>{displayText}</div>
                </div>
                <div className="text-white text-xl mt-4 mx-auto flex gap-2">
                  <img
                    src="/wpf_security-checked.png"
                    className="w-6 h-6 mt-1"
                  />
                  <div>Exceptional Value for Unmatched Security</div>
                </div>

                <div className="flex gap-10 mt-10">
                  <div
                    className="text-white text-md rounded-full py-3 px-10"
                    style={{ border: "1px solid #0162FF" }}
                  >
                    <span className="font-bold text-2xl mr-4">
                      {totalNFTMinted ? totalNFTMinted.length : ""}
                    </span>{" "}
                    Minted NFTs
                  </div>
                  <div
                    className="text-white text-md rounded-full py-3 px-14"
                    style={{ border: "1px solid #0162FF" }}
                  >
                    <span className="font-bold text-2xl mr-4">
                      {totalNFTMinted ? `${111 - totalNFTMinted.length}` : ""}
                    </span>{" "}
                    NFTs Left
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                >
                  <div className="mt-10 text-white flex flex-col justify-center items-center">
                    {isLoadingTx ? (
                      <div className="animate-spin text-white text-7xl">⛏</div>
                    ) : (
                      <>
                        {/* {!isSignedIn || !isauthenticate ? (
                      <div className="text-white font-bold py-4 px-10 rounded-lg mr-auto ml-10 -mt-10">
                        {!connected && (
                          <button className="">
                            <WalletSelectorAntDesign />
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
                    ) : ( */}
                        <div className="mr-auto">
                          <div className="text-orange-300 text-sm mb-2">
                            (one wallet address can only mint one)
                          </div>
                          {buttonblur ? (
                            <div
                              className={`text-white font-bold py-4 px-10 rounded-full mr-auto bg-blue-300`}
                            >
                              Mint Erebrus NFT
                            </div>
                          ) : (
                            <button
                              className={`text-white font-bold py-4 px-10 rounded-full mr-auto `}
                              onClick={() => {
                                setmintpage("page2");
                              }}
                              style={{ backgroundColor: "#0162FF" }}
                            >
                              Mint Erebrus NFT
                            </button>
                          )}
                        </div>
                        {/* )} */}

                        {error && (
                          <div className="text-red-500 mt-4">{error}</div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </>
      )}

      {mintpage === "page2" && (
        <div
          style={{
            backgroundImage: `url('/bgmint.png')`,
            backgroundColor: "black",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
          id="popupmodal"
        >
          <div className="relative p-4 w-full max-w-xl max-h-full">
            <img
              src="/coin1.png"
              className="w-60 -mt-10 absolute -top-10 -left-20"
            />
            <div
              className="relative rounded-3xl shadow dark:bg-gray-700 bgcolor pb-20"
              style={{
                border: "1px solid #0162FF",
                boxShadow: "inset -10px -10px 60px 0 rgba(255, 255, 255, 0.4)",
              }}
            >
              <div
                className="flex items-center justify-end px-4 py-6 rounded-t"
                style={{ borderBottom: "1px solid #FFFFFF80" }}
              >
                <div className="text-2xl text-white">
                  Choose the payment option
                </div>
                <button
                  onClick={() => setmintpage("page1")}
                  type="button"
                  className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="items-center pt-20 rounded-b w-1/2 mx-auto">
              {!connected ? (
                  <>
                    <button
                      onClick={() => {
                        setshowconnectbutton(true);
                      }}
                      style={{ border: "1px solid #0162FF" }}
                      type="button"
                      className="flex w-full text-white font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-md text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <img src={imageSrc} className="w-12" />
                      <div className="px-5 py-2.5 ">{displayText2}</div>
                    </button>
                    {showconnectbutton && (
                      <button className="mx-auto justify-center mt-10 items-center flex">
                        <WalletSelectorAntDesign />
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={mint}
                    style={{ border: "1px solid #0162FF" }}
                    type="button"
                    className="flex w-full text-white font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-md text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <img src={imageSrc} className="w-12" />
                    <div className="px-5 py-2.5 ">{displayText2}</div>
                  </button>
                )}
              </div>

              {/* { !showconnectbutton && (<div className="flex items-center pb-20 pt-10 rounded-b w-1/2 mx-auto">
                              <button
                                onClick={stripe}
                                style={{ border: "1px solid #0162FF" }}
                                type="button"
                                className="flex w-full text-white font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-md text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                <img src="/mint3.png" className="w-12"/>
                                <div className="px-5 py-2.5 ">Pay in USD</div>
                              </button>
                            </div>)} */}
            </div>
            <img
              src="/coin2.png"
              className="w-60 -mt-10 absolute -bottom-24 -right-24"
              style={{ zIndex: -1 }}
            />
          </div>
        </div>
      )}

      {clientSecret && (
        <div
          style={{ backgroundColor: "#222944E5" }}
          className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full p-30"
          id="popupmodal"
        >
          <div
            className="p-10 w-2/5 flex flex-col"
            style={{ backgroundColor: "white" }}
          >
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      )}

      {mintpage === "page3" && (
        <div
          style={{ backgroundColor: "black" }}
          className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
          id="popupmodal"
        >
          <div className="relative p-4 w-1/3 max-w-2xl max-h-full">
            <div
              className="relative rounded-3xl shadow dark:bg-gray-700"
              style={{
                backgroundColor: "#202333",
                border: "1px solid #0162FF",
              }}
            >
              <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600">
                <button
                  onClick={() => setmintpage("page1")}
                  type="button"
                  className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <img src="/mint.png" className="mx-auto" />

              <div className="p-4 md:p-5 space-y-4">
                <p className="text-2xl text-center font-semibold text-white">
                  Congratulations
                </p>
                <p className="text-md text-center w-full mx-auto text-white">
                  You have minted your Erebrus NFT, welcome to an exclusive
                  journey of innovation and community. To set clients, click
                  button to go to subscription page.
                </p>
              </div>

              <div className="flex items-center pb-10 pt-4 rounded-b w-1/3 mx-auto">
                <Link
                  href="/subscription"
                  style={{ backgroundColor: "#0162FF" }}
                  type="button"
                  className="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-sm px-2 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  View Subscription
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Mint;