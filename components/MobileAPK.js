import React from "react";
import Link from "next/link";

const Pricing = () => {
  return (
    <div
      id="pricing"
      className="lg:flex items-center justify-center gap-20 mx-auto py-40 bg-primary"
    >

<div className="w-1/2">
        <img src="/apk1.png" />
      </div>

      <div className=" w-1/2">
      <h1 className="text-5xl mb-4 font-thin text-white pr-20">
      Unleash the Power of Future Internet
      </h1>
              <div className="flex mb-10 text-white text-xl font-thin pr-20">
          <div>Empower your online activity with our mobile app for secure, private <br/> and accessible network. We utilize NFTs for robust 
          privacy and decentralization. </div>
        </div>
        <Link
          href="https://drive.google.com/file/d/1brFAlHZ0P0o39ELXhA1tvmI0o5CGUVuc/view?usp=sharing" target="_blank"
          className=" text-black bg-white font-bold py-3 px-6 rounded-full w-full mr-10 button-bg"
        
        >
          Download APK
        </Link>
        </div>
      
    </div>
  );
};

export default Pricing;
