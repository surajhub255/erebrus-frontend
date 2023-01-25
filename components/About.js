import React from "react";

const About = () => {
  return (
    <div
      id="about"
      className="flex flex-col items-center justify-center lg:scroll-mt-56 scroll-mt-32"
    >
      <div className="text-center mb-12 font-figtree">
        <h2 className="font-bold text-4xl lg:text-6xl mb-2 text-gray-200">
          About
        </h2>
      </div>
      <div className="lg:w-[50%] w-[60%]">
        <h1 className="text-2xl lg:text-2xl font-figtree font-bold opacity-50 text-gray-400 lg:mb-80 mb-36">
          Erebrus VPN uses WireGuard® P2P VPN Solution for bypassing IP
          Fingerprinting to provide secure & private access to geo-restricted
          content. Users get to choose the VPN Connection from various countries
          and change IP addresses upon their requirements. This means they get
          access to their favorite content without sacrificing speed or
          bandwidth in case the content provider detects a VPN and tries to
          block the access. Our platform is capable of getting new anonymous VPN
          IP addresses on the go just by a simple form filled by the user.
        </h1>
      </div>
    </div>
  );
};

export default About;
