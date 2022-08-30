import { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
    const [wallet, setWalletAddress] = useState("");
    const [collection, setCollectionAddress] = useState("");
    const [NFTs, setNFTs] = useState([])

    //fetchNFTs via Alchemy API.
    const fetchNFTs = async () => {
        let nfts;
        console.log("fetching nfts");
        const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
        const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
        var requestOptions = {
            method: 'GET'
        };

        if (!collection.length) {
            const fetchURL = `${baseURL}?owner=${wallet}`;
            nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
        } else {
            console.log("fetching nfts for collection owned by address")
            const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
            nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
        }

        if (nfts) {
            console.log("nfts:", nfts)
            setNFTs(nfts.ownedNfts)
        }
    }


    //fetchNFTsForCollection via alchemy API.
    const fetchNFTsForCollection = async () => {
        if (collection.length) {
            var requestOptions = {
                method: 'GET'
            };
            const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
            const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
            const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
            const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
            if (nfts) {
                console.log("NFTs in collection:", nfts)
                setNFTs(nfts.nfts)
            }
        }
    }

    return (
        <form>
            <MDBInput className='mb-4' type='text' id='form1Example1' label='wallet' />
            <MDBInput className='mb-4' type='text' id='form1Example2' label='collection' />

            <MDBRow className='mb-4'>
                <MDBCol className='d-flex justify-content-center'>
                    <MDBCheckbox id='form1Example3' label='Fetch for collection' defaultChecked />
                </MDBCol>
            </MDBRow>

            <MDBBtn type='submit' block>
                Let's Go
            </MDBBtn>
        </form>
    );
}