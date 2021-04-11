import styled from 'styled-components';
import { Container as UnstyledContainer, Row as UnstyledRow, Col as UnstyledCol } from 'react-bootstrap';

const Container = styled(UnstyledContainer)`

@media screen and (max-width: 1280px) {
/* padding-left: 0px; */
/* padding-right: 0px; */

} 

/* min-width: 100%; */
/* padding-left: 15vw; */
/* padding-right: 15vw; */



`;

export const Row = styled(UnstyledRow)`
padding-top:8px;
padding-bottom:8px;

`;

export const Col = styled(UnstyledCol)`
/* padding-left:50px; */
/* padding-right:50px; */

`;

export const GridSection = styled.div`

`;

export default Container;
