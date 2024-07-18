import React from "react";
import Link from "next/link";

const Pricing = () => {
  return (
    <div
      id="pricing"
      className="lg:flex md:flex items-center justify-center lg:gap-20 md:gap-20 mx-auto py-40 bg-primary"
    >

<div className="lg:w-1/2 md:w-1/2 w-full">
        <img src="/apk1.png" />
      </div>

      <div className="lg:w-1/2 md:w-1/2 w-full">
      <h1 className="text-5xl mb-4 font-thin text-white lg:pr-20 md:pr-20 text-center lg:text-left md:text-left">
      Unleash the Power of Future Internet
      </h1>
              <div className="flex mb-10 text-white text-xl font-thin lg:pr-20 md:pr-20 text-center lg:text-left md:text-left">
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
