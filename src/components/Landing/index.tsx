import * as Component from './styles';
import ChainList from '../ChainList';

interface Props {
    network: "mainnet" | "staging" | "hackathon";
}

export default function Landing(props: Props) {
     
    return (
        <Component.Container>
            <Component.Centered>
                <Component.Title>The sFUEL Station</Component.Title>
                <Component.Slogan>Fueling the SKALEVERSE</Component.Slogan>
            </Component.Centered>
            <ChainList network={props.network} />
        </Component.Container> 
    );
}
