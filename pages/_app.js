import "../styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../AuthContext";
import { AppContext } from "../components/AppContext";
import Cookies from "js-cookie";
import { useState } from "react";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const activeChainId = ChainId.Mumbai;

const queryClient = new QueryClient();
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const metadata = {
  name: "Erebrus",
  description: "Erebrus",
  url: "http://localhost",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [polygonAmoy];
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
});

export default function App({ Component, pageProps }) {
  const [copied, setCopied] = useState(false);
  const paseto = Cookies.get("erebrus_token");

  return (
    <AppContext>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <AuthProvider>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <div className="bg-black">
                <Navbar />
                <Component {...pageProps} />
                {paseto && (
                  <div className="flex gap-2 justify-end">
                    {copied && (
                      <p className="text-white pt-6">Paseto Copied!</p>
                    )}
                    <button
                      className="rounded-full px-10 py-2 mb-4 mr-4 mt-4 text-white"
                      style={{ backgroundColor: "#0162FF" }}
                      onClick={() => {
                        navigator.clipboard.writeText(paseto ? paseto : "");
                        setCopied(true);
                      }}
                    >
                      Copy Paseto
                    </button>
                  </div>
                )}
              </div>
              {/* <Footer /> */}
            </QueryClientProvider>
          </WagmiProvider>
        </AuthProvider>
      </ThirdwebProvider>
    </AppContext>
  );
}
