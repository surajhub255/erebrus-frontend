import React from 'react';

const WinnersPage = () => {
  const achievements = [
    { logo: '/ivs.png', name: 'IVS CRYPTO', prize: 'Grand Prize at IVS Crypto Demoday, Japan' },
    { logo: 'aptos.png', name: 'APTOS', prize: 'Grand Prize at Aptos Hackathon, Singapore' },
    { logo: 'soonami.png', name: 'soonami.io', prize: 'On the Fast Track Prize at Soonami Venthuron' },
    { logo: 'akindo.png', name: 'AKINDO', prize: 'Several Prizes at Akindo WaveChack' },
    { logo: 'filecoin.png', name: 'Filecoin', prize: 'Grand Prize at Filecoin Browsers 3000 Hackathon' },
  ];

  const positions = [
    { top: '5%', left: '45%', width: '170px', height: '80px' },
    { top: '30%', left: '10%', width: '170px', height: '80px' },
    { top: '45%', left: '50%', width: '180px', height: '55px' },
    { top: '70%', left: '20%', width: '130px', height: '40px' },
    { top: '70%', left: '53%', width: '160px', height: '80px' },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-blue-900 min-h-screen text-white pt-20">
      <h1 className="text-5xl  text-center ml-20 m-20">Join the Winners!</h1>
      <div className="max-w-4xl mx-auto flex">
        <div className="w-1/2 relative h-80">
          {achievements.map((item, index) => (
            <img 
              key={index} 
              src={item.logo} 
              alt={item.name} 
              className="absolute"
              style={{
                top: positions[index % positions.length].top,
                left: positions[index % positions.length].left,
                width: positions[index % positions.length].width,
                height: positions[index % positions.length].height,
              }}
            />
          ))}
        </div>
        <div className="w-1/2 space-y-4">
          {achievements.map((item, index) => (
            <a 
              key={index} 
              href="#" 
              className="block text-blue-300 hover:text-blue-200 transition-colors duration-300 mt-10 ml-20  text-xl w-[90vh]"
            >
              {item.prize} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinnersPage;
