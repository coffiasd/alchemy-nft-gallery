import React from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';


export default function App({ nfts }) {

    const fixTokenId = function (tokenId) {
        return tokenId.substring(tokenId.length - 4);
    }

    const fixAddress = function (address) {
        const fix = address.substring(0, 4) + "****" + address.substring(address.length - 4)
        return fix;
    }

    return (
        <MDBContainer>
            <MDBRow>
                {
                    nfts ? nfts.map(nft => {
                        return (
                            <MDBCol md='3'>
                                <MDBCard alignment='center'>
                                    <MDBCardImage src={nft.media[0].raw} position='top' alt='...' />
                                    <MDBCardBody>
                                        <span>ID: {fixTokenId(nft.id.tokenId)}</span>
                                        <p>Address:{fixAddress(nft.contract.address)}</p>
                                        <MDBBtn href="https://etherscan.io/address/{nft.contract.address}">View On Ethereum</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        )
                    }) : ""
                }
            </MDBRow>
        </MDBContainer>
    );
}