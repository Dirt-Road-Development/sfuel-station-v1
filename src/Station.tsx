import styled from 'styled-components';
import { useAccount } from 'wagmi';
import Components from './components';
import Landing from './components/Landing';
import Layout from './components/Layout';
import { connectWallet, disconnectWallet } from './utils/analytics';

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 85vh;
    width: 80%;
    @media(max-width: 864px) {
        left: 2.5%;
        right: 2.5%;
        height: 100vh;
        top: 2.5%;
        width: 95%;
    }
`;

export default function Station() {
    const { address, isConnected, isConnecting, isDisconnected, connector } = useAccount();
   
    const _name: string | undefined = connector?.name;

    if (isConnecting) {
        connectWallet(_name ?? "No Connector Label", [address ?? "No Address"]);
    }
    
    if (isDisconnected) {
        disconnectWallet(_name  ?? "No Connector Label", [address ?? "No Address"]);
    }

    if (isConnected) {
        return (
            <Layout>
                <Container>
                    <Components.FillUp />
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container>
                <Landing />    
            </Container>
        </Layout>
    );
}
