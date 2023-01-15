import { useEffect, useState } from 'react';
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

    useEffect( () => {
        fetch('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders')
            .then( (response) => response.json())
            .then( (json) => setPolicyholderData(buildRows(json)))
    }, [])

    return (
        <>
        {policyholderData.length > 0 ? <InfoTable header="Policyholder Details" rows={policyholderData} /> : null}
       </>
    )
}

export default PolicyholdersView