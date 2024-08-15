import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, InputGroup } from "react-bootstrap";
import { useStore } from "../context/GlobalState";
import { AddUnionCouncil } from "../store/asyncActions";
import Loader from "../images/loader.gif";

function UnionCouncil() {
  const [name, setname] = useState("");
  // const[cnic,setcnic] = useState("")
  const [fname, setfname] = useState("");
  const [mname, setmname] = useState("");
  const [fcnic, setfcnic] = useState("");
  const [mcnic, setmcnic] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState(0);
  const [city, setcity] = useState("Karachi");

  var [{ allcnics, contract, accounts }, dispatch] = useStore();
  const [isTransactionInProcess, setTransactionInprocess] = useState(false);
  const [isTransactionSuccessful, setTransactionSuccessful] = useState(true);
  const [transactionError, setTransactionError] = useState("");
  const [cnic22, setCnic22] = useState("");
  const navigate = useNavigate();

  var complete_cnic = "";

  const generateCnic = () => {
    var newcnic = "";
    allcnics.map((obj) => {
      newcnic = obj;
    });
    console.log(newcnic);

    var val1 = "";
    var val2 = "";
    var val3 = "";
    var i;
    for (i = 0; i < newcnic.length; i++) {
      var alpha = "";
      if (i < 6) {
        alpha = newcnic.charAt(i);
        val1 = val1.concat(alpha);
      } else if (i >= 6 && i < 13) {
        alpha = newcnic.charAt(i);
        val2 = val2.concat(alpha);
      } else {
        alpha = newcnic.charAt(i);
        val3 = val3.concat(alpha);
      }
    }
    // now  generating new cnic by increment of 1 in val2
    val2 = parseInt(val2);
    val2 = val2 + 1;
    val2 = val2.toString();
    complete_cnic = complete_cnic.concat(val1);
    complete_cnic = complete_cnic.concat(val2);
    complete_cnic = complete_cnic.concat(val3);
    document.getElementById("cnic").value = complete_cnic;
    setCnic22(complete_cnic);
    console.log(complete_cnic);
  };

  const setfdetail = (e) => {
    setfcnic(e.target.value);
    // eslint-disable-next-line array-callback-return
    allcnics.map((obj) => {
      console.log(obj);
      if (obj === e.target.value) {
        contract.methods
          .UnionConcilData(e.target.value)
          .call()
          .then((obj) => {
            console.log(obj.name);
            setfname(obj.name);
          });
      }
    });
  };

  const setmdetail = (e) => {
    setmcnic(e.target.value);
    // eslint-disable-next-line array-callback-return
    allcnics.map((obj) => {
      if (obj === e.target.value) {
        contract.methods
          .UnionConcilData(e.target.value)
          .call()
          .then((obj) => {
            console.log(obj.name);
            setmname(obj.name);
          });
      }
    });
  };

  const handleSubmit = async () => {
    console.log(name);
    console.log(complete_cnic);
    console.log(fname);
    console.log(mname);
    console.log(fcnic);
    console.log(mcnic);
    console.log(gender);
    console.log(dob);
    console.log(city);

    setTransactionSuccessful(true);
    setTransactionError("");

    try {
      setTransactionInprocess(true);
      const newTransaction = {
        name: name,
        cnic: cnic22,
        f_name: fname,
        m_name: mname,
        f_cnic: fcnic,
        m_cnic: mcnic,
        gender: gender,
        dob: dob,
        city: city,
      };
      await AddUnionCouncil(contract, accounts, newTransaction, dispatch);
      window.location.href = "/show-unoin";
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
    localStorage.setItem("union", "false");
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
              <h4>Add Union Council</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={(e) => setname(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cnic">CNIC</label>
                    <InputGroup>
                      <FormControl
                        aria-label="Recipient's username with two button addons"
                        disabled
                        value={cnic22}
                        id="cnic"
                      />
                      <input
                        type="button"
                        // className="form-control"
                        onClick={generateCnic}
                        value="Generate Cnic"
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="fathercnic">Father CNIC</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fathercnic"
                      // onChange={(e) => setfcnic(e.target.value)}
                      onChange={(e) => setfdetail(e)}
                      // value={fcnic}
                      // maxLength={13}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="fathername">Father Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fathername"
                      value={fname}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="mothercnic">Mother CNIC</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mothercnic"
                      onChange={(e) => setmdetail(e)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="mothername">Mother Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mothername"
                      value={mname}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="cnic">Gender </label>
                    <br />
                    <div className="form-check-inline">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          value="Male"
                          className="form-check-input"
                          name="optradio"
                          onChange={(e) => setgender(e.target.value)}
                        />
                        Male
                      </label>
                    </div>
                    <div className="form-check-inline">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          value="Female"
                          className="form-check-input"
                          name="optradio"
                          onChange={(e) => setgender(e.target.value)}
                        />
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="dateOFBirth">Bate Of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      name="mothercnic"
                      onChange={(e) => {
                        var date1 = new Date(e.target.value);
                        var date2 = date1.getTime() / 1000;
                        setdob(date2);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <select
                      id="city"
                      className="form-control"
                      onChange={(e) => setcity(e.target.value)}
                    >
                      <option value="Karachi" selected>
                        Karachi
                      </option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Lahore">Lahore</option>
                    </select>
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

export default UnionCouncil;
