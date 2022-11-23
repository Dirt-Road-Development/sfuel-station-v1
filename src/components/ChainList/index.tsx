import {useContext} from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import * as Component from './styles';
import Projects from '../../config/platforms.json';

export default function ChainList() {

    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <Component.Container>
            {Projects.chains.map((proj, index: number) => {
                const color: string = !isDarkTheme ? proj.light : proj.dark;
                return <Component.Word href={proj.url} target="_blank" color={color} key={index}>{proj.name}</Component.Word>
            })}
        </Component.Container> 
    );
}
