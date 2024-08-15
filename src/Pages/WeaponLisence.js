import React, { useState, useEffect } from "react";
import { useStore } from "../context/GlobalState";
import { AddWeaponLisence } from "../store/asyncActions";
import Loader from "../images/loader.gif";
import { useNavigate } from "react-router-dom";

function WeaponLisence() {
  const [cnic, setCnic] = useState("");
  const [wtype, setWtype] = useState("Self-loading pistols");
  const [newlisence, setnewlisence] = useState("");
  const [date, setDate] = useState(0);
  const [{ contract, accounts, allcnics }, dispatch] = useStore();
  const [isTransactionInProcess, setTransactionInprocess] = useState(false);
  const [isTransactionSuccessful, setTransactionSuccessful] = useState(true);
  const [transactionError, setTransactionError] = useState("");
  const navigate = useNavigate();

  var val1 = "";
  var val2 = "";
  const [complete_lisence, set_completelisence] = useState("");
  // store incremental license
  var inclisence = "";

  // useEffect(()=>{
  //   if(allcnics != null){
  //    allcnics.map((obj) => {
  //     contract.methods.WeaponLisenceData(obj).call().then((obj)=>{
  //           console.log(obj.lisence_no);
  //           setnewlisence(obj.lisence_no);
  //       });
  //     });
  //   }
  // },[allcnics]);

  const generateLisence = () => {
    if (newlisence === "") {
      inclisence = "ABC100001";
      document.getElementById("lisence").value = inclisence;
      set_completelisence(inclisence);
    } else {
      for (var i = 0; i < newlisence.length; i++) {
        var alpha = "";
        if (i < 3) {
          alpha = newlisence.charAt(i);
          val1 = val1.concat(alpha);
        } else {
          alpha = newlisence.charAt(i);
          val2 = val2.concat(alpha);
        }
      }
      val2 = parseInt(val2);
      val2 = val2 + 1;
      val2 = val2.toString();
      inclisence = inclisence.concat(val1);
      inclisence = inclisence.concat(val2);
      console.log(newlisence);
      console.log(inclisence);
      document.getElementById("lisence").value = inclisence;
      set_completelisence(inclisence);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(String(inclisence))
    // console.log(wtype)
    //   console.log(lisence)
    //  console.log(date)

    setTransactionSuccessful(true);
    setTransactionError("");

    try {
      setTransactionInprocess(true);
      const newTransaction = {
        cnic: cnic,
        weapon_type: wtype,
        lisence_no: complete_lisence,
        date: date,
      };
      console.log("transaction obj = ", newTransaction);
      await AddWeaponLisence(contract, accounts, newTransaction, dispatch);

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
    localStorage.setItem("weapon", "false");
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
              <h4>Weapon Lisence</h4>
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
                      onChange={(e) => {
                        setCnic(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="weapon">Weapon</label>

                    <select
                      id="vehicle"
                      className="form-control"
                      onChange={(e) => {
                        setWtype(e.target.value);
                      }}
                    >
                      <option value="Self-loading pistols" selected>
                        Self-loading pistols
                      </option>
                      <option value="Rifles and carbines">
                        Rifles and carbines
                      </option>
                      <option value="Sub-machine guns">Sub-machine guns</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="weaponNum">Weapon Lisence#</label>
                    <input
                      type="text"
                      id="lisence"
                      className="form-control"
                      name="lisence"
                      disabled
                    />
                    <br></br>
                    <input
                      type="button"
                      className="form-control"
                      onClick={generateLisence}
                      value="Generate Lisence#"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="weaponNum">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="lisence"
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

export default WeaponLisence;
