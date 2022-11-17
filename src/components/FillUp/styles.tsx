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
    // z-index: 10000;
    @media(max-width: 864px) {
        top: 0%;
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
    text-align: center;
    font-family: 'Spline Sans Mono', monospace;
    @media(max-width: 864px) {
        font-size: 2em;
    }
`;

export const Slogan = styled.p`
    font-size: 1.25em;
    color: var(--text-color);
    // z-index: 10000;
    text-align: center;
    @media(max-width: 864px) {
        font-size: 1.05em;
    }
`;


export const VisualToggle = styled.div`
    position: absolute;
    top: 5%;
    right: 5%;
`;

export const AddressInput = styled.input`
    width: 95%;
    height: 75px;
    padding: 0px 8px;
    background: none;
    border: 1px solid var(--accent-color);
    color: var(--text-color);
    fontSize: 1.25em;
    @media(max-width: 864px) {
        width: 100%;
        text-align: center;
    }
`;
export const FillAllButton = styled.div`
    width: 25%
    height: 75px;
    padding: 10px  8px;
    background: var(--accent-color);
    border: 1px solid var(--accent-color);
    color: var(--background-color);
    font-size: 1em;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @media(max-width: 864px) {
        width: 100%;
        height: 25px;
    }
`;

export const FillRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: auto;
    @media(max-width: 864px) {
       flex-wrap: wrap; 
    }
`;

export const Message = styled.p<{ color?: string }>`
    color: ${props => props.color ?? 'var(--text-color)'};
`;
