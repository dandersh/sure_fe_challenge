import { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import InfoTable from '../InfoTable'

  type TPolicy = {
      address?: object;
      age: number;
      isPrimary: boolean;
      name: string;
      phoneNumber: string;
  }

  type TPayload = {
      policyHolders: Array<TPolicy>
  }

  type TFormattedPolicy = {
      key: string;
      value: string;
  }

const policyKeys = ['Name', 'Age', 'Address', 'Phone number', 'Primary policyholder']

function PolicyholdersView() {
    const [policyholderData, setPolicyholderData] = useState<Array<TFormattedPolicy>>([])
  
    const buildRows = (data: TPayload) => {
        let policyArr: Array<TFormattedPolicy> = []
        data.policyHolders.map( (policy: TPolicy) => {
            const values = Object.values(policy)
            policyKeys.map( (k, index) => {
                if (typeof values[index] !== 'object') {
                    policyArr.push({key: k, value: values[index].toString()})
                } else {
                    policyArr.push({key: k, value: JSON.stringify(values[index])})
                }    
            })
            return policyArr      
        })
        return policyArr
    }

    const postPolicy = () => {
       const postPayload = {
        "name": 'Derek',
        "age": '76',
        "address": {
          "line1": '1412 E 33rd St',
          "line2": '',
          "city": 'Minneapolis',
          "state": 'MN',
          "postalCode": '55427',
        },
        "phoneNumber": '612-724-9989',
    }

       fetch('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postPayload)
       })
            .then( (response) => response.json())
    }

    useEffect( () => {
        fetch('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders')
            .then( (response) => response.json())
            .then( (json) => setPolicyholderData(buildRows(json)))
    }, [])

    return (
        <>
        {
            policyholderData.length > 0
            ?
                <Box
                    textAlign='center'
                >
                    <InfoTable header="Policyholder Details" rows={policyholderData} /> 
                    <Button
                        onClick={postPolicy}
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            marginTop: '20px',
                            textTransform: 'none'
                        }}
                    >
                        Add a policyholder
                    </Button>
                </Box>
            : null}
       </>
    )
}

export default PolicyholdersView