import { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBSpinner
} from 'mdb-react-ui-kit';
import Cards from '../components/cards';

export default function App() {
    const [wallet, setWalletAddress] = useState("");
    const [collection, setCollectionAddress] = useState("");
    const [OnLoading, setOnLoading] = useState(false);
    const [NFTs, setNFTs] = useState([]);
    const [fetchForCollection, setFetchForCollection] = useState(false);

    //fetchNFTs via Alchemy API.
    const fetchNFTs = async () => {
        setOnLoading(true);
        let nfts;
        const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
        const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
        var requestOptions = {
            method: 'GET'
        };

        if (!collection.length) {
            const fetchURL = `${baseURL}?owner=${wallet}`;
            nfts = await fetch(fetchURL, requestOptions).then(data => data.json()).finally(() => { setOnLoading(false) })
        } else {
            console.log("fetching nfts for collection owned by address")
            const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
            nfts = await fetch(fetchURL, requestOptions).then(data => data.json()).finally(() => { setOnLoading(false) })
        }

        if (nfts) {
            console.log("nfts:", nfts)
            setNFTs(nfts.ownedNfts)
        }
    }

    //fetchNFTsForCollection via alchemy API.
    const fetchNFTsForCollection = async () => {
        setOnLoading(true);
        if (collection.length) {
            var requestOptions = {
                method: 'GET'
            };
            const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
            const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
            const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
            const nfts = await fetch(fetchURL, requestOptions).then(data => data.json()).finally(() => { setOnLoading(false) })
            if (nfts) {
                console.log("NFTs in collection:", nfts)
                setNFTs(nfts.nfts)
            }
        }
    }

    return (
        <>
            <div className="d-flex flex-row mb-2">
                <div className="p-2"><MDBInput className='mb-4' type='text' onChange={(e) => { setWalletAddress(e.target.value) }} value={wallet} label='wallet' /></div>
                <div className="p-2"><MDBInput className='mb-4' type='text' onChange={(e) => { setCollectionAddress(e.target.value) }} value={collection} label='collection' /></div>
                <div className="p-2"><MDBCheckbox label='Fetch for collection' onChange={(e) => { setFetchForCollection(e.target.checked) }} value={fetchForCollection} /></div>

                {!OnLoading ? <div className="p-2"><MDBBtn type='button' block onClick={() => {
                    if (fetchForCollection) {
                        fetchNFTsForCollection()
                    } else fetchNFTs()
                }}> Let's Go </MDBBtn></div> : ""}


                {OnLoading ? <div className='p-2'>
                    <MDBBtn disabled>
                        <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                        Loading...
                    </MDBBtn>
                </div> : ""}


                {/* <div className="p-2">
                    <MDBSpinner role='status' color='primary'>
                        <span className='visually-hidden'>Loading...</span>
                    </MDBSpinner>
                </div> */}
            </div>

            {
                NFTs.length ? <Cards nfts={NFTs} /> : ""
            }
        </>
    );
}