import "../styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../AuthContext";

const activeChainId = ChainId.Mumbai;

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <AuthProvider>
        <div className="bg-black">
          <Navbar />
          <Component {...pageProps} />
        </div>
        <Footer />
      </AuthProvider>
    </ThirdwebProvider>
  );
}
