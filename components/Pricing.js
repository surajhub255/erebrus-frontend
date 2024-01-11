import React from "react";
import Link from "next/link";

const Pricing = () => {
  return (
    <div
      id="pricing"
      className="flex flex-col items-center justify-start scroll-mt-16 lg:scroll-mt-0 mx-auto mb-24"
    >
      <h1 className="text-gray-200 text-4xl lg:text-5xl font-bold mb-4">
        Pricing
      </h1>
      <p className="text-gray-400 mb-8 w-60 text-center">
        Erebrus VPN is available for purchase directly though ownership of the
        Erebrus NFT
      </p>
      <div className="flex flex-col justify-center items-center pt-6 pl-8 pr-8 pb-8 bg-[#1A202C] rounded">
        <h1 className="text-gray-200 text-xl">Beta Release</h1>
        <div className="flex items-center mb-4">
          <h1 className="text-gray-200 mr-2 text-4xl">1.11 APT</h1>
          <p className="text-gray-400">/ 3 months</p>
        </div>
        <div className="flex mr-16 mb-4">
          <ul className="text-gray-400">
            <li>2 Reconfigurable VPN Clients</li>
            <li>5 Regions</li>
            <li>Each Subscription is rentable</li>
            <l1>100% Decentralized</l1>
          </ul>
        </div>
        <Link
          href="/mint"
          className="bg-blue-500 text-white font-bold py-4 px-6 rounded-lg w-full"
        >
          Get Now
        </Link>
      </div>
    </div>
  );
};

export default Pricing;
