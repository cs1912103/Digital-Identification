import React, { useState } from 'react';
import { useStore } from "../context/GlobalState";

export default function UnionLogin(){

  const[pass,set_pass] = useState("")
  const [{ contract,accounts }] = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let _wallet = await contract.methods.crimeDeptAddress().call();
    if(_wallet !== accounts[0]){
        alert("You are not belong to Criminal Department!")
    }
    else if(_wallet !== pass){
      alert("You are passing wrong password! ")
    }
    else{
      window.localStorage.setItem("criminal","true");
      window.location.href = "/show-criminal";
    }
  
  }

 
  
    return (
      <div className="container mt-5">
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="row">
              <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                <div className="card card-primary">
                  <div className="card-header">
                    <h4>Criminal Login</h4>
                  </div>
                  <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="email">Wallet Address</label>
                        <input type="text" className="form-control" name="wallet" value={accounts[0]} readOnly />
                      </div>
                      <div className="form-group">
                        <div className="d-block">
                          <label htmlFor="password" className="control-label">Password</label>
                        </div>
                        <input type="password" className="form-control" name="password" required onChange={(e)=>set_pass(e.target.value)} />
                      </div>  
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">
                          Login
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
        </form>
      </div>
    );
  }
