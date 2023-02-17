import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="font-figtree">
      <footer className="p-4 bg-gray-700 sm:p-6 dark:bg-primary-600">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center ">
              <span className="self-center italic cursor-pointer text-4xl ml-10 font-semibold whitespace-nowrap dark:text-white">
                <div className="-mt-16 -mb-32 -ml-16 lg:-mt-12 md:-mt-20">
                  <Image
                    src="/logo.svg"
                    alt="erebrus-logo"
                    width={100}
                    height={100}
                  />
                </div>
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 mr-10 sm:gap-6 sm:grid-cols-2">
            {/* <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-black dark:text-gray-400">
                <li className="mb-4">
                  <Link href="https://flowbite.com/" className="hover:underline">
                    Flowbite
                  </Link>
                </li>
                <li>
                  <Link href="https://tailwindcss.com/" className="hover:underline">
                    Tailwind CSS
                  </Link>
                </li>
              </ul>
            </div> */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-black dark:text-gray-400">
                <li>
                  <Link
                    href="https://discord.gg/vd2j5Kyt"
                    className="hover:underline"
                    target={"_blank"}
                  >
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link href="/" className="hover:underline">
              Erebrus
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
