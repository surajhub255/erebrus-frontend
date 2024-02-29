import React, { useEffect, useState} from "react";
import Link from "next/link";

const Plans = () => {

    return(
        <div className="flex mt-10 mx-auto min-h-screen mx-32">

                        <div className="relative p-4 w-full">
                          <div
                            className="relative rounded-3xl shadow dark:bg-gray-700 rounded-3xl mx-auto"
                            style={{
                              backgroundColor: "#202333",
                              border: "1px solid #0162FF",
                            }}
                          >
                            
                            <section className="mt-14">
                              <div className="mx-auto max-w-3xl">
                                <div className="w-full mx-auto text-center px-10 pb-10">
                                  <h1 className="text-4xl font-semibold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                                    <span className="text-white text-center">
                                    111 NFT Mint
                                    </span>
                                  </h1>

                                  <div className="text-left text-white mt-10 w-3/4 mx-auto">
                                  &#x2022; Erebrus Trial package<br></br><br></br>
                                  &#x2022; Comes with a unique NFT from a 
      limited collection of only 111 supply<br></br><br></br>
      &#x2022; Utility NFT, tradable on marketplaces, 
      VPN usage tied with NFT ownership<br></br><br></br>
      &#x2022; Unlimited client<br></br><br></br>
      &#x2022; Only 1.11 APT for a 3 month trial
                                  </div>

                                  

                                      <div className="flex-col gap-4 mr-4">

                                        <div className="text-center w-1/2 mt-16 mx-auto">
                                          <div className="mb-6">
                                            <Link
                                              style={{
                                                backgroundColor: "#0162FF",
                                              }}
                                              href="/mint"
                                              className="py-3 mb-2 px-16 text-md text-white font-semibold rounded-full w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                                            >
                                               Mint NFT
                                            </Link>
                                          </div>
                                        </div>

                                      </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>

                        <div className="relative p-4 w-full">
                          <div
                            className="relative rounded-3xl shadow dark:bg-gray-700 rounded-3xl mx-auto"
                            style={{
                              backgroundColor: "#202333",
                              border: "1px solid #0162FF",
                            }}
                          >
                        
                            <section className="mt-14">
                              <div className="mx-auto max-w-3xl">
                                <div className="w-full mx-auto text-center px-10 pb-10">
                                  <h1 className="text-4xl font-semibold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                                    <span className="text-white text-center">
                                    $9.99/month 
                                    </span>
                                  </h1>

                                  <div className="text-left text-white mt-10 w-2/3 mx-auto">
                                  &#x2022; Pay per use monthly by APT, cryto 
     currencies or Fiat<br></br><br></br>
     &#x2022; Up to 5 regions to choose from 
     (more to come along the way)<br></br><br></br>
     &#x2022; Multiple Tiers starting from 9.99USD
                                  </div>

                                  

                                      <div className="flex-col gap-4 mr-4 mt-10">

                                        <div className="text-center w-1/2 mt-40 mx-auto">
                                          <div className="mb-6">
                                            <Link
                                              style={{
                                                backgroundColor: "#0162FF",
                                              }}
                                              href="/buy"
                                              className="py-3 mb-2 px-8 text-md text-white font-semibold rounded-full w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                                            >
                                              Buy Subscription
                                            </Link>
                                          </div>
                                        </div>

                                      </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
    )

}

export default Plans;