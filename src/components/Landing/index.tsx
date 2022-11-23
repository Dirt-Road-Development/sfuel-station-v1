import * as Component from './styles';
import ChainList from '../ChainList';

export default function Landing() {
     
    return (
        <Component.Container>
            <Component.Centered>
                <Component.Title>The sFUEL Station</Component.Title>
                <Component.Slogan>Fueling the SKALEVERSE</Component.Slogan>
            </Component.Centered>
            <ChainList />
        </Component.Container> 
    );
}
