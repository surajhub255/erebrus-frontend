import React, { useState } from 'react';
import Footer from "../components/Footer";
import { BrowserView, MobileView } from 'react-device-detect';
import axios from 'axios';

const REACT_APP_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

const BaliDVPNNFTPage = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleWalletAddressChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const handleGoClick = async () => {
    try {
      const result = await axios.post(`${REACT_APP_GATEWAY_URL}api/v1.0/dvpnnft`, {
        wallet_address: walletAddress
      });
      setResponse(result.data);
      setError(null);
      
      // Check if the response contains a transaction hash
      if (result.data && result.data.transaction_hash) {
        setShowPopup(true);
      }
    } catch (err) {
      setError('An error occurred while processing your request.');
      setResponse(null);
    }
  };

  const renderResponse = () => {
    if (error) {
      return <p className="text-red-500 mt-4">{error}</p>;
    }
    if (response) {
      return (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Response:</h3>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      );
    }
    return null;
  };

  const renderPopup = () => {
    if (!showPopup) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Success!</h2>
          <p>Your transaction was successful. Transaction hash: {response.transaction_hash}</p>
          <button 
            onClick={() => setShowPopup(false)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  return (
    <>
      <MobileView>
        <div className="flex flex-col justify-center items-center h-screen mt-10 bg-black p-4">
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
      {renderResponse()}
      </div>
    </MobileView>
    <BrowserView>
    <div className='mx-20 mt-10'>
          <h1 className="text-5xl text-white mb-3 text-left">
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
              <h2 className="text-6xl text-white mb-20 text-center">
                Secure, Private, Exclusive
              </h2>
              <form onSubmit={(e) => { e.preventDefault(); handleGoClick(); }}>
                <p className="text-black text-3xl mb-16">
                  Enter your wallet address and click GO
                </p>
                <div className='text-center mb-10'>
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={handleWalletAddressChange}
                    placeholder="wallet address"
                    className="w-2/3 p-2 rounded text-2xl text-center mb-4"
                  />
                </div>
                <div className='text-center'>
                  <button
                    type="submit"
                    className="bg-[#1C126C] text-3xl text-white px-6 py-3 rounded-[40px] font-semibold hover:bg-indigo-600 transition duration-300"
                  >
                    GO
                  </button>
                </div>
              </form>
              {renderPopup()}
            </div>
          </div>
        </div>

   </BrowserView>
   <Footer/>
   </>
  );
};

export default BaliDVPNNFTPage;
