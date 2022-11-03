import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    position: absolute;
    bottom: 10%;
    left: 0;
    right: 0;
    display: flex;
    align-items: space-between;
    justify-content: center;
    flex-wrap: wrap;
    @media(max-width: 864px) {
        bottom: 25%;
        align-items: space-evenly;
    }
`;

interface WordParams {
    color: string;
}

export const Word = styled.a<WordParams>`
    width: auto;
    min-width: 10vw;
    text-align: center;
    text-decoration: none;
    color: ${props => props.color};
    &:hover {
        color: var(--text-color);
    }

    @media(max-width: 864px) {
        min-width: 12vw;
        margin: 0 4px;
    }
`;
