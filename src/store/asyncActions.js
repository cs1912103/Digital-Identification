import {setupContractOwner,setupWeb3, setupContract, addEthereumAccounts, chainID ,web3LoadingError, cnics} from "./actions";
import Web3 from "web3";
import { NATION_ABI, NATION_ADDRESS } from '../contract/NationConract';

export const loadBlockchain = async(dispatch) =>{   
    try {
        console.log("Web3 = ",Web3);
        console.log("Web3.givenProvider = ",Web3.givenProvider);

        if(Web3.givenProvider){
        
            const web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
            dispatch(setupWeb3(web3));
            const contract = new web3.eth.Contract(NATION_ABI,NATION_ADDRESS);
            console.log("contract = ",contract);
            console.log("contract.methods = ",contract.methods);
            dispatch(setupContract(contract));
        
            let accounts = await web3.eth.getAccounts();
            dispatch(addEthereumAccounts(accounts));
            
            let chainid = await web3.eth.net.getId();
            dispatch(chainID(chainid));
            console.log(chainid)

            let allcnics = await contract.methods.getCnics().call()
            console.log("all cnics = ",allcnics);
            dispatch(cnics(allcnics));

            window.ethereum.on('accountsChanged', async (acc) => {
                accounts = await web3.eth.getAccounts();
                dispatch(addEthereumAccounts(accounts));
                console.log(acc)
            });

            // let contractOwner = await contract.methods.owner().call()
            // console.log("Contract Owner = ",contractOwner);
            // dispatch(setupContractOwner(contractOwner));
        
        }
        else {
            dispatch(web3LoadingError("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"))
        }
    }
    catch(error){
        console.log("Error in loading Web3 = ",error);
        if(error.code===4001){
            
            dispatch(web3LoadingError(error.message));
        }
    }
}




export const AddWeaponLisence = async(contract, accounts, transaction, dispatch)=>{
    console.log("before transaction");
    const receipt =  await contract.methods.Weapon_Lisence(transaction.cnic,transaction.weapon_type,transaction.lisence_no,transaction.date)
    .send({
        from : accounts[0]
        
    });
    console.log("after  transaction ", receipt);
    
}

export const AddMarriage = async(contract, accounts, transaction, dispatch)=>{
    console.log("before transaction");
    const receipt =  await contract.methods.Marriage(transaction.boy_name,transaction.boy_cnic,transaction.girl_name,transaction.girl_cnic,transaction.date)
    .send({
        from : accounts[0]
        
    });
    console.log("after  transaction ", receipt);
    
}


export const AddTrafficChallan = async(contract, accounts, transaction, dispatch)=>{
    console.log("before transaction");
    const receipt =  await contract.methods.Traffic_Challan(transaction.cnic,transaction.vehicle_no,transaction.challan_type,transaction.amount,transaction.date)
    .send({
        from : accounts[0]
        
    });
    console.log("after  transaction ", receipt);
    
}


export const AddPayChallan = async(contract, accounts, transaction, dispatch)=>{
    console.log("before transaction");
    console.log(transaction)
    const receipt =  await contract.methods.PayChallan(transaction.cnic,transaction.vehicle_no,transaction.challan_type,transaction.date)
    .send({
        from : accounts[0],
        value: transaction.challan_fee
    });
    console.log("after  transaction ", receipt);
    
}

export const AddEducation = async(contract, accounts, transaction, dispatch)=>{
    console.log("before transaction");
    const receipt =  await contract.methods.Educations(transaction.cnic,transaction.subject,transaction.marks,transaction.percentage,transaction.grade,transaction.date)
    .send({
        from : accounts[0]
        
    });
    console.log("after  transaction ", receipt);
    
}


export const AddUnionCouncil = async(contract, accounts, transaction, dispatch)=>{
    console.log("before transaction")
    console.log((transaction.cnic))
    const receipt =  await contract.methods.Union_Concil(transaction.name,transaction.cnic,transaction.f_name,transaction.m_name,transaction.f_cnic,transaction.m_cnic,transaction.gender,transaction.dob,transaction.city)
    .send({
        from : accounts[0]
        
    });
    console.log("after  transaction ", receipt);
    
}


export const AddDeath = async(contract, accounts, transaction, dispatch)=>{
    console.log("before transaction")
    console.log((transaction.cnic))
    const receipt =  await contract.methods.death(transaction.cnic)
    .send({
        from : accounts[0]
        
    });
    console.log("after  transaction ", receipt);
    
}


export const AddCriminalRecord = async(contract, accounts, transaction, dispatch)=>{
    console.log("before transaction");
    const receipt =  await contract.methods.Criminal_Record(transaction.cnic,transaction.remarks,transaction.record_found,transaction.date)
    .send({
        from : accounts[0]
        
    });
    console.log("after  transaction ", receipt);
    
}





