export default (state, action) => {
    switch(action.type) {
      
      case 'SETUP_WEB3':
        return {
          ...state,
          web3: action.payload,
          web3LoadingErrorMessage: "",
          web3Loadded: true
        }
      case 'SETUP_CONTRACT':
        return {
          ...state,
          contract: action.payload
        }


      case 'ADD_ETHEREUM_ACCOUNTS':
        return {
          ...state,
          accounts: action.payload
        }

        case 'CHAIN_ID':
          return {
            ...state,
            chainid: action.payload
          }

      case 'WEB3_LOADING_ERROR':
        return {
          ...state,
          web3LoadingErrorMessage: action.errorMessage,
          web3Loadded: false
        }

        case 'CNICS':
          return {
            ...state,
            allcnics: action.payload,  
          }  

      case 'SETUPCONTRACTOWNER':
      return {
        ...state,
        owner: action.payload,  
      }
      
      default:
        return state;
    }
  }