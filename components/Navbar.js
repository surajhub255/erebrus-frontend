import Link from "next/link";
import { useState, useEffect, useContext } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { AuthContext } from "../AuthContext";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
// import { WalletConnector } from "@aptos-labs/wallet-adapter-mui-design";
import dynamic from "next/dynamic";
import { Network } from "@aptos-labs/ts-sdk";
import Button from "../components/Button";
import { useRouter } from "next/router";
import SingleSignerTransaction from "../components/transactionFlow/SingleSigner";
const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
const mynetwork = process.env.NEXT_PUBLIC_NETWORK;
const networkSui = process.env.NEXT_PUBLIC_SUI_NETWORK;
import { useAccount, useSignMessage } from "wagmi";
import {
  ConnectButton,
  useWallet as suiUseWallet,
  addressEllipsis,
} from "@suiet/wallet-kit";

const variants = {
  open: { opacity: 1, x: 0, y: 0 },
  closed: { opacity: 0, y: 0 },
};

const WalletSelectorAntDesign = dynamic(
  () => import("../components/WalletSelectorAntDesign"),
  {
    suspense: false,
    ssr: false,
  }
);

const isSendableNetwork = (connected, network) => {
  return connected && network?.toLowerCase() === mynetwork.toLowerCase() || networkSui;
};

