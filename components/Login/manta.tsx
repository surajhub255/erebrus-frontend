// import { useAccount, useSignMessage } from "wagmi";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { AxiosResponse } from "axios";

// export const useMantaWallet = () => {
//   const { address: mantaAddress, isConnected, chain } = useAccount();
//   const { signMessage: mantaSignMessage } = useSignMessage();

//   const getChainsym = () => {
//     return Cookies.get("Chain_symbol") || "default_chain_sym";
//   };

//   console.log("Manta connection info:", chain, mantaAddress);

//   const onSignMessageManta = async (setshowsignbutton) => {
//     const chainsym = getChainsym();

//     if (isConnected) {
//       if (chainsym === "manta" && chain.name === "MantaChain") {
//         try {
//           const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

//           const { data } = await axios.get(
//             `${REACT_APP_GATEWAY_URL}api/v1.0/flowid?walletAddress=${mantaAddress}&chain=${chainsym}`
//           );

//           const message = data.payload.eula;
//           const nonce = data.payload.flowId;

//           const payload = message + nonce;

//           await mantaSignMessage(
//             { account: mantaAddress, message: payload },
//             {
//               onSuccess: async (data) => {
//                 // Set signature for further use (optional)
//                 // setSignature(data);

//                 const authenticationData = {
//                   flowId: nonce,
//                   signature: data,
//                 };

//                 const authenticateApiUrl = `${REACT_APP_GATEWAY_URL}api/v1.0/authenticate?chain=${chainsym}`;

//                 const config = {
//                   url: authenticateApiUrl,
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   data: authenticationData,
//                 };

//                 const authResponse: AxiosResponse<{
//                   payload: { token: string; userId: string };
//                 }> = await axios.post(authenticateApiUrl, authenticationData);

//                 const token = authResponse?.data?.payload?.token;
//                 const userId = authResponse?.data?.payload?.userId;

//                 Cookies.set("manta_token", token, { expires: 7 });
//                 Cookies.set("manta_wallet", mantaAddress, { expires: 7 });
//                 Cookies.set("manta_userid", userId, { expires: 7 });
//                 Cookies.set("Chain_symbol", chainsym, { expires: 7 });
//               },
//             }
//           );
//         } catch (error) {
//           console.error(error);
//           setshowsignbutton(true); // Likely to re-trigger the signing process
//         }
//       } else {
//         alert(`Switch to MantaChain in your wallet`);
//       }
//     }
//   };

//   return { mantaAddress, isConnected, onSignMessageManta };
// };
