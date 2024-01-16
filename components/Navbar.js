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
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { AuthContext } from "../AuthContext";
const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

const variants = {
  open: { opacity: 1, x: 0, y: 0 },
  closed: { opacity: 0, y: 0 },
};

const Navbar = ({ isHome }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const sdk = useSDK();

  // const address = useAddress();

  const address = Cookies.get("erebrus_wallet");

  const [, switchNetwork] = useNetwork();
  const isMismatched = useNetworkMismatch();

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

  const signMessage = async () => {
    setIsSignedIn(false);
    console.log("signing message");
    const signature = await sdk?.wallet.sign(message);
    setSignature(signature);
    try {
      //make a post request to the erebrus server with the signature and challengeId
      const response = await axios.post(
        "api/getToken",
        {
          signature,
          challengeId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 200) {
        //store the token in the session storage
        sessionStorage.setItem("token", response.data.token);
        localStorage.setItem("token", response.data.token);
      }
      setIsSignedIn(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const connectWallet = async () => {
    const wallet = getAptosWallet();
    try {
      const response = await wallet.connect();

      const account = await wallet.account();
      console.log("account", account);

      // Get the current network after connecting (optional)
      const networkwallet = await window.aptos.network();

      // Check if the connected network is Mainnet
      if (networkwallet === 'Mainnet') {

      const { data } = await axios.get(`${REACT_APP_GATEWAY_URL}api/v1.0/flowid?walletAddress=${account.address}`);
      console.log(data);

      const message = data.payload.eula;
      const nonce = data.payload.flowId;
      const publicKey = account.publicKey;

      const { signature, fullMessage } = await wallet.signMessage({
        message,
        nonce,
      });
      console.log("sign", signature, "full message", fullMessage);

      const authenticationData = {
        flowId: nonce,
        signature: `0x${signature}`,
        pubKey: publicKey,
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

      try {
        const response = await axios(config);
        console.log("auth data", response.data);
        const token = await response?.data?.payload?.token;
        const userId = await response?.data?.payload?.userId;
        // localStorage.setItem("platform_token", token);
        Cookies.set("erebrus_token", token, { expires: 7 });
        Cookies.set("erebrus_wallet", account.address, { expires: 7 });
        Cookies.set("erebrus_userid", userId, { expires: 7 });

        // setUserWallet(account.address);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
      }
    else{
      alert("Switch to mainnet in your wallet")
    }

    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCookie = () => {
    Cookies.remove("platform_wallet");
    Cookies.remove("platform_token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-transparent py-4">
      <div
        className={`container mx-auto px-6 flex items-center justify-between lg:mb-0 ${
          isHome && !isOpen ? "mb-24" : ""
        }`}
      >
        <div className="flex items-center">
          <Link href="/" scroll={false}>
            <div className="block">
              <img src="/Erebrus_logo_wordmark.png" alt="Logo" className="w-48" />
            </div>
          </Link>
          {/* <Link href="/" scroll={false}>
            <h1 className="text-xl font-bold text-white ml-2">EREBRUS</h1>
          </Link> */}
        </div>
        <div className="hidden lg:flex items-center">
          <Link href="/mint" className="text-gray-300 mr-8" scroll={false}>
            Mint NFT
          </Link>
          {/* <Link href="/demo" className="text-gray-300 mr-8">
            Demo
          </Link>
          <Link href="/clients" className="text-gray-300 mr-8">
            Clients
          </Link> */}
          <Link
            href="/subscription"
            className="text-gray-300 mr-8"
            scroll={false}
          >
            Subscription
          </Link>
          {isMismatched && (
            <button
              className="text-purple-400 mr-12"
              onClick={() => switchNetwork(ChainId.Mumbai)}
            >
              Switch To Mumbai
            </button>
          )}
          {/* {address && !isSignedIn && (
            <button
              className="bg-blue-500 text-white lg:mr-20 font-bold py-2 px-4 rounded-lg"
              onClick={signMessage}
            >
              Sign In
            </button>
          )} */}
          {/* {address && isSignedIn && (
            <div className="lg:mt-0 mt-4 lg:mr-20 z-50 rounded-xl">
              <button onClick={connectWallet}>Connect</button>
            </div>
          )} */}
          {!address && (
            <div className="lg:mt-0 mt-4 lg:mr-20 z-50 rounded-xl text-white">
              <button onClick={connectWallet}>Connect</button>
            </div>
          )}
          {address && (
            <div className="lg:mt-0 mt-4 lg:mr-20 z-50 rounded-xl text-white">
              <div>
                {address.slice(0, 4)}...{address.slice(-4)}
              </div>
              <button onClick={handleDeleteCookie}>Logout</button>
            </div>
          )}
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
                  href="/demo"
                  className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                  scroll={false}
                >
                  Demo
                </Link>
                <Link
                  href="/mint"
                  className="text-white font-bold block lg:inline-block lg:mr-0 mb-4 lg:mb-0"
                  scroll={false}
                >
                  Mint
                </Link>
                <Link
                  href="/clients"
                  className="text-white font-bold block lg:inline-block mb-4 lg:mr-0 lg:mb-0"
                >
                  Clients
                </Link>
                {isMismatched && (
                  <button
                    className="text-purple-400"
                    onClick={() => switchNetwork(ChainId.Mumbai)}
                  >
                    Switch To Mumbai
                  </button>
                )}

                {address && !isSignedIn && (
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={signMessage}
                  >
                    Sign In
                  </button>
                )}
                {address && isSignedIn && (
                  <div className="lg:mt-0 mt-4 lg:mr-20 z-50 rounded-xl">
                    <ConnectWallet />
                  </div>
                )}
                {!address && (
                  <div className="lg:mt-0 mt-4 lg:mr-20 z-50 rounded-xl">
                    <ConnectWallet />
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
