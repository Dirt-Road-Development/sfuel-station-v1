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
    z-index: 10000;
`;


export const Title = styled.h1`
    font-size: 2.5em;
    color: var(--primary-color);
    z-index: 10000;
    text-align: center;
    font-family: 'Spline Sans Mono', monospace;
`;

export const Slogan = styled.p`
    font-size: 1.25em;
    color: var(--text-color);
    z-index: 10000;
    text-align: center;
`;


export const VisualToggle = styled.div`
    position: absolute;
    top: 5%;
    right: 5%;
`;

export const AddressInput = styled.input({
    width: '75%',
    height: '100%',
    padding: '0px 8px',
    background: 'none',
    border: '1px solid var(--accent-color)',
    color: 'var(--text-color)'
});

export const FillAllButton = styled.div({
    width: '25%',
    height: '100%',
    background: 'var(--accent-color)',
    border: '1px solid var(--accent-color)',
    color: 'var(--background-color)',
    fontSize: '1em',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

export const FillRow = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '75px',
});

export const ChainStatusList = styled.div`
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

interface CSParams {
    color: string;
}

export const ChainStatus = styled.a<CSParams>`
    width: auto;
    min-width: 10vw;
    text-align: center;
    text-decoration: none;
    color: ${props => props.color};
    &:hover {
        color: var(--text-color);
    }
`;

