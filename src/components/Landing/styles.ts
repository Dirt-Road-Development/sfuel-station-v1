import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const Centered = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -100000;
    @media(max-width: 864px) {
        top: 25%;
        left: 25%;
        right: 25%;
        width: 100%;
        transform: translate(-25%, 25%);
    }
`;

export const Title = styled.h1`
    font-size: 2.5em;
    color: var(--primary-color);
    // z-index: 10000;
    font-family: 'Spline Sans Mono', monospace;
    @media(max-width: 864px) {
        font-size: 2em;
    }
`;

export const Slogan = styled.p`
    font-size: 1.25em;
    color: var(--text-color);
    // z-index: 10000;
`;

export const SubTitle = styled.p`
    font-size: 0.95em;
    color: var(--text-color);
    // z-index: 10000;
`;

