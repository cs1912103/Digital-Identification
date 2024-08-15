import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/GlobalState";
import { AddDeath } from "../store/asyncActions";
import Loader from "../images/loader.gif";

function Death() {

    const navigate = useNavigate();

    const[cnic,setcnic] = useState("")
    var [{ contract,accounts },dispatch] = useStore();
    const [isTransactionInProcess, setTransactionInprocess] = useState(false);
    const [isTransactionSuccessful, setTransactionSuccessful] = useState(true);
    const [transactionError, setTransactionError] = useState("");

    const logOut = () => {
        localStorage.setItem("death", "false");
        window.location.href = "/landing";
    };

    const handleSubmit = async () => {
        console.log(cnic);
    
        setTransactionSuccessful(true);
        setTransactionError("");
    
        try {
          setTransactionInprocess(true);
          const newTransaction = {
            cnic: cnic,
          };

          await AddDeath(contract, accounts, newTransaction, dispatch);
        //   window.location.href='/show-unoin'
          setTransactionInprocess(false);
          setTransactionSuccessful(true);
        } catch (error) {
          console.log("error trax = ", error);
          setTransactionInprocess(false);
          setTransactionSuccessful(false);
          setTransactionError(error.message);
        }
      };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <button className="btn btn-info" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="btn btn-info" onClick={logOut}>
          LOGOUT
        </button>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="card card-primary">
            <div className="card-header">
              <h4>Add Death Status</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="name">CNIC</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={(e)=>setcnic(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                        <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                          onClick={handleSubmit}
                        >
                        Die
                        </button>
                </div>
                <center>
                    {isTransactionInProcess && (
                    <img width="40px" src={Loader} alt="Loading..." />
                    )}
                    {isTransactionSuccessful == true ? (
                    <div style={{ color: "green" }}></div>
                    ) : null}
                    {!isTransactionSuccessful && (
                    <div style={{ color: "red" }}>{transactionError}</div>
                    )}
              </center>
            </div>
        </div>
        </div>
    </div>
    </div>
    </div>
  );
}

export default Death;
