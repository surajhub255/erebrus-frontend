import React, { useState } from 'react';
import Footer from "../components/Footer";

const BaliDVPNNFTPage = () => {
  const [walletAddress, setWalletAddress] = useState('');

  const handleWalletAddressChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const handleGoClick = () => {
    // Add your logic here to process the wallet address
    console.log('Wallet address:', walletAddress);
  };

  return (
    <>
    <div className="flex flex-col justify-center items-center  h-screen  mt-10 bg-black p-4">
      <div className="text-center text-white mb-10">
        <h2 className="text-2xl ">Mint Your FREE Bali ÐVPN NFT</h2>
        <p className='text-2xl'>Secure, Private, Exclusive</p>
      </div>

      <input
        type="text"
        placeholder="enter wallet address"
        value={walletAddress}
        onChange={handleWalletAddressChange}
        className="border border-gray-300 px-4 py-2 rounded-md w-3/4 max-w-md mb-10 text-xl text-center"
      />
      
      <button
        onClick={handleGoClick}
        className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-full text-xl mb-6 "
      >
        GO
      </button>

      <div className="w-full max-w-xs my-10">
        <img src="/bali-dvpn-nft.jpeg" alt="Erebrus DVPN" className="rounded-lg" />
      </div>
    </div>
   <Footer/>
   </>
  );
};

export default BaliDVPNNFTPage;
