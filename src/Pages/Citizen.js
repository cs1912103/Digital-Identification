import { useStore } from "../context/GlobalState";
import React, { useState, useEffect } from "react";
import { AddPayChallan } from "../store/asyncActions";
import Loader from "../images/loader.gif";
import { Table } from "react-bootstrap";

function Citizen() {
  const [citizen_UnionCouncil,set_citizen_UnionCouncil] = useState([]);
  const [citizen_Education,set_citizen_Education] = useState([]);
  const [citizen_Weapon,set_citizen_Weapon] = useState([]);
  const [citizen_TrafficChallan,set_citizen_TrafficChallan] = useState([]);
  const [citizen_CriminalRecord,set_citizen_CriminalRecord] = useState([]);
    
  const [{ contract, accounts }, dispatch] = useStore();
  const [cnic, setcnic] = useState("");
  const [isTransactionInProcess, setTransactionInprocess] = useState(false);
  const [isTransactionSuccessful, setTransactionSuccessful] = useState(true);
  const [transactionError, setTransactionError] = useState("");

  const handleSubmit1 = async () => {

      set_citizen_UnionCouncil([])
      set_citizen_Education([])
      set_citizen_Weapon([])
      set_citizen_CriminalRecord([])
      set_citizen_TrafficChallan([])
   
     let union_data = await contract.methods.UnionConcilData(cnic).call();
     set_citizen_UnionCouncil(citizen_UnionCouncil => [...citizen_UnionCouncil, union_data])

     for(var i=0; i<2; i++){
      try{ 
        let education_data = await contract.methods.EducationData(cnic,i).call();
        set_citizen_Education(citizen_Education => [...citizen_Education, education_data])
      }catch(error){}
     }

     let weapon_data = await contract.methods.WeaponLisenceData(cnic).call();
     set_citizen_Weapon(citizen_Weapon => [...citizen_Weapon, weapon_data]);

     for(var i=0; i<3; i++){
      try{
        let criminal_data = await contract.methods.CriminalRecordData(cnic,i).call();
        set_citizen_CriminalRecord(citizen_CriminalRecord => [...citizen_CriminalRecord, criminal_data]);
      }catch(error){}
     }

     for(var i=0; i<3; i++){
      try{
       let challan_data = await contract.methods.TrafficChallanData(cnic,i).call();
       set_citizen_TrafficChallan(citizen_TrafficChallan => [...citizen_TrafficChallan, challan_data]);
      }catch(error){}
     }
  };  

  var challan_fee, dates, date2, cnics, vehicles, ch_type;

  function setchallanfee(ac, cnic, vehicle, date, c_type) {
    challan_fee = ac;
    cnics = cnic;
    vehicles = vehicle;
    ch_type = c_type;
    dates = new Date(date);
    date2 = (dates.getTime() / 1000).toFixed(0);
  }

  async function payChallan() {
    console.log("fee", challan_fee);
    console.log("date", date2);
    console.log("cnic", cnics);
    console.log("type", ch_type);
    console.log("vehicle", vehicles);

    setTransactionSuccessful(true);
    setTransactionError("");

    try {
      setTransactionInprocess(true);
      const newTransaction = {
        cnic: cnics,
        vehicle_no: vehicles,
        date: date2,
        challan_type: String(ch_type),
        challan_fee: challan_fee,
      };
      await AddPayChallan(contract, accounts, newTransaction, dispatch);

      setTransactionInprocess(false);
      setTransactionSuccessful(true);
    } catch (error) {
      console.log("error trax = ", error);
      setTransactionInprocess(false);
      setTransactionSuccessful(false);
      setTransactionError(error.message);
    }
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2>Citizen</h2>
      </div>
      <div className="row mt-5">
        <div className="col-8">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your CNIC"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setcnic(e.target.value);
              }}
            />
            &nbsp;
          </div>
        </div>
        <div className="col-4">
          <input
            type="button"
            className="form-control"
            value="Search"
            onClick={handleSubmit1}
          />
        </div>
        <div className="col-12">
          <br />
          <h3>Union Council</h3>
          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">CNIC</th>
                <th scope="col">Father Name</th>
                <th scope="col">Mother Name</th>
                <th scope="col">Father CNIC</th>
                <th scope="col">Mother CNIC</th>
                <th scope="col">Gender</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">City</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            <tbody>
              {citizen_UnionCouncil.map((na) => {
                var date2 = new Date(na.dob * 1000);
                var day = date2.getDate();
                var month = date2.getMonth() + 1;
                var year = date2.getFullYear();

                return (
                  <tr>
                    <td>{na.name}</td>
                    <td>{na.cnic}</td>
                    <td>{na.f_name}</td>
                    <td>{na.m_name}</td>
                    <td>{na.f_cnic}</td>
                    <td>{na.m_cnic}</td>
                    <td>{na.gender}</td>
                    <td>{na.dob == 0 ? null : day + "/" + month + "/" + year}</td>
                    <td>{na.city}</td>
                    <td>{na.isDied == true ? "Die" : "Alive"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="col-12">
        <br />
        <h3>Educations</h3>
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th scope="col">Subject</th>
              <th scope="col">Marks</th>
              <th scope="col">Precentage</th>
              <th scope="col">Grade</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {citizen_Education.map((na) => {
                var date2 = new Date(na.date * 1000);
                var day = date2.getDate();
                var month = date2.getMonth() + 1;
                var year = date2.getFullYear();
                return (
                  <tr>
                    <td>{na.subject}</td>
                    <td>{na.marks}</td>
                    <td>{na.percentage}</td>
                    <td>{na.grade}</td>
                    <td>{day + "/" + month + "/" + year}</td>
                  </tr>
                );
            })}
          </tbody>
        </Table>
      </div>

      <div className="col-12">
        <br />
        <h3>Weapon Lisence</h3>
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th scope="col">Weapon Type</th>
              <th scope="col">Lisence #</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {citizen_Weapon.map((na) => {
              var date2 = new Date(na.date * 1000);
              var day = date2.getDate();
              var month = date2.getMonth() + 1;
              var year = date2.getFullYear();
              return (
                <tr>
                  <td>{na.weapon_type}</td>
                  <td>{na.lisence_no}</td>
                  <td>{na.weapon_issued == true ? "Issued" : "Banned"}</td>
                  <td>
                    {na.date == 0 ? null : day + "/" + month + "/" + year}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="col-12">
        <br />
        <h3>Criminal Record</h3>
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th scope="col">Record Found</th>
              <th scope="col">Remarks</th>
              <th scope="col">Date</th>
            </tr>
          </thead>

          <tbody>
            {citizen_CriminalRecord.map((na) => {
                var date2 = new Date(na.date * 1000);
                var day = date2.getDate();
                var month = date2.getMonth() + 1;
                var year = date2.getFullYear();

                return (
                  <tr>
                    <td>
                      {na.record_found == true ? "Yes" : null}
                      {na.record_found == false ? "No" : null}
                    </td>
                    <td>{na.remarks}</td>
                    <td>
                      {na.date == 0 ? null : day + "/" + month + "/" + year}
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </Table>
      </div>

      <div className="col-12">
        <br />
        <h3>Traffic Challan</h3>
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th scope="col">Vehicle #</th>
              <th scope="col">Challan Type</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Pay Challan</th>
            </tr>
          </thead>
          <tbody>
            {citizen_TrafficChallan.map((na) => {
                var date2 = new Date(na.date * 1000);
                var day = date2.getDate();
                var month = date2.getMonth() + 1;
                var year = date2.getFullYear();
                return (
                  <tr>
                    <td>{na.vehicle_no}</td>
                    <td>{na.challan_type}</td>
                    <td>{na.amount}</td>
                    <td>{day + "/" + month + "/" + year}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          var date = new Date();
                          setchallanfee(
                            na.amount,
                            na.cnic,
                            na.vehicle_no,
                            date,
                            String(na.challan_type),
                          );
                          payChallan();
                        }}
                      >
                        Pay
                      </button>
                      {isTransactionInProcess && (
                        <img width="40px" src={Loader} alt="Loading..." />
                      )}
                      {isTransactionSuccessful == true ? (
                        <div style={{ color: "green" }}></div>
                      ) : null}
                      {!isTransactionSuccessful && (
                        <div style={{ color: "red" }}>{transactionError}</div>
                      )}
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Citizen;
