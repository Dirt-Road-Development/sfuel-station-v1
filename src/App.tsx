import './App.css';
import Components from './components';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';
import Station from './Station';
import FuelCookieConsent from './components/CookieConsent';
import {initGoogleAnalytics} from './utils/analytics';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SFuelPopup } from './components/SFuelPopup';

const { chains, provider } = configureChains(
    [chain.mainnet],
    [
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
  appName: 'sFUEL Station',
  chains
});
 
const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

function App() {

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider 
        chains={chains}
        theme={darkTheme({
            accentColor: 'black',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
        })}
      >
            <Router>
                <main>
                    <Components.Navigation />
                        <FuelCookieConsent initGA={initGoogleAnalytics} />
                        <Routes>
                            <Route path='/' element={ <Station network="mainnet" /> } />
                            <Route path='/staging' element={ <Station network="staging" /> } />
                            <Route path='/staging/:chainName' element={ <Station network="staging" /> } />
                            <Route path='/hackathon' element={ <Station network="hackathon" /> } />
                        </Routes>
                    <SFuelPopup />
                    <Components.Footer/>
                </main>
            </Router>
        </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
