import styled from 'styled-components';

export const Container = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 75px;
  background: var(--background-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Copyright = styled.p`
    width: 100%;
    text-align: center;
    color: silver;
    font-size: 0.75em;
`;
