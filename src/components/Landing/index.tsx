import { useContext, useEffect, useState } from 'react';
import styled  from 'styled-components';
import Projects from '../../config/platforms.json';
import { ThemeContext } from '../../context/ThemeContext';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Centered = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
`;

const Title = styled.h1`
    font-size: 2.5em;
    color: var(--primary-color);
    z-index: 10000;
    font-family: 'Spline Sans Mono', monospace;
    // background: linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, gold, orange, red);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    // &:[data-theme="dark"] {
    //     background: linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
    // }
`;

const Slogan = styled.p`
    font-size: 1.25em;
    color: var(--text-color);
    z-index: 10000;
`;

const SubTitle = styled.p`
    font-size: 0.95em;
    color: var(--text-color);
    z-index: 10000;
`;

const Supporting = styled.div`
    width: 100%;
    position: absolute;
    bottom: 10%;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: space-between;
    justify-content: center; 
    flex-wrap: wrap;
`;

interface WordParams {
    color: string;
}

const Word = styled.a<WordParams>`
    width: auto;
    min-width: 10vw;
    text-align: center;
    text-decoration: none;
    color: ${props => props.color};
    &:hover {
        color: var(--text-color);
    }
`;

export default function Landing() {

    const { isDarkTheme } = useContext(ThemeContext);
    
    return (
        <Container>
            <Centered>
                <Title>The sFUEL Station</Title>
                <Slogan>Fueling the SKALEVERSE</Slogan>
                {/*<SubTitle>Connect your wallet to access network faucets</SubTitle>*/}
            </Centered>
            <Supporting>
                {Projects.chains.map((proj, index: number) => {
                    const color: string = !isDarkTheme? proj.light : proj.dark;
                    return <Word href={proj.url} color={color} key={index}>{proj.name}</Word>;
                })}
            </Supporting>
        </Container> 
    );
}
