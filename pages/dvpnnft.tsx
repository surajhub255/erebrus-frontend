import React, { useState } from 'react';
import Footer from "../components/Footer";
import {BrowserView, MobileView} from 'react-device-detect';

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
    <MobileView>
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
    </MobileView>
    <BrowserView>
    <div className='mx-20 mt-10'>
  <h1 className="text-5xl  text-white mb-3 text-left">
    Mint Your FREE Bali DVPN NFT
  </h1>
</div>
<div className="min-h-screen flex items-center justify-center mx-20">
  <div className="flex w-full h-full">
    <div className="flex-1">
      <img 
        src="/bali-dvpn-nft.jpeg" 
        alt="Erebrus DVPN"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="flex-1 bg-[#4D9FCB] flex flex-col items-center pt-20 p-6">
      <h2 className="text-6xl  text-white mb-20 text-center">
        Secure, Private, Exclusive
      </h2>
      <form>
        <p className="text-black text-3xl   mb-16">
          Enter your wallet address and click GO
        </p>
        <div className=' text-center mb-10 '>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="wallet address"
          className="w-2/3 p-2 rounded text-2xl text-center mb-4"
        />
        </div>
        <div className='text-center '>
        <button
          type="submit"
          className=" bg-[#1C126C] text-3xl text-white px-6 py-3 rounded-[40px] font-semibold hover:bg-indigo-600 transition duration-300"
        >
          GO
        </button>
        </div>
      </form>
    </div>
  </div>
</div>

   </BrowserView>
   <Footer/>
   </>
  );
};

export default BaliDVPNNFTPage;
