import {useContext} from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import * as Component from './styles';
import Projects from '../../config/platforms.json';
import { useParams } from 'react-router-dom';
import { chainNameExist } from '../../utils/chainIds';

interface Props {
    network: "mainnet" | "staging" | "hackathon";
}

export default function ChainList(props: Props) {

    const { isDarkTheme } = useContext(ThemeContext);

    const { chainName } = useParams();

    const isChainNameExist = chainNameExist({
        network: props.network,
        chainName: chainName
    });

    const projectsToMap = Projects[props.network].filter(proj => !isChainNameExist || proj.nameId.toLowerCase() === chainName?.toLowerCase())

    console.log(projectsToMap);

    return (
        <Component.Container>
            {projectsToMap.map((proj, index: number) => {
                const color: string = !isDarkTheme ? proj?.light : proj.dark;
                return <Component.Word href={proj.url} target="_blank" color={color} key={index}>{proj.name}</Component.Word>
            })}
        </Component.Container> 
    );
}
