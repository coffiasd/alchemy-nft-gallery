import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBInputGroup,
    MDBIcon
} from 'mdb-react-ui-kit';
import React from 'react';
import Metamask from './metamask';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export default function Header() {
    const [showBasic, setShowBasic] = React.useState(false);

    return (
        <>
            <MDBNavbar expand='lg' light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='#'>
                        <MDBIcon fab icon="mdb" size='2x' />
                    </MDBNavbarBrand>

                    <MDBNavbarToggler
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowBasic(!showBasic)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showBasic}>
                        <MDBNavbarNav className='' right>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/'>
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='#'>Twitter</MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink href='#'>Github</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>

                        <span>
                            <MDBIcon fab icon="ethereum" size="lg" />
                        </span>
                        <span>
                            <MDBNavbarLink href='#'><Metamask /></MDBNavbarLink>
                        </span>

                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar >
        </>
    );
}