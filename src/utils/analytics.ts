import ReactGA from "react-ga4";

export const initGoogleAnalytics = (id: string) => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.initialize(id);
  }
};

export const fillUpChains = (label: string, chains: string[]) => {
    ReactGA.event({
        category: 'sFUEL - Fill Up',
        action: "Get sFUEl",
        label: label,
        value: chains.length
    }, chains);
}

export const changeAddress = (label: string, addresses: string[]) => {
    ReactGA.event({
        category: "sFUEL - Fill Up",
        label: label,
        action: "Change Address"
    }, addresses);
}

export const connectWallet = (label: string, addresses: string[]) => {
    ReactGA.event({
        category: "Station",
        label: label,
        action: "Connect Wallet",
    }, addresses);
}


export const disconnectWallet = (label: string, addresses: string[]) => {
    ReactGA.event({
        category: "Station",
        label: label,
        action: "Connect Wallet",
    }, addresses);
}
