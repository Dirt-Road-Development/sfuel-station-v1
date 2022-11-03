import { useContext, useEffect, useState } from 'react';
// import Projects from '../../config/platforms.json';
import { ThemeContext } from '../../context/ThemeContext';
import * as Component from './styles';
import ChainList from '../ChainList';

export default function Landing() {

    const { isDarkTheme } = useContext(ThemeContext);
    
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
