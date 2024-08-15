
export const setupWeb3 = (web3) => {
    return {
        type: 'SETUP_WEB3',
        payload: web3
    };
}

export const setupContract = (contract) => {
    return {
        type: 'SETUP_CONTRACT',
        payload: contract
    };
}


export const addEthereumAccounts = (accounts) => {
    return {
        type: 'ADD_ETHEREUM_ACCOUNTS',
        payload: accounts
    };
}

export const chainID = (_id) => {
    return {
        type: 'CHAIN_ID',
        payload: _id
    };
}

export const web3LoadingError = (errorMessage) => {
    return {
        type: 'WEB3_LOADING_ERROR',
        errorMessage: errorMessage
    };
}

export const setupContractOwner = (owner) => {
    return {
        type: 'SETUPCONTRACTOWNER',
        payload: owner
    };
}

export const cnics = (data) => {
    return {
        type: 'CNICS',
        payload: data
    };
}