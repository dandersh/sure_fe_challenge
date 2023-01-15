import { useEffect, useState } from 'react';

function PolicyholdersView() {
    const [policyholderData, setPolicyholderData] = useState()

    console.log(policyholderData)
    useEffect( () => {
        fetch('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders')
            .then( (response) => response.json())
            .then( (json) => setPolicyholderData(json))
    }, [])

    return (
        null
    )
}

export default PolicyholdersView