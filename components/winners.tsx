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
    <div className="bg-primary min-h-screen text-white pt-20">
      <h1 className="text-5xl text-center ml-20 m-20">Join the Winners!</h1>
      <div className="max-w-4xl mx-auto flex">
        <div className="w-1/2 relative h-80">
          {achievements.map((item, index) => (
            <div 
              key={index} 
              className="absolute glow-effect"
              style={{
                top: positions[index % positions.length].top,
                left: positions[index % positions.length].left,
                width: positions[index % positions.length].width,
                height: positions[index % positions.length].height,
                filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 1)) drop-shadow(0 0 80px rgba(255, 255, 255, 0.8))',
                animation: 'glow 3s infinite alternate',
              }}
            >
              <img 
                src={item.logo} 
                alt={item.name} 
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
        <div className="w-1/2 space-y-4">
          {achievements.map((item, index) => (
            <a 
              key={index} 
              href="#" 
              className="block hover:text-blue-300 text-white hover:text-blue-200 transition-colors duration-300 mt-10 ml-20 text-xl w-[90vh]"
            >
              {item.prize} <span className="text-blue-300">↗</span>
            </a>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes glow {
          0% {
            filter: drop-shadow(0 0 40px rgba(255, 255, 255, 1)) drop-shadow(0 0 80px rgba(255, 255, 255, 0.8));
          }
          100% {
            filter: drop-shadow(0 0 60px rgba(255, 255, 255, 1)) drop-shadow(0 0 100px rgba(255, 255, 255, 0.8));
          }
        }
        .glow-effect {
          transition: filter 0.3s ease-in-out;
        }
        .glow-effect:hover {
          filter: drop-shadow(0 0 70px rgba(255, 255, 255, 1)) drop-shadow(0 0 120px rgba(255, 255, 255, 0.9)) !important;
        }
      `}</style>
    </div>
  );
};

export default WinnersPage;