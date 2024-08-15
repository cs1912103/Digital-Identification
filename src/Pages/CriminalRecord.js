import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStore } from "../context/GlobalState";
import { AddCriminalRecord } from "../store/asyncActions";
import Loader from "../images/loader.gif";

function CriminalRecord() {
  const [cnic, setCnic] = useState("");
  const [record, setrecord] = useState(false);
  const [remarks, setremarks] = useState("");
  const [date, setDate] = useState(0);
  const [{ contract, accounts }, dispatch] = useStore();
  const [isTransactionInProcess, setTransactionInprocess] = useState(false);
  const [isTransactionSuccessful, setTransactionSuccessful] = useState(true);
  const [transactionError, setTransactionError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log(cnic);
    console.log(record);
    console.log(remarks);
    console.log(date);

    setTransactionSuccessful(true);
    setTransactionError("");

    try {
      setTransactionInprocess(true);
      const newTransaction = {
        cnic: cnic,
        record_found: record,
        remarks: remarks,
        date: date,
      };
      await AddCriminalRecord(contract, accounts, newTransaction, dispatch);

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
    localStorage.setItem("criminal", "false");
    window.location.href = "/landing";
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
              <h4>Add Criminal Record</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cnic">Enter CNIC#</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cnic"
                      onChange={(e) => setCnic(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cnic">Record Found </label>
                    <br />
                    <div className="form-check-inline">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          value={true}
                          className="form-check-input"
                          name="optradio"
                          onChange={(e) => setrecord(e.target.value)}
                        />
                        Yes
                      </label>
                    </div>
                    <div className="form-check-inline">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          value={false}
                          className="form-check-input"
                          name="optradio"
                          onChange={(e) => setrecord(e.target.value)}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cnic">Remarks</label>
                    <textarea
                      className="form-control"
                      onChange={(e) => setremarks(e.target.value)}
                    >
                      {" "}
                    </textarea>
                  </div>
                </div>
                <div className="col-md-6">
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

              {isTransactionInProcess && (
                <img width="40px" src={Loader} alt="Loading..." />
              )}
              {isTransactionSuccessful == true ? (
                <div style={{ color: "green" }}></div>
              ) : null}
              {!isTransactionSuccessful && (
                <div style={{ color: "red" }}>{transactionError}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CriminalRecord;
