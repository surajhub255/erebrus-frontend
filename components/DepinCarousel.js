import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const DepinCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const customRenderIndicator = (index) => {
    const indicatorStyle = {
      width: 30,
      height: 30,
      borderRadius: '50%',
      backgroundColor: currentSlide === index ? '#202434' : 'white',
      display: 'inline-block',
      margin: '10px 8px',
      cursor: 'pointer'
    };

    return (
      <button
        key={index}
        style={indicatorStyle}
        onClick={() => setCurrentSlide(index)}
        aria-label={`Go to slide ${index + 1}`}
      />
    );
  };

  const slides = [
    {
      heading: "Last Mile Safe Internet Connectivity",
      subheadings: [
        {
          subheading: "Break Free from Censorship",
          description: "Get rid of censorship and geo-restrictions and provide access to any website, anywhere, with complete freedom."
        },
        {
          subheading: "Security That Pays",
          description: "We've got you covered. Enjoy peace of mind knowing your clients’ internet access and cybersecurity are covered when using your apps."
        },
        {
          subheading: "Smart Security, Seamless Speed",
          description: "Use targeted VPN protection (split tunneling) for your apps, ensuring clients’ security without slowing down their browsing experience."
        }
      ]
    },
    {
      heading: "DNS-Based Roaming Firewall",
      subheadings: [
        {
          subheading: "Unprecedented Network Control",
          description: "Gain complete oversight and deep inspection capabilities for all your network traffic with our DNS-Based Roaming Firewall."
        },
        {
          subheading: "Fortress on the Move",
          description: "Securely connect to a highly secure enterprise network anytime, anywhere, with our innovative solution."
        },
        {
          subheading: "Enhanced Security & Privacy by Design",
          description: "Manage and regulate your network traffic with ease, ensuring unparalleled security and privacy for your connected devices."
        }
      ]
    }
  ];

  return (
    <div id="howto" className="min-h-screen flex flex-col items-center justify-start scroll-mt-16 lg:scroll-mt-0 mb-20">
      <div className="mb-2 font-figtree w-[80%] text-white lg:text-2xl text-sm text-left">
        <h1 className="font-bold lg:text-4xl text-2xl lg:mb-10 mb-12 lg:mt-40 text-left text-white">
          Companies and Enterprises: Content Delivery, Uninterrupted
        </h1>
        <h1 className="font-bold lg:text-xl text-xl lg:mb-16 mb-12 text-left text-white">
          Subsidize Safe and Uncensored Internet & Cybersecurity for Your Teams and Users
        </h1>
        <div className="lg:flex gap-2">
          <div className="rounded-3xl lg:w-2/5 w-full relative">
            <img src="/depin.png" alt="Static Image" className="rounded-3xl h-[500px] w-full" />
          </div>
          <div className="rounded-3xl p-10 lg:w-3/5 w-full text-left custom-gradient-bg " >
            <Carousel
              selectedItem={currentSlide}
              onChange={setCurrentSlide}
              showArrows={false}
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={true}
            >
              {slides.map((slide, index) => (
                <div key={index} className="text-left">
                  <h2 className="text-3xl font-bold mb-4">{slide.heading}</h2>
                  {slide.subheadings.map((sub, subIndex) => (
                    <div key={subIndex} className="mb-4">
                      <h3 className="text-xl font-semibold">{sub.subheading}</h3>
                      <p className="text-base">{sub.description}</p>
                    </div>
                  ))}
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="mt-4 flex w-1/3 justify-end">
        {slides.map((_, index) => customRenderIndicator(index))}
      </div>
    </div>
  );
};

export default DepinCarousel;
