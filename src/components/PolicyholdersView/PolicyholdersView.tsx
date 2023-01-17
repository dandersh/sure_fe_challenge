import { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import InfoTable from '../InfoTable';

  type TAddress = {
      city: string;
      line1: string;
      line2?: string;
      state: string;
      postalCode: string;
  }
  
  type TPolicy = {
      address: TAddress;
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

const policyKeys = ['Name', 'Age', 'Address', 'Phone number', 'Primary policyholder'];
const dataMap: Map<string, TPayload | any> = new Map();

function PolicyholdersView() {
    const [policyholderData, setPolicyholderData] = useState<Array<TFormattedPolicy>>([]);
    const [postedPolicy, setPostedPolicy] = useState<Array<TFormattedPolicy>>([]);
  
    const buildRows = (data: TPayload) => {
        let policyArr: Array<TFormattedPolicy> = []
        data.policyHolders.map( (policy: TPolicy) => {
            const values = Object.values(policy);
            policyKeys.map( (k, index) => {
                if (typeof values[index] !== 'object') {
                    policyArr.push({key: k, value: values[index].toString()});
                } else {
                    const {city, line1, line2, postalCode, state}: any = values[index];
                    policyArr.push({key: k, value: [line1, line2, city, postalCode, state].toString()});
                }    
            });
            return policyArr;      
        });
        return policyArr;
    }

    const postPolicy = () => {
       const postPayload = {
        "name": "Derek",
        "age": "76",
        "address": {
          "line1": "1412 E 33rd St",
          "line2": "",
          "city": "Minneapolis",
          "state": "MN",
          "postalCode": "55427",
        },
        "phoneNumber": "612-724-9989",
    }

       fetch('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postPayload)
       })
            .then( (response) => response.json())
            .then( (json) => setPostedPolicy(buildRows(json)))
            .catch( (err) => console.error(err))
    }

    useEffect( () => {
        if (!dataMap.has('policyHolders')) {
            fetch('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders')
            .then( (response) => response.json())
            .then( (json) => {
                setPolicyholderData(buildRows(json))
                return json;
            })
            .then( (json) => dataMap.set('policyHolders', json))
            .catch( (err) => console.error(err))
        } else {
            setPolicyholderData(buildRows(dataMap.get('policyHolders')))
        }
    }, [])

    return (
        <Box textAlign='center'>
            {
                postedPolicy.length > 0
            ?
                <InfoTable header="Policyholder Details" rows={postedPolicy} />
            :
                <InfoTable header="Policyholder Details" rows={policyholderData} />
            }
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
    )
}

// TODOs before Prod release:
    // Users address could be formatted better.
    // The navlink active styling should probably be less garish. 
    // InfoTable is not the best way to display policy holders. It should be a data table with the harcoded keys passed in as the `headers` and a newly added policy would just be `pushed` to the array of policy holders.
    // Regardless of the above `InfoTable` should be made more flexible for the `values` it takes, possibly through a generic of types such as `string | boolean | object`
    // Clarity around button text being uppercase (as MUI default) or lowercase (as defined in the challenge requirements)
    // Clarity around whether `Primary policyholder` should display as a `boolean` or converted to a `yes` or `no` value
    // More robust error handling for the GET/POST call instead of just logging to the console
    // Add Cypress tests to handle other nav links as well as the `View Challenges` button
    // The two uses of `any` here should be fixed

    /*** GLOBAL CONSIDERATIONS ***/
    // A decision should be made about handling custom styling both globally (through `theme`) as well as locally using `styled-components`, etc. as the previous "easy" solution using MUI `makeStyles` and `useStyles` is now deprecated (https://mui.com/system/styles/basics/)
    // The `cypress` happy path tests could remove the `intercept` call and by verifying the the table is loaded with data know that the network request was successful. This would help with performance, especially if parallelization is not used
    // Linting rules should be enforced around whitespaces, semicolons, ternary formating, etc.
    // Formatting rules should be enforced to prevent inconsistencies from dev to dev/ide to ide. 
    // As the app grows a more robust data fetching solution should be used such as React Query.

export default PolicyholdersView