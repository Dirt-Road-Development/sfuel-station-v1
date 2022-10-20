import { ConnectButton } from '@rainbow-me/rainbowkit';
import ThemeToggle from '../ThemeToggle';
import * as Component from './styles';

const Navigation = () => {
  
  return (
    <Component.Container>
      <Component.Title>
        sFUEL Station
      </Component.Title>
      <Component.Row>
        <ThemeToggle />
        <span style={{ width: '10px' }} />
        <ConnectButton />
        <span style={{ width: '10px' }} /> 
        </Component.Row>
    </Component.Container>
  );
}

export default Navigation;