const Navbar = ({ isHome }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [showsignbutton, setshowsignbutton] = useState(false);
  const [link, setlink] = useState("");
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [chainsym, setchainsym] = useState("");
  const [hidefilter, setHideFilter] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [sendable, setSendable] = useState(false);
  const [requiredNetwork, setRequiredNetwork] = useState(false);

  const handleClick = () => {
    setHideFilter(!hidefilter);
  };
  const {
    status,
    connected: suiConnected,
    connecting,
    account: suiAccount,
    network: SuiNetwork,
    name,
  } = suiUseWallet();
  const wallet = suiUseWallet();
  console.log("suiwalet", wallet);
  console.log("suiconnecte", suiConnected);
  console.log("suiaccount", suiAccount);
  console.log("suiname", wallet.chain.name);

  let sendableSui = isSendableNetwork(status === "connected", wallet.chain.id);

  useEffect(() => {
    const getchainsym = () => {
      const symbol = Cookies.get("Chain_symbol");
      setchainsym(symbol);
    };

    getchainsym();
    if (chainsym == "evm") {
      setConnectedAddress(ethAddress);
      setRequiredNetwork("Polygon Amoy");
      if (isConnected && ethAddress) {
        Cookies.set("erebrus_wallet", ethAddress);
      }
      onSignMessageEth();
    } else if (chainsym == "apt") {
      setConnectedAddress(ethAddress);
      setRequiredNetwork(mynetwork);
      if (account && account.address) {
        // Update the cookie with the new address
        Cookies.set("erebrus_wallet", account.address);
      }
      onSignMessage();
    } else if (chainsym == "sui") {
      setConnectedAddress(suiAccount.address);
      setRequiredNetwork(networkSui);
      if (suiAccount && suiAccount.address) {
        // Update the cookie with the new address
        Cookies.set("sui_wallet", suiAccount.address);
      }
      onSignMessageSui();
    }
  }, []);

  const { account, connected, network, signMessage } = useWallet();
  let sendableApt = isSendableNetwork(connected, network?.name);

  const {
    address: ethAddress,
    isConnecting,
    isDisconnected,
    isConnected,
    chain,
  } = useAccount();
  const { signMessage: ethSignMessage } = useSignMessage();
  const router = useRouter();
  const address = Cookies.get("erebrus_wallet");
  const token = Cookies.get("erebrus_token");

  useEffect(() => {
    if (
      (account && account.address) ||
      (isConnected && ethAddress) ||
      (status === "connected" && suiAccount.address)
    ) {
      // Update the cookie with the new address
      if (chainsym == "apt") {
        Cookies.set("erebrus_wallet", account.address);
        setshowsignbutton(true);
      } else if (chainsym == "evm") {
        Cookies.set("erebrus_wallet", ethAddress);
        setshowsignbutton(true);
      } else if (chainsym == "sui") {
        Cookies.set("erebrus_wallet", suiAccount.address);
        setshowsignbutton(true);
      }
    }
  }, [account?.address, ethAddress, suiAccount?.address]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsSignedIn(true);
    }

    let timeoutId = null;

    const getSignMessage = async () => {
      if (!address || address !== sessionStorage.getItem("address")) {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
          signOut();
        }, 500);
      } else {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }

        const response = await axios.get("api/getChallengeId", {
          params: { walletAddress: address },
          headers: {
            "Content-Type": "application/json",
          },
        });

        setMessage(response.data.eula + response.data.challangeId);
        setChallengeId(response.data.challangeId);
      }
    };

    getSignMessage();

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [address, isSignedIn]);

  // const signMessage = async () => {
  //   setIsSignedIn(false);
  //   console.log("signing message");
  //   const signature = await sdk?.wallet.sign(message);
  //   setSignature(signature);
  //   try {
  //     //make a post request to the erebrus server with the signature and challengeId
  //     const response = await axios.post(
  //       "api/getToken",
  //       {
  //         signature,
  //         challengeId,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (response.data.status === 200) {
  //       //store the token in the session storage
  //       sessionStorage.setItem("token", response.data.token);
  //       localStorage.setItem("token", response.data.token);
  //     }
  //     setIsSignedIn(true);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getRandomNumber = () => Math.floor(Math.random() * 1000);
        const apiUrl = `https://api.multiavatar.com/${getRandomNumber()}`;

        const response = await axios.get(apiUrl);
        const svgDataUri = `data:image/svg+xml,${encodeURIComponent(
          response.data
        )}`;
        setAvatarUrl(svgDataUri);
      } catch (error) {
        console.error("Error fetching avatar:", error.message);
      }
    };

    fetchData();
  }, []);

  const signOut = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    setMessage("");
    setSignature("");
    setChallengeId("");
    setIsSignedIn(false);
  };

  const getAptosWallet = () => {
    if ("aptos" in window) {
      return window.aptos;
    } else {
      window.open("https://petra.app/", "_blank");
    }
  };

  const onSignMessage = async () => {
    if (sendableApt) {
      try {
        const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

        const { data } = await axios.get(
          `${REACT_APP_GATEWAY_URL}api/v1.0/flowid?walletAddress=${account?.address}&chain=${chainsym}`
        );

        const message = data.payload.eula;
        const nonce = data.payload.flowId;
        const publicKey = account?.publicKey;

        const payload = {
          message: message,
          nonce: nonce,
        };
        const response = await signMessage(payload);

        let signaturewallet = response.signature;

        if (signaturewallet.length === 128) {
          signaturewallet = `0x${signaturewallet}`;
        }

        const authenticationData = {
          flowId: nonce,
          signature: `${signaturewallet}`,
          pubKey: publicKey,
        };

        const authenticateApiUrl = `${REACT_APP_GATEWAY_URL}api/v1.0/authenticate?chain=${chainsym}`;

        const config = {
          url: authenticateApiUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: authenticationData,
        };

        const authResponse = await axios(config);

        const token = await authResponse?.data?.payload?.token;
        const userId = await authResponse?.data?.payload?.userId;

        Cookies.set("erebrus_token", token, { expires: 7 });
        Cookies.set("erebrus_wallet", account?.address ?? "", { expires: 7 });
        Cookies.set("erebrus_userid", userId, { expires: 7 });
        Cookies.set("Chain_symbol", chainsym, { expires: 7 });

        window.location.reload();
      } catch (error) {
        console.error(error);
        setshowsignbutton(true);
      }
    } else {
      alert(`Switch to ${mynetwork} in your wallet`);
    }
  };

  const onSignMessageEth = async () => {
    if (isConnected) {
      if (chainsym == "evm" && chain.name == "Polygon Amoy") {
        try {
          const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

          const { data } = await axios.get(
            `${REACT_APP_GATEWAY_URL}api/v1.0/flowid?walletAddress=${ethAddress}&chain=${chainsym}`
          );

          const message = data.payload.eula;
          const nonce = data.payload.flowId;

          const payload = message + nonce;

          await ethSignMessage(
            { message: payload },
            {
              onSuccess: (data) => {
                setSignature(data);
                const authenticationData = {
                  flowId: nonce,
                  signature: data,
                };

                const authenticateApiUrl = `${REACT_APP_GATEWAY_URL}api/v1.0/authenticate?chain=${chainsym}`;

                const config = {
                  url: authenticateApiUrl,
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: authenticationData,
                };

                const authResponse = axios(config);

                const token = authResponse?.data?.payload?.token;
                const userId = authResponse?.data?.payload?.userId;

                Cookies.set("erebrus_token", token, { expires: 7 });
                Cookies.set("erebrus_wallet", account?.address ?? "", {
                  expires: 7,
                });
                Cookies.set("erebrus_userid", userId, { expires: 7 });
                Cookies.set("Chain_symbol", chainsym, { expires: 7 });
              },
            }
          );
        } catch (error) {
          console.error(error);
          setshowsignbutton(true);
        }
      } else {
        alert(`Switch to ${chain.name} in your wallet`);
      }
    }
  };

  const onSignMessageSui = async () => {
    if (sendableSui) {
      if (chainsym == "sui" && wallet.chain.name == "Sui Testnet" ) {
      try {
        const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;
        const { data } = await axios.get(
          `${REACT_APP_GATEWAY_URL}api/v1.0/flowid?walletAddress=${wallet.address}&chain=sui`
        );
        console.log("address", wallet.address);
        const msg = data.payload.eula + data.payload.flowId;
        const nonce = data.payload.flowId;
        // convert string to Uint8Array
        const msgBytes = new TextEncoder().encode(msg);

        const result = await wallet.signPersonalMessage({
          message: msgBytes,
        });
        console.log("signature", result.signature);
        console.log("publickey", wallet.account?.publicKey);
        // verify signature with publicKey and SignedMessage (params are all included in result)
        const verifyResult = await wallet.verifySignedMessage(
          result,
          wallet.account.publicKey
        );
        if (!verifyResult) {
          console.log(
            "signPersonalMessage succeed, but verify signedMessage failed"
          );
        } else {
          console.log(
            "signPersonalMessage succeed, and verify signedMessage succeed!"
          );
        }

        const payload = {
          message: message,
          nonce: nonce,
        };

        const authenticationData = {
          flowId: nonce,
          signatureSui: result.signature,
        };
        console.log("adaddasdasd", result.signature);

        const authenticateApiUrl = `${REACT_APP_GATEWAY_URL}api/v1.0/authenticate?chain=sui`;

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
        Cookies.set("erebrus_wallet", suiAccount?.address ?? "", { expires: 7 });
        Cookies.set("erebrus_userid", userId, { expires: 7 });

        window.location.reload();
      } catch (error) {
        console.error(error);
        setshowsignbutton(true);
      }  
  }
else {
      alert(`Switch to ${wallet.chain.name} in your wallet`);
    }
  }
  };

  const handleDeleteCookie = () => {
    Cookies.remove("erebrus_wallet");
    Cookies.remove("erebrus_token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-transparent py-4">
      <div
        className={`container mx-auto px-10 flex items-center justify-between lg:mb-0 ${
          isHome && !isOpen ? "mb-24" : ""
        }`}
      >
        <div className="flex items-center">
          <Link href="/" scroll={false}>
            <div className="block">
              <img
                src="/Erebrus_logo_wordmark.png"
                alt="Logo"
                className="w-48"
              />
            </div>
          </Link>
          {/* <Link href="/" scroll={false}>
            <h1 className="text-xl font-bold text-white ml-2">EREBRUS</h1>
          </Link> */}
        </div>

        <div className="hidden lg:flex items-center">
          {link !== "explorer" ? (
            <Link
              href="/explorer"
              className="text-gray-300 mr-8"
              scroll={false}
              onClick={() => {
                setlink("explorer");
              }}
              style={{
                textDecoration: "none",
                position: "relative",
                borderBottom: router.pathname.includes("explorer")
                  ? "2px solid white"
                  : "",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.borderBottom = "1px solid #fff")
              }
              onMouseOut={(e) => (e.currentTarget.style.borderBottom = "none")}
            >
              Explorer
            </Link>
          ) : (
            <Link
              href="/explorer"
              className="text-gray-300 mr-8"
              scroll={false}
              style={{
                textDecoration: "none",
                position: "relative",
                borderBottom: "2px solid white",
              }}
            >
              Explorer
            </Link>
          )}

          {link !== "subscription" ? (
            <Link
              href="/subscription"
              className="text-gray-300 mr-8"
              scroll={false}
              onClick={() => {
                setlink("subscription");
              }}
              style={{
                textDecoration: "none",
                position: "relative",
                borderBottom: router.pathname.includes("subscription")
                  ? "2px solid white"
                  : "",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.borderBottom = "1px solid #fff")
              }
              onMouseOut={(e) => (e.currentTarget.style.borderBottom = "none")}
            >
              Subscription
            </Link>
          ) : (
            <Link
              href="/subscription"
              className="text-gray-300 mr-8"
              scroll={false}
              style={{
                textDecoration: "none",
                position: "relative",
                borderBottom: "2px solid white",
              }}
            >
              Subscription
            </Link>
          )}

          <Link
            href="https://docs.netsepio.com/erebrus/"
            target="_blank"
            className="text-gray-300 mr-8"
            onMouseOver={(e) =>
              (e.currentTarget.style.borderBottom = "1px solid #fff")
            }
            onMouseOut={(e) => (e.currentTarget.style.borderBottom = "none")}
          >
            Docs
          </Link>

          <>
            {!token ? (
              <div className="lg:mt-0 mt-4 z-50 rounded-xl text-white">
                {!connected && chainsym == "apt" && (
                  <button
                  // onClick={connectWallet}
                  >
                    <WalletSelectorAntDesign />
                  </button>
                )}
                {chainsym == "evm" && (
                  <button
                  // onClick={connectWallet}
                  >
                    <w3m-button />
                  </button>
                )}
                {chainsym == "sui" && (
                  <button
                  // onClick={connectWallet}
                  >
                    <ConnectButton />
                  </button>
                )}

                {connected && showsignbutton && (
                  <Button
                    color={"blue"}
                    onClick={onSignMessage}
                    disabled={false}
                    message={"Authenticate"}
                  />
                )}
                {isConnected && chainsym == "evm" && showsignbutton && (
                  <Button
                    color={"blue"}
                    onClick={onSignMessageEth}
                    disabled={false}
                    message={"Authenticate"}
                  />
                )}
                {status === "connected" &&
                  chainsym == "sui" &&
                  showsignbutton && (
                    <Button
                      color={"blue"}
                      onClick={onSignMessageSui}
                      disabled={false}
                      message={"Authenticate"}
                    />
                  )}
              </div>
            ) : (
              <div
                className="lg:mt-0 mt-4 z-50 rounded-xl flex gap-4"
                style={{ color: "#0162FF" }}
              >
                <button
                  onClick={handleDeleteCookie}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.borderBottom = "1px solid #0162FF")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.borderBottom = "none")
                  }
                >
                  Log out
                </button>
                {avatarUrl && (
                  <img src={avatarUrl} alt="Avatar" className="w-10 ml-auto" />
                )}
              </div>
            )}
          </>

          <div>
            <button onClick={handleClick} className="text-white p-2 relative">
              {/* &#9776; */}

              <span
                className={`bg-gray-500 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      hidefilter
                        ? "rotate-45 translate-y-1"
                        : "-translate-y-0.5"
                    }`}
              ></span>
              <span
                className={`bg-gray-500 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${
                      hidefilter ? "opacity-0" : "opacity-100"
                    }`}
              ></span>

              <span
                className={`bg-gray-500 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      hidefilter
                        ? "-rotate-45 -translate-y-1"
                        : "translate-y-0.5"
                    }`}
              ></span>
            </button>

            {hidefilter && (
              <>
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Choose a Chain</h2>
                    <ul className="space-y-4">
                      <li className="flex items-center justify-between gap-64">
                        {/* <span>Ethereum</span>
                        <ConnectWallet theme={"dark"} modalSize={"wide"} />{" "} */}
                        <button
                          onClick={() => {
                            setHideFilter(false);
                            Cookies.set("Chain_symbol", "evm");
                            setchainsym("evm");
                          }}
                        >
                          Ethereum
                        </button>
                      </li>
                      <li className="flex items-center justify-between">
                        {/* <button onClick={() => setHideFilter(false)}> */}
                        {/* <WalletSelectorAntDesign /> */}
                        {/* </button> */}
                        <button
                          onClick={() => {
                            setHideFilter(false);
                            Cookies.set("Chain_symbol", "apt");
                            setchainsym("apt");
                          }}
                        >
                          Aptos
                        </button>
                      </li>
                      <li className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            setHideFilter(false);
                            Cookies.set("Chain_symbol", "sui");
                            setchainsym("sui");
                          }}
                        >
                          Sui
                        </button>
                      </li>
                      <li className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            setHideFilter(false);
                            Cookies.set("Chain_symbol", "sol");
                            setchainsym("sol");
                          }}
                        >
                          Solana
                        </button>
                      </li>
                    </ul>
                    <button
                      className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      onClick={() => {
                        setHideFilter(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 rounded-full text-gray-300"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <motion.nav animate={isOpen ? "open" : "closed"} variants={variants}>
        {isOpen && (
          <div className="bg-transparent py-4">
            <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center lg:justify-between">
              <div className="flex flex-col lg:flex-row items-center">
                <Link
                  href="/explorer"
                  className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                >
                  Explorer
                </Link>

                <Link
                  href="/subscription"
                  className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                >
                  Subscription
                </Link>

                <Link
                  href="https://docs.netsepio.com/erebrus/"
                  target="_blank"
                  className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                >
                  Docs
                </Link>

                {account?.address && (
                  <div
                    className="lg:mt-0 mt-4 lg:mr-4 z-50 rounded-xl flex gap-4"
                    style={{ color: "#0162FF" }}
                  >
                    {/* <div>
                {account?.address.slice(0, 4)}...{account?.address.slice(-4)}
              </div> */}
                    {address && (
                      <button
                        onClick={handleDeleteCookie}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.borderBottom =
                            "1px solid #0162FF")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.borderBottom = "none")
                        }
                      >
                        Log out
                      </button>
                    )}
                    {avatarUrl && (
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-10 ml-auto"
                      />
                    )}
                  </div>
                )}

                {!address && (
                  <div className="lg:mt-0 mt-4 z-50 rounded-xl text-white">
                    {!connected && (
                      <button
                      // onClick={connectWallet}
                      >
                        <WalletSelectorAntDesign />
                      </button>
                    )}
                    {connected && (
                      <SingleSignerTransaction
                        isSendableNetwork={isSendableNetwork}
                        chainsymbol={chainsym}
                      />
                    )}
                  </div>
                )}

                {address && (
                  <div
                    className="lg:mt-0 mt-4 lg:mr-20 z-50 rounded-xl flex gap-4"
                    style={{ color: "#0162FF" }}
                  >
                    {/* <div>
                {address.slice(0, 4)}...{address.slice(-4)}
              </div> */}
                    <button
                      onClick={handleDeleteCookie}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.borderBottom =
                          "1px solid #0162FF")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.borderBottom = "none")
                      }
                    >
                      Log out
                    </button>
                    {avatarUrl && (
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-10 ml-auto"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.nav>
    </nav>
  );
};

export default Navbar;
