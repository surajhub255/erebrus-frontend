import { useWallet as solUseWallet } from "@solana/wallet-adapter-react";
import Cookies from "js-cookie";
import axios from "axios";

export const useSolWallet = () => {
  const { connected: solconnected, publicKey: solpublickey } = solUseWallet();

  const getchainsym = () => {
    return Cookies.get("Chain_symbol") || "default_chain_sym";
  };

  const isSendableNetwork = (connected, network) => {
    return connected && network === process.env.NEXT_PUBLIC_SOL_NETWORK;
  };

  const sendableSol = isSendableNetwork(solconnected, process.env.NEXT_PUBLIC_SOL_NETWORK);

  const getPhantomWallet = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    } else {
      window.open('https://phantom.app/', '_blank');
    }
  };

  const onSignMessageSol = async (setshowsignbutton) => {
    const chainsym = getchainsym();
    if (sendableSol) {
      try {
        const wallet = getPhantomWallet();
        const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

        const { data } = await axios.get(
          `${REACT_APP_GATEWAY_URL}api/v1.0/flowid?walletAddress=${solpublickey}&chain=sol`
        );

        const message = data.payload.eula;
        const nonce = data.payload.flowId;
        const publicKey = solpublickey;

        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await wallet.signMessage(encodedMessage, "utf8");

        const authenticationData = {
          flowId: nonce,
          signature: `${signedMessage.signature}`,
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
        const token = authResponse?.data?.payload?.token;
        const userId = authResponse?.data?.payload?.userId;

        Cookies.set("erebrus_token", token, { expires: 7 });
        Cookies.set("erebrus_wallet", solpublickey?.toBase58() ?? "", { expires: 7 });
        Cookies.set("erebrus_userid", userId, { expires: 7 });
        Cookies.set("Chain_symbol", chainsym, { expires: 7 });

        window.location.reload();
      } catch (error) {
        console.error(error);
        setshowsignbutton(true);
      }
    } else {
      alert(`Switch to ${process.env.NEXT_PUBLIC_SOL_NETWORK} in your wallet`);
    }
  };

  return { solconnected, solpublickey, onSignMessageSol };
};
