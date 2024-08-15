import React, { useState } from "react";
import { useStore } from "../context/GlobalState";
import { AddEducation } from "../store/asyncActions";
import Loader from "../images/loader.gif";
import { InputGroup, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Educations() {
  const [getView, setView] = React.useState(0);

  const [cnic, setcnic] = useState("");
  const [subject, setsubject] = useState("SSC");
  const [marks, setmarks] = useState(0);
  const [percentage, setpercentage] = useState(0.0);
  const [grades, setgrade] = useState("");
  const [date, setdate] = useState(0);

  const [{ contract, accounts }, dispatch] = useStore();
  const [isTransactionInProcess, setTransactionInprocess] = useState(false);
  const [isTransactionSuccessful, setTransactionSuccessful] = useState(true);
  const [transactionError, setTransactionError] = useState("");
  const navigate = useNavigate();

  const initialState = {
    marks1: "",
    marks2: "",
    marks3: "",
    marks4: "",
    marks5: "",
    marks6: "",
    marks7: "",
  };

  const [getMarks, setMarks] = React.useState(initialState);

  const Calculation = (e) => {
    e.preventDefault();
    const total =
      Number(getMarks.marks1) +
      Number(getMarks.marks2) +
      Number(getMarks.marks3) +
      Number(getMarks.marks4) +
      Number(getMarks.marks5) +
      Number(getMarks.marks6) +
      Number(getMarks.marks7);
    document.getElementById("total").value = total;
    setmarks(total);
    const percent = parseFloat(((total * 100) / 700).toFixed(0));
    document.getElementById("percent").value = percent;
    setpercentage(percent);
    if (percent >= 80.0 && percent <= 100.0) {
      document.getElementById("grade").value = "A+";
      setgrade("A+");
    } else if (percent >= 70.0 && percent < 80.0) {
      document.getElementById("grade").value = "A";
      setgrade("A");
    } else if (percent >= 60.0 && percent < 70.0) {
      document.getElementById("grade").value = "B";
      setgrade("B");
    } else if (percent >= 50.0 && percent < 60.0) {
      document.getElementById("grade").value = "C";
      setgrade("C");
    } else if (percent >= 40.0 && percent < 50.0) {
      document.getElementById("grade").value = "D";
      setgrade("D");
    } else {
      document.getElementById("grade").value = "Fail";
      setgrade("Fail");
    }
  };

  const handleSubmit = async () => {
    console.log(cnic);
    console.log(subject);
    console.log(marks);
    console.log(grades);
    console.log(percentage);
    console.log(date);

    setTransactionSuccessful(true);
    setTransactionError("");

    try {
      setTransactionInprocess(true);
      const newTransaction = {
        cnic: cnic,
        subject: subject,
        marks: marks,
        percentage: percentage,
        grade: grades,
        date: date,
      };
      await AddEducation(contract, accounts, newTransaction, dispatch);
      window.location.href='/show-education'
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
    localStorage.setItem("education", "false");
    window.location.href = "/landing";
  };

  const handleCNICOnChange = (e) => {
    setcnic(e.replace(/[^0-9\.-]+/g, ""));
  };

  return (
    <div>
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
                <h4>SSC & HSC Certificate</h4>
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
                        onChange={(e) => handleCNICOnChange(e.target.value)}
                        maxlength="16"
                        value={cnic}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="city">Subject</label>
                      <select
                        id="subject"
                        className="form-control"
                        onChange={(e) => setsubject(e.target.value)}
                      >
                        <option value="SSC" selected>
                          SSC
                        </option>
                        <option value="HSC" selected>
                          HSC
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="weaponNum">Marks</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Englishb
                      </InputGroup.Text>
                      <FormControl
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 2);
                        }}
                        type="number"
                        placeholder="marks"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setMarks({ ...getMarks, marks1: e.target.value });
                        }}
                        value={getMarks.marks1}
                      />
                      <InputGroup.Text id="basic-addon1">/100</InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="col-md-6">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        English2
                      </InputGroup.Text>
                      <FormControl
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 2);
                        }}
                        type="number"
                        placeholder="marks"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setMarks({ ...getMarks, marks2: e.target.value });
                        }}
                        value={getMarks.marks2}
                      />
                      <InputGroup.Text id="basic-addon1">/100</InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="col-md-6">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">Urdu</InputGroup.Text>
                      <FormControl
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 2);
                        }}
                        type="number"
                        placeholder="marks"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setMarks({ ...getMarks, marks3: e.target.value });
                        }}
                        value={getMarks.marks3}
                      />
                      <InputGroup.Text id="basic-addon1">/100</InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="col-md-6">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">Maths</InputGroup.Text>
                      <FormControl
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 2);
                        }}
                        type="number"
                        placeholder="marks"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setMarks({ ...getMarks, marks4: e.target.value });
                        }}
                        value={getMarks.marks4}
                      />
                      <InputGroup.Text id="basic-addon1">/100</InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="col-md-6">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Physics
                      </InputGroup.Text>
                      <FormControl
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 2);
                        }}
                        type="number"
                        placeholder="marks"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setMarks({ ...getMarks, marks5: e.target.value });
                        }}
                        value={getMarks.marks5}
                      />
                      <InputGroup.Text id="basic-addon1">/100</InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="col-md-6">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Chemistry
                      </InputGroup.Text>
                      <FormControl
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 2);
                        }}
                        type="number"
                        placeholder="marks"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setMarks({ ...getMarks, marks6: e.target.value });
                        }}
                        value={getMarks.marks6}
                      />
                      <InputGroup.Text id="basic-addon1">/100</InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="col-md-6">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">P.ST</InputGroup.Text>
                      <FormControl
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 2);
                        }}
                        type="number"
                        placeholder="marks"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setMarks({ ...getMarks, marks7: e.target.value });
                        }}
                        value={getMarks.marks7}
                      />
                      <InputGroup.Text id="basic-addon1">/100</InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      onClick={Calculation}
                    >
                      Calculate
                    </button>
                  </div>
                  <div className="col-md-6">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Total Marks
                      </InputGroup.Text>
                      <FormControl
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 2);
                        }}
                        type="number"
                        placeholder="marks"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        id="total"
                        disabled
                      />
                      <InputGroup.Text id="basic-addon1">/700</InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="col-md-6">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Percent%
                      </InputGroup.Text>
                      <FormControl
                        placeholder="percent"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        id="percent"
                        disabled
                      />
                    </InputGroup>
                  </div>
                  <div className="col-md-6">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">Grade</InputGroup.Text>
                      <FormControl
                        placeholder="grade"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        id="grade"
                        disabled
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => {
                        var date1 = new Date(e.target.value);
                        var date2 = date1.getTime() / 1000;
                        setdate(date2);
                      }}
                    />
                  </div>
                </div>
                {/* </div> */}
                <div className="form-group">
                  <button
                    type="button"
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
    </div>
  );
}
export default Educations;
