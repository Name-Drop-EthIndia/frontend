import React from 'react'
import { useState } from 'react'
import lighthouse from '@lighthouse-web3/sdk';

const LightHouseUpload = () => {

    const [file, setFile] = useState();
    const profile_metaData = {
    "name": "My NFT",
    "description": "A description of my NFT",
    "image": "IMAGE_URL",
    "attributes": [
        { "trait_type": "trait1", "value": "trait1_value" },
        { "trait_type": "trait2", "value": "trait2_value" }
    ]   
    }

    const apiKey = 'YOUR_API_KEY_HERE';

    const uploadImage = async() =>{
        const filePath = file;
        const uploadImage = await lighthouse.upload(filePath, apiKey);
        console.log('File uploaded to IPFS via Lighthouse:', uploadImage);
        return uploadImage;
    }

    const uploadMetadata = async() => {
        const metadataResponse = await lighthouse.upload(metadata, apiKey);
        console.log('Metadata uploaded to IPFS via Lighthouse:', metadataResponse);
        return metadataResponse;
    }

  return (
    <div>
        <input type="file" onChange={(e) => {
            if(e.target.files){
                setFile(e.target.files[0]);
            }
        }}/>
        <button onClick={uploadImage}>Upload</button>
        <button onClick={uploadMetadata}>Upload</button>
    </div>
  )
}

export default LightHouseUpload