"use client";
import { cardDetails2 } from "../utils/data";
import Image from "next/image";

const Dvpn = () => {

  return (
    <div className='p-2 lg:p-20 flex w-full   flex-col items-start bg-[#080d1f]'
    >
      <h3
        className=' text-3xl lg:text-[42px] mb-[90px] w-full text-start
        text-white'
      >
       Decentralized VPN & Wi-Fi for Everyone, Anywhere
      </h3>
      <div className='w-full flex flex-col gap-12 sm:gap-0 lg:flex-row h-max justify-between'>
        {cardDetails2.map((item, index) => {
          return (
            <div
            key={index.toString()}
            className='flex w-[400px] hover:-translate-y-4 duration-300 flex-col justify-start'
          >
            <Image
              src={`/${item.image}.png`}
              alt='pic'
              className='mb-4 sm:mb-[54px] object-cover overflow-clip'
              width={400}
              height={320}
            />
            <h4 className='mb-[10px] text-white text-[22px]'>{item.title}</h4>
            <ul className='list-disc pl-4'>
              <li className='text-lg font-thin text-[#F3F4F6]'>{item.desc1}</li>
              <li className='text-lg font-thin text-[#F3F4F6]'>{item.desc2}</li>
            </ul>
          </div>
          
          );
        })}
      </div>
    </div>
  );
};

export default Dvpn;
