import styled from 'styled-components';

const Container = styled.div`
     position: relative;
     margin: 0 auto;
     width: 40px;
     height: 40px;
`;

export default function LoadingIcon() {
 
     return (
         <Container className="lds-default">
             <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
         </Container>
     );
 }

