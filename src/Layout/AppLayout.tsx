import React from 'react';
import { Header } from '../Components/Header';
import Container from "react-bootstrap/Container";
type AppLayoutProps = { children: React.ReactNode }

const AppLayout: React.FC<AppLayoutProps> = (props) => {
    return (
        <Container fluid>
            <Container style={{marginBottom:50}}>
                 <Header />
            </Container>
           
            {props.children}
        </Container>
    )
}

export default AppLayout

