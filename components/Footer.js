import {
  FaFacebook,
  FaYoutube,
  FaGithub,
  FaDiscord,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1A202C]">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden">
        <div className=" flex justify-between">
          
          <div className="w-1/4">
            <h3 className="lg:text-xl text-md font-semibold tracking-wide text-gray-200">
              Follow Us
            </h3>
            <ul className="mt-4 flex mr-4 text-gray-500">
              <li className="mr-4">
                <Link
                  href="https://www.facebook.com/Lazarus.Network?mibextid=LQQJ4d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-[#4267B2]"
                >
                  <FaFacebook />
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  href="https://twitter.com/LazarusNetwork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-[#1DA1F2]"
                >
                  <FaTwitter />
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  href="https://youtube.com/shorts/gBy4j5ZvKZE?feature=share"
                  className="text-2xl hover:text-[#FF0000]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube />
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  href="https://github.com/orgs/TheLazarusNetwork/repositories?q=erebrus&type=all&language=&sort="
                  className="text-2xl hover:text-[#f5f5f5]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className="text-white w-full">
            <img />
            <div className="w-1/3">Decentralized VPN Service based on the 
WireGuard VPN Protocol, Designed to 
enhance users privacy, anonymity, and 
security when using Public VPNs.</div>
          </div> */}

          <div className="text-gray-300">
          {/* <div>Links</div> */}
          <a href="https://netsepio.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-500">netsepio.com</a><br></br>
          <a href="https://app.netsepio.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-500">app.netsepio.com</a>
          </div>
          <div>
            <h3 className="lg:text-xl text-md font-semibold tracking-wide text-gray-200">
              Subscribe for updates
            </h3>
            <form className="mt-4 flex">
              <input
                type="email"
                name="email"
                id="email"
                className="lg:px-4 md:px-4 px-2.5 py-2 rounded-l-md text-xs lg:text-base md:text-base focus:outline-none w-[75%] lg:w-full md:w-full"
                placeholder="Email"
              />
              <button
                type="submit"
                className="bg-blue-500 text-xs lg:text-base md:text-base text-white lg:px-4 md:px-4 px-2 rounded-r-md w-[40%]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-sm text-white flex flex-col justify-between items-center sm:flex-row">
          <p className="order-2 sm:order-1">
            Erebrus 2023 &copy; All rights reserved.
          </p>
          <div className="flex items-center order-1 sm:order-2 text-white lg:mr-48 md:mr-48">
            <p>Contact us on</p>
            <Link
              href="https://discord.gg/cj2Xt2u5Pj"
              className="text-2xl ml-2 hover:text-[#738ADB]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
