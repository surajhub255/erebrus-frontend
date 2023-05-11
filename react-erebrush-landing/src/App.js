import './App.css';
import Features from './components/Features';
import Footer from './components/Footer';
import Howto from './components/Howto';
import Navbar from './components/Navbar';
import Vpn from './components/Vpn/Vpn';
import Pricing from './components/Pricing';

function App() {
  return (
    <div className="bg-black">
     <Navbar/>
     <Vpn/>
      <Features/> 
<Howto/>
<Pricing/>
     <Footer/>
    </div>
  );
}

export default App;
