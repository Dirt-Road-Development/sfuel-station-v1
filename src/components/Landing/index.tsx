import { useContext, useEffect, useState } from 'react';
import Projects from '../../config/platforms.json';
import { ThemeContext } from '../../context/ThemeContext';
import * as Component from './styles';

export default function Landing() {

    const { isDarkTheme } = useContext(ThemeContext);
    
    return (
        <Component.Container>
            <Component.Centered>
                <Component.Title>The sFUEL Station</Component.Title>
                <Component.Slogan>Fueling the SKALEVERSE</Component.Slogan>
            </Component.Centered>
            <Component.Supporting>
                {Projects.chains.map((proj, index: number) => {
                    const color: string = !isDarkTheme? proj.light : proj.dark;
                    return <Component.Word href={proj.url} color={color} key={index}>{proj.name}</Component.Word>;
                })}
            </Component.Supporting>
        </Component.Container> 
    );
}
