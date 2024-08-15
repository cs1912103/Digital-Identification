import React, { useState } from "react";
import { useStore } from "../context/GlobalState";
import { AddMarriage } from "../store/asyncActions";
import Loader from "../images/loader.gif";
import { useNavigate } from "react-router-dom";

function MerriageRecord() {
  const [boyname, setboyname] = useState("");
  const [girlname, setgirlname] = useState("");
  const [boycnic, setboycnic] = useState("");
  const [girlcnic, setgirlcnic] = useState("");
  const [date, setDate] = useState(0);
  const [{ allcnics,contract, accounts }, dispatch] = useStore();
  const [isTransactionInProcess, setTransactionInprocess] = useState(false);
  const [isTransactionSuccessful, setTransactionSuccessful] = useState(true);
  const [transactionError, setTransactionError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async () => {
    console.log(boyname);
    console.log(boycnic);
    console.log(girlname);
    console.log(girlcnic);
    console.log(date);

    setTransactionSuccessful(true);
    setTransactionError("");

    try {
      setTransactionInprocess(true);
      const newTransaction = {
        boy_name: boyname,
        boy_cnic: boycnic,
        girl_name: girlname,
        girl_cnic: girlcnic,
        date: date,
      };
      await AddMarriage(contract, accounts, newTransaction, dispatch);

      setTransactionInprocess(false);
      setTransactionSuccessful(true);
    } catch (error) {
      console.log("error trax = ", error);
      setTransactionInprocess(false);
      setTransactionSuccessful(false);
      setTransactionError(error.message);
    }
  };

  const logOut = () => {
    localStorage.setItem("marriage", "false");
    window.location.href = "/landing";
  };

  const handleBoyCNICOnChange = (e) => {
    setboycnic(e.target.value);
    allcnics.map((obj) => {
      if (obj == e.target.value) {
          contract.methods.UnionConcilData(e.target.value).call().then((obj)=>{
          console.log(obj.name)
          setboyname(obj.name);
         });
      }
  });
  };

  const handleGirlLCNICOnChange = (e) => {
    setgirlcnic(e.target.value);
    allcnics.map((obj) => {
      if (obj == e.target.value) {
          contract.methods.UnionConcilData(e.target.value).call().then((obj)=>{
          console.log(obj.name)
          setgirlname(obj.name);
         });
      }
  });
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
              <h4>Add Marriage</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cnic">Enter Boy CNIC#</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cnic"
                      onChange={(e) => handleBoyCNICOnChange(e)}
                      //maxlength="13"
                      value={boycnic}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cnic">Enter Boy Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cnic"
                      disabled
                      value={boyname}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cnic">Enter Girl CNIC#</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cnic"
                      onChange={(e) => handleGirlLCNICOnChange(e)}
                      //maxlength="13"
                      value={girlcnic}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cnic">Enter Girl Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cnic"
                      disabled
                      value={girlname}
                    />
                  </div>
                </div>
               
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="cnic">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => {
                        var date1 = new Date(e.target.value);
                        var date2 = date1.getTime() / 1000;
                        setDate(date2);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={handleSubmit}
                >
                  Submit
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
  );
}
export default MerriageRecord;
