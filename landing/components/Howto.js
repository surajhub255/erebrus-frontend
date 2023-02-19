import React from "react";

const Howto = () => {
  return (
    <div
      id="howto"
      className="flex flex-col items-center justify-start scroll-mt-16 lg:scroll-mt-0 lg:mb-36 mb-24"
    >
      <div className="mb-2 font-figtree md:w-[60%] w-[85%] text-center">
        <h1 className="font-bold text-4xl lg:text-5xl lg:mb-16 mb-12 lg:mt-36  text-gray-200">
          Start using Erebrus VPN now!
        </h1>
        <div className="flex lg:flex-row flex-col items-center justify-center">
          <div className="flex flex-col items-center lg:mr-16 lg:mb-0 mb-12">
            <img src="/erebrus_nft.png" className="mb-4 w-40 h-40" />
            <h2 className="text-gray-200 lg:text-2xl text-xl font-bold">
              Get the Erebrus NFT.
            </h2>
            <p className="text-gray-600 lg:w-100 w-80">
              The team at Erebrus have created an innovative and easy way to
              purchase a VPN subscription. All you need is a wallet address with
              some MATIC!
            </p>
          </div>
          <div className="flex flex-col items-center lg:mr-16 lg:mb-0 mb-12">
            <img src="/sample_qr.png " className="mb-4 w-40 h-40" />
            <h2 className="text-gray-200 lg:text-2xl text-xl font-bold">
              Generate client config file
            </h2>
            <p className="text-gray-600 lg:w-100 w-80">
              Once you have the Erebrus NFT, it will allow you to create VPN
              clients based on a name, region and device - this step will
              generate your VPN client config
            </p>
          </div>
          <div className="flex flex-col items-center lg:mr-16 lg:mb-0 mb-12">
            <span className="text-[165px] -mt-12 mr-12 lg:mr-0">📲</span>
            <h2 className="text-gray-200 lg:text-2xl text-xl font-bold -mt-6">
              Scan QR code or .conf
            </h2>
            <p className="text-gray-600 lg:w-100 w-80">
              Once you&apos;ve generated your config file for your VPN client,
              scan the QR code or add the .conf file with the WireGuard® app to
              start using your VPN!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Howto;
